import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controllers'
import {
  uploadImageController,
  uploadVideoController,
  uploadVideoHlsController
} from '~/controllers/medias.controllers'
import { TweetValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const bookmarksRouter = Router()

/**
 * Description: Bookmark Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: {Authorization: Bearer <access_token>}
 */
bookmarksRouter.post('', accessTokenValidator, verifiedUserValidator, TweetValidator, wrapRequestHandler(bookmarkTweetController))

/**
 * Description: Unbookmark Tweet
 * Path: /:tweet_id
 * Method: DELETE
 * Body: { tweet_id: string }
 * Header: {Authorization: Bearer <access_token>}
 */
   bookmarksRouter.delete(
  '/tweet/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  TweetValidator,
  wrapRequestHandler(unbookmarkTweetController)
)

export default bookmarksRouter
