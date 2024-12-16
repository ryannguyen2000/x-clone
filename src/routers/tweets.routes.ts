import { Router } from 'express'
import { getNewFeedsController, getTweetChildrenController, getTweetController, tweetController } from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetIdValidator,
  getTweetChildrenValidator,
  paginationValidator,
  TweetIdValidator
} from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetRouters = Router()

/**
 * Description: Create Tweet
 * Post: /
 * Method: POST
 * Body: TweetBody
 */
tweetRouters.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetIdValidator,
  wrapRequestHandler(tweetController)
)

/**
 * Description: Get Tweet detail
 * Post: /:tweet_id
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 */
tweetRouters.get(
  '/:tweet_id',
  TweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  wrapRequestHandler(audienceValidator),
  wrapRequestHandler(getTweetController)
)

/**
 * Description: Get Tweet Children
 * Post: /:tweet_id/children
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 * Query: { limit: number, page: number, tweet_type: TweetType }
 */
tweetRouters.get(
  '/:tweet_id/children',
  TweetIdValidator,
  paginationValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  wrapRequestHandler(audienceValidator),
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Description: Get new feeds
 * Post: /new-feeds
 * Method: GET
 * Header: { Authorization?: Bearer <access_token> }
 * Query: { limit: number, page: number }
 */
tweetRouters.get(
  '/',
  paginationValidator,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(audienceValidator),
  wrapRequestHandler(getNewFeedsController)
)

export default tweetRouters
