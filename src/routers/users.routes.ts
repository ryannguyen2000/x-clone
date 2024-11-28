import { Router } from 'express'
import {
  changePasswordController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfieController,
  loginController,
  logoutController,
  oauthController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  unfollowController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  verifyEmailTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  forgotPasswordValidator,
  verifyForgotPasswordValidator,
  verifiedUserValidator,
  updateMeValidator,
  followValidator,
  unfollowValidator,
  changePasswordValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

/**
 * Description: Login a new user
 * Path: /login
 * Method: POST
 * Body: { name: string, email:   string, password: string }
 */
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description: OAuth with Google
 * Path: /oauth/goolge
 * Method: GET
 */
usersRouter.get('/oauth/google', wrapRequestHandler(oauthController))

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email:   string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description: Logout a new user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bear <access_token> }
 * Body: { refresh_token: string  }
 */
usersRouter.get('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description: Refresh token
 * Path: /refresh-token
 * Method: POST
 * Body: { refresh_token: string  }
 */
usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Description: Verify email when client click on the link in email
 * Path: /verify-email
 * Method: POST
 * Body: { email_refresh_token: string  }
 */
usersRouter.post('/verify-email', verifyEmailTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description: Resend verify email when client click on the link in email
 * Path: /resend-verify-email
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { }
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

/**
 * Description: Submit email to reset password, send email to user
 * Path: /forgot-password
 * Method: POST
 * Body: { email: string }
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description: Verify link in email to reset password
 * Path: /verify-forgot-password
 * Method: POST
 * Body: {forgot_password_token: string}
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordValidator,
  wrapRequestHandler(verifyForgotPasswordTokenController)
)

/**
 * Description: Get my profile
 * Path: /me
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Description: Update my profile
 * Path: /me
 * Method: PATCH
 * Header: { Authorization: Bearer <access_token> }
 * Body: UserSchema
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'username',
    'bio',
    'location',
    'website',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)

/**
 * Description: Get user profile
 * Path: /:username
 * Method: GET
 * Header: { Authorization: Bearer <access_token> }
 */
usersRouter.get('/:username', wrapRequestHandler(getProfieController))

/**
 * Description: Follow someone
 * Path: /follow
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { followed_user_id: string }
 */
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

/**
 * Description: delete followed someone
 * Path: /follow
 * Method: DELETE
 * Header: { Authorization: Bearer <access_token> }
 * Body: { user_id: string }
 */
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

/**
 * Description: change password
 * Path: /change-password
 * Method: PUT
 * Header: { Authorization: Bearer <access_token> }
 * Body: { old_password: string, password: string, confirm_password: string }
 */
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default usersRouter
