import { Router } from 'express'
import { getTweetController, tweetController } from '~/controllers/tweets.controllers'
import { audienceValidator, createTweetIdValidator, TweetIdValidator } from '~/middlewares/tweets.middlewares'
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

export default tweetRouters
