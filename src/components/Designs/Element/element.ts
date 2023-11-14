export enum ElementType {
  image = "ImageElement",
  text = "TextElement"
}
export class ElementMetadata {
  isActivated: boolean = false;
}

export enum ElementAnimation {
  shake = "shake",
  fade = "fade",
  bounce = "bounce",
  zoom = "zoom"
}

export class Element {
  x: number = 30;
  y: number = 30;
  width: number = 100;
  height: number = 100;
  type!: ElementType;
  id!: string;
  metadata: ElementMetadata = new ElementMetadata();
  animation: ElementAnimation | null = null;
}
