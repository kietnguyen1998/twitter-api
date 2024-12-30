import express, { NextFunction, Request, Response } from 'express'
import databaseService from './services/database.services'
import usersRouter from './routes/users.routes'
import { dafaultErrorHandler } from './middlewares/error.middleware'
import mediaRouter from './routes/media.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import argv from 'minimist'
import { UPLOAD_IMAGE_DIR } from './constants/dir'
import staticRouter from './routes/statisc.routes'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
// import "~/utils/fake"
config()
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshToken()
})

const app = express()
const port = process.env.PORT || 4000

initFolder()
console.log('arvg', process.argv)
const options = argv(process.argv.slice(2))
console.log('options', options.development)
app.use(express.json())
app.use('/users', usersRouter)
app.use('/media', mediaRouter)
// app.use('/media', express.static(UPLOAD_IMAGE_DIR))
app.use('/static', staticRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmark', bookmarksRouter)
app.use(dafaultErrorHandler)

app.listen(port, () => {
  console.log(`app listening port on ${port}`)
})
