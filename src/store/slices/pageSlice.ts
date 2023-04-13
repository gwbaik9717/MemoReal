import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Element } from "../../components/Designs/element";

export interface Page {
  elements: Element[];
}

const initialState: Page = {
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
    }
  }
});

export const { addElement, removeElement } = pageSlice.actions;

export default pageSlice;
