import { generateId } from "../../utils/idUtils";

export enum ElementType {
  image = "ImageElement",
  text = "TextElement"
}

export class Element {
  type!: ElementType;
  id!: string;
}

export class ImageElement extends Element {
  type: ElementType = ElementType.image;
  src: string = "https://static.waveon.io/img/noimage.jpeg";

  constructor() {
    super();
    this.id = generateId();
  }
}

export class TextElement extends Element {
  type: ElementType = ElementType.text;

  constructor() {
    super();
    this.id = generateId();
  }
}
