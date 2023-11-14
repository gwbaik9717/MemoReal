import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ElementMetadata } from "../../components/Designs/Element/element";
import { page1 } from "../../data/templates/page1";
import { page2 } from "../../data/templates/page2";
import { page3 } from "../../data/templates/page3";
import { page4 } from "../../data/templates/page4";
import { page5 } from "../../data/templates/page5";
import { page6 } from "../../data/templates/page6";
import { page7 } from "../../data/templates/page7";
import { page8 } from "../../data/templates/page8";
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
    {
      id: "1",
      elements: page1,
      isLeftPage: false
    },
    { id: "2", elements: page2, isLeftPage: false },
    { id: "3", elements: page3, isLeftPage: false },
    { id: "4", elements: page4, isLeftPage: false },
    { id: "5", elements: page5, isLeftPage: false },
    { id: "6", elements: page6, isLeftPage: false },
    { id: "7", elements: page7, isLeftPage: false },
    { id: "8", elements: page8, isLeftPage: false }
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
          page.id === action.payload.id
            ? // 페이지 내 모든 엘리먼트 metadata 초기화
              {
                ...action.payload,
                elements: action.payload.elements.map((element) => ({
                  ...element,
                  metadata: new ElementMetadata()
                }))
              }
            : page
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
