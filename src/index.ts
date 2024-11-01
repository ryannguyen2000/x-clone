import express, { NextFunction, Request, Response } from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
const app = express()
const port = 4321

// biến đổi Body thành json và truyền xuống use kế tiếp
app.use(express.json())
app.use('/users', usersRouter)

databaseService.connect()
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res. status(404).json({
    error: err.message
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
