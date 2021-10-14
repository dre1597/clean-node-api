import { Controller, HttpRequest, HttpResponse, Authentication, Validation } from './login-controller-protocols'
import { badRequest, internalServerError, successRequest, unauthorizedError } from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorizedError()
      }
      return successRequest({ accessToken })
    } catch (error) {
      return internalServerError(error)
    }
  }
}
