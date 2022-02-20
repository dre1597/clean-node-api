import { InvalidParamError } from '@/presentation/errors'
import { forbiddenError, internalServerError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (private readonly loadSurveyById: LoadSurveyById) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId)
      if (!survey) {
        return forbiddenError(new InvalidParamError('surveyId'))
      }
      return null
    } catch (error) {
      return internalServerError(error)
    }
  }
}
