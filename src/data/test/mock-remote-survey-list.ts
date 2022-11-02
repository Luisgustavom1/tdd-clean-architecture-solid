import { faker } from "@faker-js/faker";
import { RemoteLoadSurveyList } from "@/data/usecases/load-survey-list/remote-load-survey-list";

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model => ({
    id: faker.datatype.uuid(),
    question: faker.random.words(10),
    answers: [{
        answer: faker.random.words(4),
        image: faker.internet.url()
    }, {
        answer: faker.random.words(4),
    }],
    didAnswer: faker.datatype.boolean(),
    date: faker.date.recent().toISOString()
})


export const mockSurveyListModel = (): RemoteLoadSurveyList.Model[] => ([
    mockRemoteSurveyListModel(),
    mockRemoteSurveyListModel()
])