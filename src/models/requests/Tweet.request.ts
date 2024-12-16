import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '~/models/Orther'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface TweetReqBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string
  hashtags: string[]
  mentions: string[]
  medias: Media[]
}

export interface TweetParams extends ParamsDictionary {
  tweet_id: string
}

export interface TweetQuery extends Query, Pagination {
  limit: string
  page: string
  tweet_type: string
}

export interface Pagination {
  limit: string
  page: string
}
