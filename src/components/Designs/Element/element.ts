export enum ElementType {
  image = "ImageElement",
  text = "TextElement"
}

export class ElementMetadata {
  isActivated: boolean = false;
}

export class Element {
  x: number = 15;
  y: number = 15;
  width: number = 30;
  height: number = 30;
  type!: ElementType;
  id!: string;
  metadata: ElementMetadata = new ElementMetadata();
}
