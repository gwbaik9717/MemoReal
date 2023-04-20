import { Element, ElementType } from "../Element/element";
import { generateId } from "../../../utils/idUtils";

export class TextElement extends Element {
  type: ElementType = ElementType.text;

  constructor() {
    super();
    this.id = generateId();
  }
}
