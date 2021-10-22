import { AccessDeniedError } from '../errors'
import { forbiddenError } from '../helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse } from '../protocols'

export class AuthMiddleware implements Middleware {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbiddenError(new AccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
