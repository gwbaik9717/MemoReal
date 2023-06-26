import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../store/config";
import {
  activateElement,
  deactivateAllElements,
  editElement,
  moveElement,
  setElementPositionAndSize
} from "../../store/slices/pageSlice";
import { Element } from "../Designs/Element/element";
import Resizer from "./Resizer";
import { Direction } from "./Resizer/constants";
import Modal from "react-modal";
import { ImageElement } from "../Designs/ImageElement/imageElement";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const StyledPanel = styled.div`
  position: absolute;
  box-sizing: border-box;

  .panel_container {
    position: relative;
    height: 100%;
  }

  .size-indicator {
    position: absolute;
    bottom: -21px;
    left: 50%;
    transform: translate(-50%, 0);
    min-width: 52px;
    text-align: center;
    padding: 2px 4px;
    background: #5a46d5;
    border-radius: 3px;
    color: #fff;
    font-size: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .panel_content {
    width: 100%;
    height: 100%;
  }
`;

enum Category {
  person = "person",
  thing = "thing",
  animal = "animal",
  food = "food",
  vehicle = "vehicle"
}
interface Props {
  children: React.ReactNode;
  element: Element;
}

Modal.setAppElement(document.getElementById("app-root") as HTMLElement);

const Panel: React.FC<Props> = ({ element, children }) => {
  const panelRef = useRef<null | HTMLDivElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const dispatch = useAppDispatch();

  const { isActivated } = element.metadata;

  const dynamicPanelStyle = {
    top: `${element.y}px`,
    left: `${element.x}px`,
    width: `${element.width}px`,
    height: `${element.height}px`
  };

  const handleDrag = (movementX: number, movementY: number): void => {
    const panel = panelRef.current;

    if (!panel) return;

    dispatch(
      moveElement({
        id: element.id,
        x: element.x + movementX,
        y: element.y + movementY
      })
    );
  };

  const handleResize = (
    direction: Direction,
    movementX: number,
    movementY: number
  ): void => {
    const panel = panelRef.current;
    if (!panel) return;

    /*
     * 만약 move 와 resize 를 각각 dispatch 하면
     * 제대로 작동하지 않는 오류가 있어 이 둘을 동시에 처리
     */
    const setElementPositionAndSizeBy = (
      dx: number = 0,
      dy: number,
      dw: number,
      dh: number
    ) => {
      dispatch(
        setElementPositionAndSize({
          id: element.id,
          x: element.x + dx,
          y: element.y + dy,
          width: element.width + dw,
          height: element.height + dh
        })
      );
    };

    switch (direction) {
      case Direction.TopLeft:
        setElementPositionAndSizeBy(
          movementX,
          movementY,
          -1 * movementX,
          -1 * movementY
        );
        break;

      case Direction.Top:
        setElementPositionAndSizeBy(0, movementY, 0, -1 * movementY);
        break;

      case Direction.TopRight:
        setElementPositionAndSizeBy(0, movementY, movementX, -1 * movementY);
        break;

      case Direction.Right:
        setElementPositionAndSizeBy(0, 0, movementX, 0);
        break;

      case Direction.BottomRight:
        setElementPositionAndSizeBy(0, 0, movementX, movementY);
        break;

      case Direction.Bottom:
        setElementPositionAndSizeBy(0, 0, 0, movementY);
        break;

      case Direction.BottomLeft:
        setElementPositionAndSizeBy(movementX, 0, -1 * movementX, movementY);
        break;

      case Direction.Left:
        setElementPositionAndSizeBy(movementX, 0, -1 * movementX, 0);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    const handleMouseUp = (): void => {
      setMouseDown(false);
    };

    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      handleDrag(e.movementX, e.movementY);
    };

    if (mouseDown) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, handleDrag]);

  const handleMouseDown = (e: any): void => {
    setMouseDown(true);
    e.stopPropagation();

    if (!isActivated) {
      dispatch(deactivateAllElements());
      dispatch(activateElement(element.id));
    }
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const extractObjectByCategory = async (category: Category) => {
    const localUrl = (element as ImageElement).src;

    fetch(localUrl)
      .then((response) => response.blob())
      .then((blobData) => {
        const formData = new FormData();
        formData.set("image", blobData, "image.jpg");

        const requestOptions = {
          method: "POST",
          body: formData
        };

        // Send the FormData object as a POST request to the API server
        fetch(`http://3.37.174.220:3000/images/ai/${category}`, requestOptions)
          .then((response: any) => {
            return response.json(); // Parse the response as JSON
          })
          .then((data: any) => {
            dispatch(
              editElement({
                ...element,
                src: data.imageUrl
              })
            );

            closeModal();
          })
          .catch((error) => {
            // Handle any errors that occur during the request
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        // Handle any errors
        console.error("Error:", error);
      });
  };

  return (
    <StyledPanel
      className="panel"
      ref={panelRef}
      style={dynamicPanelStyle}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="panel_container">
        {isActivated ? (
          <>
            <Resizer onResize={handleResize} />

            <div className="panel_content" onMouseDown={handleMouseDown}>
              {children}
            </div>

            <div className="size-indicator">
              <span>
                {element.width} × {element.height}
              </span>
            </div>

            <button
              onClick={openModal}
              style={{
                position: "absolute",
                bottom: "-30px",
                left: 0
              }}
            >
              추출
            </button>
          </>
        ) : (
          <div className="panel_content" onMouseDown={handleMouseDown}>
            {children}
          </div>
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <div>추출하고자 하는 대상을 선택해주세요</div>
        <button
          onClick={async () => {
            await extractObjectByCategory(Category.person);
          }}
        >
          사람
        </button>
        <button
          onClick={async () => {
            await extractObjectByCategory(Category.animal);
          }}
        >
          동물
        </button>
        <button>음식</button>
        <button
          onClick={async () => {
            await extractObjectByCategory(Category.vehicle);
          }}
        >
          탈 것
        </button>
        <button
          onClick={async () => {
            await extractObjectByCategory(Category.food);
          }}
        >
          음식
        </button>
        <button
          onClick={async () => {
            await extractObjectByCategory(Category.thing);
          }}
        >
          사물
        </button>
      </Modal>
    </StyledPanel>
  );
};

export default Panel;
