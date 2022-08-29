import { SurveyModal } from '@/domain/model'

export interface LoadSurveyList {
  loadAll: () => Promise<SurveyModal>
}