import React, { useEffect, useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  useId
} from "@floating-ui/react";

import styled from "styled-components";

const StyledPopover = styled.div`
  width: max-content;
  max-width: calc(100vw - 20px);
  background-color: white;
  border: 1px solid #ddd;
  font-size: 90%;
  padding: 4px 8px;
  border-radius: 4px;
  text-align: left;
  display: flex;
  align-items: center;
`;

interface Props {
  children: React.ReactNode;
}

const Popover: React.FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const { update } = useFloating();

  const { x, y, refs, strategy, context } = useFloating({
    open: isOpen,
    // onOpenChange: setIsOpen,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "end" }),
      shift()
    ],
    whileElementsMounted: autoUpdate
  });

  // const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    // click,
    dismiss,
    role
  ]);

  const headingId = useId();

  const childrenWithRef = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-expect-error
        ref: refs.setReference,
        ...getReferenceProps()
      });
    }
    return child;
  });

  useEffect(() => {
    setInterval(update, 3000);
  }, []);

  return (
    <>
      {childrenWithRef}

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <StyledPopover
            className="Popover"
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0
            }}
            aria-labelledby={headingId}
            {...getFloatingProps()}
          >
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              변경
            </button>

            <button
              onClick={() => {
                // setIsOpen(false);
              }}
            >
              추출
            </button>
          </StyledPopover>
        </FloatingFocusManager>
      )}
    </>
  );
};

export default Popover;
