import { Request } from 'express'
import formidable, { File } from 'formidable'
import fs from 'fs'
import path from 'path'
import { UPLOAD_TEMPT_DIR } from '~/constants/dir'

export const initFolder = () => {
  // Check if the upload path not exist, if not, create an upload folder
  if (!fs.existsSync(UPLOAD_TEMPT_DIR)) {
    fs.mkdirSync(UPLOAD_TEMPT_DIR, {
      recursive: true //Mục đích là để tạo folder nested
    })
  }
}

export const handleUploadSingleImage = async (req: Request) => {
  const form = formidable({
    uploadDir: UPLOAD_TEMPT_DIR,
    maxFiles: 1,
    keepExtensions: true,
    maxFileSize: 500 * 1024, //300KB
    filter: function ({ name, originalFilename, mimetype }) {
      // name là key truyền lên
      const valid = name === 'image' && Boolean(mimetype?.includes('image/'))
      if (!valid) {
        form.emit('error' as any, new Error('File type is not valid') as any)
      }
      return valid
    }
  })
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        throw reject(err)
      }
      if (!Boolean(files.image)) {
        return reject(new Error('File is empty'))
      }
      resolve((files.image as File[])[0])
    })
  })
}

export const getNameFromFullname = (fullname: string) => {
  const namearr = fullname.split('.')
  namearr.pop()
  return namearr.join('')
}
