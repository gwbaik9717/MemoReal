import { generateId } from "../../../utils/idUtils";
import { Element, ElementType } from "../Element/element";

export class ImageElement extends Element {
  type: ElementType = ElementType.image;
  src: string = "https://static.waveon.io/img/noimage.jpeg";

  constructor() {
    super();
    this.id = generateId();
  }
}
