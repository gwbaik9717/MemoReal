export enum ElementType {
  image = "ImageElement",
  text = "TextElement"
}

export class ElementMetadata {
  isActivated: boolean = false;
}

export class Element {
  x: number = 30;
  y: number = 30;
  width: number = 100;
  height: number = 100;
  type!: ElementType;
  id!: string;
  metadata: ElementMetadata = new ElementMetadata();
}
