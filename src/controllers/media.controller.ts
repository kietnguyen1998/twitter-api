import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { USERS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/media.services'
console.log('path', path.resolve('uploads'))

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaService.handleUploadImage(req)
  return res.json({
    result: url,
    message: USERS_MESSAGES.UPLOAD_SUCCESS
  })
}
