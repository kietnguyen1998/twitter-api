import { existsSync, mkdirSync } from 'fs'
import path from 'path'

export const initFolder = () => {
  const uploadFolderPath = path.resolve('uploads/images')
  if (!existsSync(uploadFolderPath)) {
    mkdirSync(uploadFolderPath, {
      recursive: true //To create nested folder
    })
  }
}
