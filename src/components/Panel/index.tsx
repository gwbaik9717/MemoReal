import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { useAppDispatch } from "../../store/config";
import {
  activateElement,
  deactivateAllElements,
  editElement,
  moveElement,
  setElementPositionAndSize
} from "../../store/slices/pageSlice";
import { Element, ElementAnimation } from "../Designs/Element/element";
import Resizer from "./Resizer";
import { Direction } from "./Resizer/constants";
import Modal from "react-modal";
import { ImageElement } from "../Designs/ImageElement/imageElement";
import Loader from "../Loader";
import ImageCanvas from "../Page/ImageCanvas";

const customStyles = (loading: boolean) => ({
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    height: "500px",
    background: loading ? "transparent" : "rgba(255, 255, 255)",
    border: loading ? "none" : "1px solid #ededed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
});

const StyledContextMenu = styled.div<StyledProps>`
  position: absolute;
  width: 116px;
  background: #313131;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 4px;
  z-index: 5;
  text-align: center;

  ${({ top, left }) => css`
    top: ${top}px;
    left: ${left}px;
  `}
  ul {
    box-sizing: border-box;
    padding: 11px;
    margin: 0;
    list-style: none;
  }
  ul li {
    cursor: pointer;
  }
`;

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

interface Props {
  children: React.ReactNode;
  element: ImageElement;
}
interface StyledProps {
  top: number;
  left: number;
}
Modal.setAppElement(document.getElementById("app-root") as HTMLElement);

const Panel: React.FC<Props> = ({ element, children }) => {
  const panelRef = useRef<null | HTMLDivElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const [rightClicked, setRightClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>(element.src);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [currentMode, setCurrentMode] = useState<"erase" | "keep">("erase");
  const [currentCategory, setCurrentCategory] = useState<"ai" | "edge">("ai");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [animationModelIsOpen, setAnimationIsOpen] = useState<boolean>(false);

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
    const handleClick = () => {
      setRightClicked(false);
    };
    const handleMouseUp = (): void => {
      setMouseDown(false);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mouseup", handleMouseUp);
      window.removeEventListener("click", handleClick);
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
    setRightClicked(false);
    e.stopPropagation();

    if (!isActivated) {
      dispatch(deactivateAllElements());
      dispatch(activateElement(element.id));
    }
  };

  function openModal() {
    setRightClicked(false);
    setIsOpen(true);
  }

  function openAnimationModal() {
    setRightClicked(false);
    setAnimationIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const extractObjectByCategory = async (category: "ai" | "edge") => {
    const localUrl = element.src;
    setLoading(true);

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
        fetch(
          `http://15.165.43.54:3000/images/extract/${category}`,
          requestOptions
        )
          .then((response: any) => {
            return response.json(); // Parse the response as JSON
          })
          .then((data: any) => {
            setLoading(false);

            setPreviewImage(data.imageUrl);
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

  const onClickManualExtract = async () => {
    await fetch("http://15.165.43.54:3000/images/custom", {
      method: "GET"
    })
      .then((response: any) => {
        return response.json(); // Parse the response as JSON
      })
      .then((data: any) => {
        setLoading(false);

        setPreviewImage(data.imageUrl);
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error("Error:", error);
      });

    setCurrentStep(2);
  };

  const onClickDrawMode = (mode: "erase" | "keep") => {
    setCurrentMode(mode);
  };

  const onClickCategory = async (mode: "ai" | "edge") => {
    setCurrentCategory(mode);
    await extractObjectByCategory(mode);
    setCurrentStep(1);
  };

  const onClickFinish = async () => {
    await fetch("http://15.165.43.54:3000/images/result", {
      method: "GET"
    })
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
  };

  const onClickSetAnimation = (animation: ElementAnimation | null) => {
    dispatch(
      editElement({
        ...element,
        animation
      })
    );
    setAnimationIsOpen(false);
  };

  return (
    <StyledPanel
      className="panel"
      ref={panelRef}
      style={dynamicPanelStyle}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onContextMenu={(e) => {
        e.preventDefault();

        const panelPosition = (panelRef as any).current.getBoundingClientRect();

        setRightClicked(true);
        setPoints({
          x: e.pageX - panelPosition.left,
          y: e.pageY - panelPosition.top
        });
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

            {rightClicked && (
              <StyledContextMenu top={points.y} left={points.x}>
                <ul>
                  <li onClick={openModal}>추출</li>
                  <li onClick={openAnimationModal}>애니메이션</li>
                </ul>
              </StyledContextMenu>
            )}
          </>
        ) : (
          <div className="panel_content" onMouseDown={handleMouseDown}>
            {children}
          </div>
        )}
      </div>

      <Modal
        isOpen={animationModelIsOpen}
        onRequestClose={() => {
          setAnimationIsOpen(false);
        }}
        style={customStyles(false)}
      >
        <ul>
          <li
            onClick={() => {
              onClickSetAnimation(ElementAnimation.shake);
            }}
          >
            흔들기
          </li>
          <li
            onClick={() => {
              onClickSetAnimation(ElementAnimation.bounce);
            }}
          >
            튀기기
          </li>
          <li
            onClick={() => {
              onClickSetAnimation(null);
            }}
          >
            추출
          </li>
        </ul>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles(loading)}
        contentLabel="Example Modal"
      >
        {/* <button onClick={closeModal}>close</button> */}
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div
              style={{
                fontSize: "16px",
                marginBottom: "10px",
                textAlign: "center"
              }}
            >
              추출하고자 하는 대상을 선택해주세요
            </div>
            <div className="modal-body" style={{ color: "#5a46d5" }}>
              {currentStep === 0 && (
                <>
                  <img width={300} src={previewImage} draggable="false" />
                  <div>
                    <div
                      className=""
                      onClick={async () => {
                        await onClickCategory("ai");
                      }}
                    >
                      사진
                    </div>
                    <div
                      className=""
                      onClick={async () => {
                        await onClickCategory("edge");
                      }}
                    >
                      일러스트
                    </div>
                  </div>
                </>
              )}

              {currentStep === 1 && (
                <>
                  <img width={300} src={previewImage} />
                  <div>
                    <div
                      className=""
                      onClick={async () => {
                        await onClickManualExtract();
                      }}
                    >
                      직접추출
                    </div>
                    <div className="" onClick={onClickFinish}>
                      완료
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <ImageCanvas
                    imgSrc={previewImage}
                    mode={currentMode}
                    category={currentCategory}
                    onClickFinish={onClickFinish}
                    setPreviewImage={setPreviewImage}
                    setLoading={setLoading}
                  />
                  <div>
                    <div
                      className=""
                      onClick={() => {
                        onClickDrawMode("erase");
                      }}
                    >
                      지우기
                    </div>
                    <div
                      className=""
                      onClick={() => {
                        onClickDrawMode("keep");
                      }}
                    >
                      복구
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>
    </StyledPanel>
  );
};

export default Panel;
