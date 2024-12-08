import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

interface UserType {
  _id?: ObjectId
  name?: string
  email: string
  date_of_birth: Date
  password: string
  created_at?: Date
  updated_at?: Date
  email_verify_token?: string // jwt hoặc '' nếu đã xác thực email
  forgot_password_token?: string // jwt hoặc '' nếu đã xác thực email
  verify?: UserVerifyStatus
  twitter_circle?: ObjectId[] // danh sach id cua nhung nguoi user nay add vao circle

  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  date_of_birth: Date
  password: string
  created_at: Date
  updated_at: Date
  email_verify_token: string
  forgot_password_token: string
  verify: UserVerifyStatus
  twitter_circle?: ObjectId[]
  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string

  constructor(user: UserType) {
    this._id = user._id
    this.email = user.email
    this.email_verify_token = user.email_verify_token || ''
    this.name = user.name || ''
    this.avatar = user.avatar || ''
    this.bio = user.bio || ''
    this.cover_photo = user.cover_photo || ''
    this.date_of_birth = user.date_of_birth || new Date()
    this.created_at = user.created_at || new Date()
    this.updated_at = user.updated_at || new Date()
    this.location = user.location || ''
    this.password = user.password
    this.forgot_password_token = user.forgot_password_token || ''
    this.username = user.username || ''
    this.verify = user.verify || 0
    this.website = user.website || ''
    this.twitter_circle = user.twitter_circle || []
  }
}
