import { ObjectId } from 'mongodb'

interface HashtagType {
  _id?: ObjectId
  name: string
  created_at?: Date
}

export default class Hashtags {
  _id?: ObjectId
  name: string
  created_at: Date
  constructor({ created_at, name, _id }: HashtagType) {
    this._id = _id || new ObjectId()
    this.created_at = created_at || new Date()
    this.name = name
  }
}
