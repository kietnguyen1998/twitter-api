import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import usersRouter from './routes/users.routes'
import { dafaultErrorHandler } from './middlewares/error.middleware'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/file'
databaseService.connect()

const app = express()
const port = 4000

initFolder()

app.use(express.json())
app.use('/users', usersRouter)
app.use('/media', mediaRouter)
app.use(dafaultErrorHandler)

app.listen(port, () => {
  console.log(`app listening port on ${port}`)
})
