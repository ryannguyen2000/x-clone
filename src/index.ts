import express from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHanler } from './middlewares/error.middlewares'
import mediasRouter from './routers/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_VIDEOS_DIR } from './constants/dir'
import staticRouter from './routers/static.routes'

config()
const app = express()
const port = process.env.PORT || 4321

// Dùng để kiểm tra và tạo folder uploads/temp nếu nó chưa có
initFolder()

// biến đổi Body thành json và truyền xuống use kế tiếp
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEOS_DIR))

/**
 * xuất file ảnh hay video lên client
 * ví dụ pass "http://localhost:4321/medias/56988788f24361f04d8ff7100.jpg" lên google sẽ hiện được ảnh
 *  */
// app.use('/medias', express.static(UPLOAD_DIR))

databaseService.connect()
app.use(defaultErrorHanler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
