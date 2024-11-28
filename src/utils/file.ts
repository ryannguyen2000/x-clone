import { config } from 'dotenv'
import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_IMAGES_TEMPT_DIR, UPLOAD_VIDEOS_DIR, UPLOAD_VIDEOS_TEMPT_DIR } from '~/constants/dir'

config()

export const initFolder = () => {
  ;[UPLOAD_IMAGES_TEMPT_DIR, UPLOAD_VIDEOS_TEMPT_DIR].forEach((dir) => {
    // Check if the upload path not exist, if not, create an upload folder
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true //Mục đích là để tạo folder nested
      })
    }
  })
}

export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}

export const handleUploadImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_IMAGES_TEMPT_DIR,
    maxFiles: 4,
    keepExtensions: true,
    maxFileSize: 500 * 1024, //300KB
    maxTotalFileSize: 500 * 1024 * 4,
    filter: function ({ name, originalFilename, mimetype }) {
      // name là key truyền lên
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw reject(err)
      }
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve(files.image as File[])
    })
  })
}

export const handleUploadVideo = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_VIDEOS_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024, //50MB
    filter: function ({ name, originalFilename, mimetype }) {
      // name là key truyền lên
      const valid = name === 'video' && Boolean(mimetype?.includes('mp4'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise<File[]>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw reject(err)
      }
      if (!Boolean(files.video)) {
        return reject(new Error('File is empty'))
      }
      const videos = files.video as File[]
      videos.forEach((video) => {
        const ext = getExtenseion(video.originalFilename as string)
        // fs.renameSync(video.filepath, video.filepath + '.' + ext)
        fs.renameSync(video.filepath, video.filepath)
      })
      resolve(files.video as File[])
    })
  })
}

export const getExtenseion = (fullname: string) => {
  const namearr = fullname.split('.')
  return namearr[namearr.length - 1]
}
