export interface Subject {
  id: number,
  type: string,
  characters: string,
  meanings: SubjectMeaning[],
  documentUrl: string,
  lesson: number,
  lessonPosition: number
}

export interface SubjectMeaning {
  meaning: string,
  primary: boolean
}
