import { NextFunction, Request, Response } from 'express'
import formidable from 'formidable'
import path from 'path'
import { USERS_MESSAGES } from '~/constants/messages'
console.log('path', path.resolve('uploads'))
export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const form = formidable({
    uploadDir: path.resolve('uploads'),
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 300 * 1024 //300KB
  })
  form.parse(req, (err, field, files) => { 
    if (err) {
      throw err
    }
    res.json({
      message: USERS_MESSAGES.UPLOAD_SUCCESS
    })
  })
}
