import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  const routesPath = path.join(path.dirname(__filename), '../routes')

  readdirSync(routesPath).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
