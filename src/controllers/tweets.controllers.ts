import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
import HTTP_STATUS from '~/constants/httpStatus'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { Pagination, TweetReqBody } from '~/models/requests/Tweet.request'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetService from '~/services/tweet.services'

export const tweetController = async (req: Request<ParamsDictionary, any, TweetReqBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetService.createTweet(user_id, req.body)
  res.json({
    message: TWEETS_MESSAGES.TWEET_CREATE_SUCCESS,
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  const views = await tweetService.increateView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: views.guest_views,
    user_views: views.user_views,
    updated_at: views.updated_at
  }
  res.json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESSFULLY,
    result: tweet
  })
}

export const getTweetChildrenController = async (req: Request, res: Response) => {
  const tweet_type = Number(req.query.tweet_type)
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { user_id } = req.decoded_authorization as TokenPayload
  const { total, tweets } = await tweetService.getTweetChilren({
    tweet_id: req.params.tweet_id,
    tweet_type,
    limit,
    page,
    user_id
  })
  res.json({
    message: TWEETS_MESSAGES.GET_TWEET_SUCCESSFULLY,
    result: {
      tweets,
      tweet_type,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}

export const getNewFeedsController = async (req: Request<ParamsDictionary, any, Pagination>, res: Response) => {
  res.send('ok')
} 
