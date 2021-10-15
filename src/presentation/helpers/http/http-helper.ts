import { InternalServerError, UnauthorizedError } from '../../errors'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => (
  { statusCode: 400, body: error }
)

export const forbiddenError = (error: Error): HttpResponse => (
  { statusCode: 403, body: error }
)

export const internalServerError = (error: Error): HttpResponse => (
  { statusCode: 500, body: new InternalServerError(error.stack) }
)

export const successRequest = (data: any): HttpResponse => (
  { statusCode: 200, body: data }
)

export const noContent = (): HttpResponse => (
  { statusCode: 204, body: null }
)

export const unauthorizedError = (): HttpResponse => (
  { statusCode: 401, body: new UnauthorizedError() }
)
