import { ObjectId } from 'mongodb'

interface BookmarkType {
  _id?: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_id?: Date
}

class Bookmark {
  _id?: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_id?: Date
  constructor({ _id, user_id, tweet_id, created_id }: BookmarkType) {
    this._id = _id || new ObjectId()
    this.user_id = user_id
    this.tweet_id = tweet_id
    this.created_id = created_id || new Date()
  }
}

export default Bookmark
