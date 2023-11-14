import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { useAppSelector } from "../../../store/config";
import { DiaryMode } from "../../../store/slices/diarySlice";
import Panel from "../../Panel";
import { ElementAnimation } from "./element";
import { ImageElement } from "../ImageElement/imageElement";

const shakeAnimation = keyframes`
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

const bounceAnimation = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

interface Props {
  children: React.ReactNode;
  element: ImageElement;
}

interface StyledProps {
  animation: ElementAnimation | null;
}

const StyledViewerElement = styled.div<StyledProps>`
  position: absolute;
  animation: ${({ animation }) => getAnimation(animation)};
`;

const getAnimation = (animationType: ElementAnimation | null) => {
  switch (animationType) {
    case ElementAnimation.shake:
      return css`
        ${shakeAnimation} 0.5s linear
      `;
    case ElementAnimation.bounce:
      return css`
        ${bounceAnimation} 0.5s linear
      `;
    default:
      return "none";
  }
};

const Element: React.FC<Props> = ({ children, element }) => {
  const { mode } = useAppSelector((state) => state.diary);
  const { x, y, width, height } = element;

  const [animation, setAnimation] = useState<ElementAnimation | null>(null);

  const dynamicElementStyle = {
    top: `${y}px`,
    left: `${x}px`,
    width: `${width}px`,
    height: `${height}px`
  };

  const handleClick = () => {
    setAnimation(element.animation); // 요소를 클릭하면 애니메이션을 시작하도록 상태를 변경합니다.
  };

  // 애니메이션이 끝난 후에 애니메이션 상태를 초기화합니다.
  useEffect(() => {
    if (animation) {
      const timeoutId = setTimeout(() => {
        setAnimation(null);
      }, 500); // 애니메이션의 지속 시간과 동일하게 설정해야 합니다.
      return () => {
        clearTimeout(timeoutId);
      }; // 이펙트 클린업을 통해 타이머를 제거합니다.
    }
  }, [animation]);

  return (
    <>
      {mode === DiaryMode.editor ? (
        <Panel element={element}>{children}</Panel>
      ) : (
        <StyledViewerElement
          style={dynamicElementStyle}
          animation={element.animation}
          onClick={handleClick}
        >
          {children}
        </StyledViewerElement>
      )}
    </>
  );
};

export default Element;
