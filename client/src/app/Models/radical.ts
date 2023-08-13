import { Subject } from "./subject";

export interface Radical extends Subject {
  characterImages: CharacterImage[];
}

export interface CharacterImage {
  url: string,
  imageType: string,
  metadata: any
}