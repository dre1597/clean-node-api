import swaggerConfig from '@/main/docs'
import { Express } from 'express'
import { noCache } from '@/main/middlewares/no-cache'
import { serve, setup } from 'swagger-ui-express'

export default (app: Express): void => {
  app.use('/api-docs', serve, noCache, setup(swaggerConfig))
}
