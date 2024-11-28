import { Request } from 'express'
import path from 'path'
import sharp from 'sharp'
import { UPLOAD_IMAGES_DIR, UPLOAD_VIDEOS_DIR } from '~/constants/dir'
import { getNameFromFullname, handleUploadImage, handleUploadVideo } from '~/utils/file'
import fs from 'fs'
import { isProduction } from '~/controllers/config'
import { config } from 'dotenv'
import { MediaType } from '~/constants/enums'
import { Media } from '~/models/Orther'

config()

class MediasService {
  async uploadImage(req: Request) {
    const files = await handleUploadImage(req)
    const result: Media[] = await Promise.all(
      files.map(async (file) => {
        const newName = getNameFromFullname(file.newFilename)
        const newPath = path.resolve(UPLOAD_IMAGES_DIR, `${newName}.jpg`)
        await sharp(file.filepath).jpeg().toFile(newPath)
        fs.unlinkSync(file.filepath)
        return {
          url: isProduction
            ? `${process.env.HOST}/static/image/${newName}`
            : `http://localhost:${process.env.PORT}/static/image/${newName}.jpg`,
          type: MediaType.Image
        }
      })
    )
    return result
  }

  async uploadvideo(req: Request) {
    const files = await handleUploadVideo(req)
    const { newFilename } = files[0]
    return {
      url: isProduction
        ? `${process.env.HOST}/static/image/${newFilename}`
        : `http://localhost:${process.env.PORT}/static/image/${newFilename}`,
      type: MediaType.Image
    }
  }
}

const mediasService = new MediasService()

export default mediasService
