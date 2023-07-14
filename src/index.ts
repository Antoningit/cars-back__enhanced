import express from 'express'
import session from 'express-session'
import { json } from 'body-parser'
import multer from 'multer'
import { resolve } from 'path'

import { createConnection } from './createConnection'
import { setConnect, AppUse, Request } from './Request'

import login from './routes/login'
import auth from './routes/auth'
import photo, {path} from './routes/photo'
import * as car from './routes/car' 

import { Admin } from './entity/Admin'

const distPath = resolve('..', 'cars_admin', 'dist')//путь до билда фронта админки

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    const newName = file.originalname.split('.')
    cb(null, newName[0] + Date.now() + "." + newName[1])
  },
})

;(async () => {
  const connect = await createConnection()

  const repo = connect.getRepository(Admin)
  if(!await repo.count())
    await repo.save({
      login: process.env.ADMIN_NAME || 'admin',
      password: process.env.ADMIN_PASS || 'admin'
    })

  const app = express()

  app.use(multer({ dest: path, storage: storageConfig }).any())

  setConnect(connect)
  app.set('port', process.env.ADMIN_PORT || 3001)
  app.use(json())
  app.use(AppUse)
  app.use(session({
    secret: 'dsvthryhsrgtdn',
    resave: false,
    saveUninitialized: false
  }))

  const router = express.Router()
  app.use('/api', router)

  router.use('/login', login)
  router.use((req: Request, res: express.Response, next) => {
    if(!req.session.isAuth) {
      res.status(401).end()
    } else next()
  })

  router.use('/auth', auth)
  router.use('/photo', photo)
  router.use('/car', car.admin)
  router.use('/car', car.user)

  app.use(express.static(distPath))
  app.use('/uploads', express.static(path))
  app.use('/', (req: express.Request, res: express.Response) => res.sendFile(resolve(distPath, 'index.html')))

  app.listen(app.get('port'), '0.0.0.0', () => {
    console.log('Express server listening on port ' + app.get('port'))
  })
})()