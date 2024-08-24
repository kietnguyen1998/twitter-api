import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import usersRouter from './routes/users.routes'
import { dafaultErrorHandler } from './middlewares/error.middleware'
databaseService.connect()

const app = express()
const port = 3000
app.use(express.json())
app.use('/users', usersRouter)

app.use(dafaultErrorHandler)

app.listen(port, () => {
  console.log(`app listening port on ${port}`)
})
