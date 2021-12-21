import { AccessDeniedError } from '../errors'
import { forbiddenError, internalServerError, successRequest } from '../helpers/http/http-helper'
import { Middleware, HttpRequest, HttpResponse, LoadAccountByToken } from './auth-middleware-protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role)
        if (account) {
          return successRequest({ accountId: account.id })
        }
      }
      return forbiddenError(new AccessDeniedError())
    } catch (error) {
      return internalServerError(error)
    }
  }
}