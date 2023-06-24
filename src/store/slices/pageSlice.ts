import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../components/Designs/Element/element";
import { generateId } from "../../utils/idUtils";

export class Page {
  id: string;
  elements: Element[] = [];
  isLeftPage: boolean = false;

  constructor() {
    this.id = generateId();
  }
}

export interface PayloadElementPosition {
  id: string;
  x: number;
  y: number;
}

export interface PayloadElementSize {
  id: string;
  width: number;
  height: number;
}

export interface PayloadElementPositionAndSize {
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
}

const initialState: Page = new Page();

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setElementIsLeftPage(state, action: PayloadAction<boolean>) {
      return {
        ...state,
        isLeftPage: action.payload
      };
    },
    setEditingPage(state, action: PayloadAction<Page>) {
      return {
        ...action.payload
      };
    },
    addElement(state, action: PayloadAction<Element>) {
      return {
        ...state,
        elements: state.elements.concat(action.payload)
      };
    },
    removeElement(state, action: PayloadAction<string>) {
      return {
        ...state,
        elements: state.elements.filter(
          (element) => element.id !== action.payload
        )
      };
    },
    moveElement(state, action: PayloadAction<PayloadElementPosition>) {
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.id === action.payload.id
            ? {
                ...element,
                x: action.payload.x,
                y: action.payload.y
              }
            : element
        )
      };
    },
    resizeElement(state, action: PayloadAction<PayloadElementSize>) {
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.id === action.payload.id
            ? {
                ...element,
                width: action.payload.width,
                height: action.payload.height
              }
            : element
        )
      };
    },
    setElementPositionAndSize(
      state,
      action: PayloadAction<PayloadElementPositionAndSize>
    ) {
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.id === action.payload.id
            ? {
                ...element,
                x: action.payload.x,
                y: action.payload.y,
                width: action.payload.width,
                height: action.payload.height
              }
            : element
        )
      };
    },
    activateElement(state, action: PayloadAction<string>) {
      return {
        ...state,
        elements: state.elements.map((element) =>
          element.id === action.payload
            ? {
                ...element,
                metadata: {
                  ...element.metadata,
                  isActivated: true
                }
              }
            : element
        )
      };
    },
    deactivateAllElements(state) {
      return {
        ...state,
        elements: state.elements.map((element) => ({
          ...element,
          metadata: {
            isActivated: false
          }
        }))
      };
    }
  }
});

export const {
  setElementIsLeftPage,
  setEditingPage,
  addElement,
  removeElement,
  moveElement,
  resizeElement,
  setElementPositionAndSize,
  activateElement,
  deactivateAllElements
} = pageSlice.actions;

export default pageSlice;
