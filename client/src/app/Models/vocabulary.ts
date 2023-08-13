import { Subject } from "./subject"

export interface Vocabulary extends Subject{
  kanjiComponents: number[],
  partsOfSpeech: string[],
  readings: VocabularyReading[]
}

export interface VocabularyReading {
  reading: string,
  primary: boolean
}