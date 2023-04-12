const ADD_ELEMENT = "page/ADD_ELEMENT" as const;
const REMOVE_ELEMENT = "page/REMOVE_ELEMENT" as const;

let nextId = 1;

export const addElement = () => ({
  type: ADD_ELEMENT,
  payload: {
    id: nextId++
  }
});

export const removeElement = (id: number) => ({
  type: REMOVE_ELEMENT,
  payload: id
});

type ElementAction =
  | ReturnType<typeof addElement>
  | ReturnType<typeof removeElement>;

interface Element {
  id: number;
}

export interface Page {
  elements: Element[];
}

const initialState: Page = {
  elements: []
};

export default function page(
  state: Page = initialState,
  action: ElementAction
): Page {
  switch (action.type) {
    case ADD_ELEMENT:
      return {
        ...state,
        elements: state.elements.concat(action.payload)
      };
    case REMOVE_ELEMENT:
      return {
        ...state,
        elements: state.elements.filter(
          (element) => element.id !== action.payload
        )
      };
    default:
      return state;
  }
}
