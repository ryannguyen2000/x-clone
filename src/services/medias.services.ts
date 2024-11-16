import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadSingleImage } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/controllers/config'
import { config } from 'dotenv'

config()

class MediasService {
  async handleUploadSingleImage(req: Request) {
    const file: any = await handleUploadSingleImage(req)
    const newName = getNameFromFullname(file.newFilename)
    const newPath = path.resolve(UPLOAD_DIR, `${newName}.jpg`)
    // const info = await sharp(file.filepath).jpeg().toFile(newPath)
    fs.unlinkSync(file.filepath)
    return isProduction ? `${process.env.HOST}/medias/${newName}` : `http://localhost:${process.env.PORT}/medias/${newName}.jpg`
  }
}

const mediasService = new MediasService()

export default mediasService
