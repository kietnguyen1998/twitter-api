import { Router } from 'express'
import { uploadImageController } from '~/controllers/media.controller'

const mediaRouter = Router()

mediaRouter.post('/upload-image', uploadImageController)
export default mediaRouter
