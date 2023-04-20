import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../components/Designs/Element/element";

export enum PageMode {
  viewer = "viewer",
  editor = "editor"
}

export interface Page {
  mode: PageMode;
  elements: Element[];
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

const initialState: Page = {
  mode: PageMode.editor,
  elements: []
};

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
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
    }
  }
});

export const { addElement, removeElement, moveElement, resizeElement } =
  pageSlice.actions;

export default pageSlice;
