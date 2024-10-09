import { wrapRequestHandler } from './../utils/handlers';
import { Router } from 'express'
import { uploadImageController } from '~/controllers/media.controller'

const mediaRouter = Router()

mediaRouter.post('/upload-image', wrapRequestHandler(uploadImageController))
export default mediaRouter
