import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { USERS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/media.services'
import { handleUploadImage } from '~/utils/file'
console.log('path', path.resolve('uploads'))
export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await mediaService.handleUploadImage(req)
  return res.json({
    result: data
  })
}
