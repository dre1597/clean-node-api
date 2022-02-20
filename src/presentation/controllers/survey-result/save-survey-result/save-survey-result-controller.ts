import { InvalidParamError } from '@/presentation/errors'
import { forbiddenError, internalServerError } from '@/presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, LoadSurveyById, SaveSurveyResult } from './save-survey-result-controller-protocols'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest
      const survey = await this.loadSurveyById.loadById(surveyId)
      if (survey) {
        const answers = survey.answers.map(a => a.answer)
        if (!answers.includes(answer)) {
          return forbiddenError(new InvalidParamError('answer'))
        }
      } else {
        return forbiddenError(new InvalidParamError('surveyId'))
      }
      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })
      return null
    } catch (error) {
      return internalServerError(error)
    }
  }
}
