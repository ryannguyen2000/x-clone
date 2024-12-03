import express from 'express'
import usersRouter from './routers/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHanler } from './middlewares/error.middlewares'
import mediasRouter from './routers/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_VIDEOS_DIR } from './constants/dir'
import staticRouter from './routers/static.routes'
// import { MongoClient } from 'mongodb'
import tweetRouters from './routers/tweets.routes'
import bookmarksRouter from './routers/bookmarks.routes'

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
app.use('/tweets', tweetRouters)
app.use('/bookmarks', bookmarksRouter)

databaseService.connect().then(() => {
  // dùng để tạo index để search nhanh hơn
  databaseService.indexUser()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
})

app.use(defaultErrorHanler)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

/** ------------- */

// const vietnamCities = [
//   'Hà Nội, Việt Nam',
//   'Đà Nẵng, Việt Nam',
//   'Hồ Chí Minh, Việt Nam',
//   'Cần Thơ, Việt Nam',
//   'Hải Phòng, Việt Nam',
//   'Nha Trang, Việt Nam',
//   'Huế, Việt Nam',
//   'Quy Nhơn, Việt Nam',
//   'Vũng Tàu, Việt Nam',
//   'Đà Lạt, Việt Nam'
// ]

// const mgclient = new MongoClient(
//   `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@x-clone.bi9ua.mongodb.net/?retryWrites=true&w=majority`
// )

// const db = mgclient.db('earth')
// // create 1000 users
// const users = db.collection('users')
// const userData = []
// function getRandomNumber() {
//   return Math.floor(Math.random() * 100) + 1
// }

// function getRandomAddress() {
//   const randomIndex = Math.floor(Math.random() * vietnamCities.length)
//   return vietnamCities[randomIndex]
// }

// for (let i = 0; i < 100; i++) {
//   userData.push({
//     name: 'user' + (i + 1),
//     age: getRandomNumber(),
//     sex: i % 2 === 0 ? 'male' : 'female',
//     address: getRandomAddress(),
//   })
// }

// users.insertMany(userData)
