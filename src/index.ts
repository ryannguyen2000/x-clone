import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHanler } from './middlewares/error.middlewares'
import mediasRouter from './routers/medias.routes'
import { initFolder } from './utils/file'
const app = express()
const port = 4321

initFolder()

// biến đổi Body thành json và truyền xuống use kế tiếp
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)

databaseService.connect()
app.use(defaultErrorHanler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
