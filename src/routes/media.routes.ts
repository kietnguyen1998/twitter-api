import { wrapRequestHandler } from './../utils/handlers'
import { Router } from 'express'
import { uploadImageController, uploadVideoController } from '~/controllers/media.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middleware'

const mediaRouter = Router()

mediaRouter.post(
  '/upload-image',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadImageController)
)
mediaRouter.post(
  '/upload-video',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadVideoController)
)
export default mediaRouter
