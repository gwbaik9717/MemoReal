import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page } from "./pageSlice";

export enum DiaryMode {
  viewer = "viewer",
  editor = "editor",
  calendar = "calendar"
}

export interface Diary {
  mode: DiaryMode;
  pages: Page[]; // 현재 페이지를 기준으로 4 페이지씩 로드
}

const initialState: Diary = {
  mode: DiaryMode.calendar,
  pages: [
    { id: "1", elements: [] },
    { id: "2", elements: [] },
    { id: "3", elements: [] },
    { id: "4", elements: [] }
  ]
};

export const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {
    setDiaryMode(state, action: PayloadAction<DiaryMode>) {
      return {
        ...state,
        mode: action.payload
      };
    },
    updatePage(state, action: PayloadAction<Page>) {
      return {
        ...state,
        pages: state.pages.map((page) =>
          page.id === action.payload.id ? action.payload : page
        )
      };
    },
    addPage(state, action: PayloadAction<Page>) {
      return {
        ...state,
        pages: state.pages.concat(action.payload)
      };
    },
    removePage(state, action: PayloadAction<string>) {
      return {
        ...state,
        pages: state.pages.filter((page) => page.id !== action.payload)
      };
    }
  }
});

export const { setDiaryMode, updatePage, addPage, removePage } =
  diarySlice.actions;

export default diarySlice;
