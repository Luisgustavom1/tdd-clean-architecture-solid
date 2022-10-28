export interface LoadSurveyList {
  loadAll: () => Promise<LoadSurveyList.Model[]>
}

export namespace LoadSurveyList {
  export type Model = {
    id: string
    question: string
    answers: LoadSurveyList.AnswerModel[]
    date: Date
    didAnswer: boolean
  }

  export type AnswerModel = {
    image?: string
    answer: string
  }
}

