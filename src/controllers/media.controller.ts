import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR } from '~/constants/dir'
import httpStatus from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import mediaService from '~/services/media.services'
import fs from 'fs'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaService.uploadImage(req)
  return res.json({
    result: url,
    message: USERS_MESSAGES.UPLOAD_SUCCESS
  })
}
export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediaService.uploadVideo(req)
  return res.json({
    result: url,
    message: USERS_MESSAGES.UPLOAD_SUCCESS
  })
}
export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params

  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send('Not found')
    }
  })
}
export const serveVideoStreamController = (req: Request, res: Response, next: NextFunction) => {
  const range = req.headers.range
  if (!range) {
    return res.status(httpStatus.BAD_REQUEST).send('Require Range Header')
  }
  const { name } = req.params
  const videoPath = path.resolve(UPLOAD_VIDEO_DIR, name)
  // 1MB = 10^6 bytes (Tính theo hệ 10, đây là thứ mà chúng ta hay thấy trên UI)
  // Còn nếu tính theo hệ nhị phân thì 1MB = 2^20 bytes (1024 * 1024)

  // Dung lượng video (bytes)
  const videoSize = fs.statSync(videoPath).size
  // DUng lượng video cho mỗi phân đoạn stream
  const chunkSize = 30 * 10 ** 6 // 30MB
  // Lấy giá trị byte bắt đầu từ header Range (vd: bytes=1048576-)
  const start = Number(range.replace(/\D/g, ''))
  // Lấy giá trị byte kết thúc, vượt quá dung lượng video thì lấy giá trị videoSize - 1
  const end = Math.min(start + chunkSize, videoSize - 1)

  // Dung lượng thực tế cho mỗi đoạn video stream
  // THường đây sẽ là chunkSize, ngoại trừ đoạn cuối cùng
  const contentLength = end - start + 1
  const contentType = mime.getType(videoPath) || 'video/*'
}
