import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGES_DIR, UPLOAD_VIDEOS_DIR } from '~/constants/dir'
import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import fs from 'fs'
import mime from 'mime'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const data = await mediasService.uploadImage(req)
  res.json({
    meassage: USERS_MESSAGES.UPLOAD_SUCCESS,
    data
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  res.sendFile(path.resolve(UPLOAD_IMAGES_DIR, name), (err) => {
    if (err) {
      res.status((err as any).status).send(USERS_MESSAGES.NOT_FOUND)
    }
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.uploadvideo(req)
  console.log(req.body)
  res.json({
    message: USERS_MESSAGES.UPLOAD_SUCCESS,
    result: url
  })
}

export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  const filePath = path.resolve(UPLOAD_VIDEOS_DIR, name)
  res.sendFile(filePath, (err) => {
    if (err) {
      // res.status((err as any).status).send(USERS_MESSAGES.NOT_FOUND)
      next(err)
    }
  })
}

export const serveVideoStreamController = (req: Request, res: Response, next: NextFunction) => {
  const range = req.headers.range as string
  if (!range) {
    res.status(HTTP_STATUS.BAD_REQUEST).send('Requires Range header')
  }
  const { name } = req.params
  const videoPath = path.resolve(UPLOAD_VIDEOS_DIR, name)
  // 1MB = 10^6 byte
  // Còn nếu tính theo hệ nhị phân thì 1MB = 2^20 bytes

  // Dung lượng video (bytes)
  const videoSize = fs.statSync(videoPath).size
  // Dung lượng video cho mỗi phân đoạn stream
  const chunkSize = 10 ** 6 // 1MB
  // Lấy giá trị byte bắt đầu từ header Range (vd: bytes=102323-)
  const start = Number(range.replace(/\D/g, ''))
  // Lấy giá trị byte kết thúc, vượt quá dung lượng video thì lấy giá trị videoSize

  const end = Math.min(start + chunkSize, videoSize - 1)
  // Dung lượng thực tes cho mỗi đoạn video stream
  // Thường đây sẽ là chunkSize, ngoại trừ đoạn cuối cùng
  const contentLength = end - start + 1
  const contentType = mime.getType(videoPath) || 'video/*'
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Type': contentType,
    'Conten-Length': contentType
  }
  res.writeHead(HTTP_STATUS.PARTIAL_CONTENT, headers)
  const videoStream = fs.createReadStream(videoPath, { start, end })
  videoStream.pipe(res)
}
