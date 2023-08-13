import { Subject } from "./subject";

export interface Kanji extends Subject{
  radicalComponents: number[],
  readings: KanjiReading[]
}

export interface KanjiReading {
  reading: string,
  type: string,
  primary: boolean
}