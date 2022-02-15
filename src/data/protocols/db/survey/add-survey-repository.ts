import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  add: (accountData: AddSurveyModel) => Promise<void>
}
