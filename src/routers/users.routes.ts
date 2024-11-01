import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidater, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '~/utils/validation'

const usersRouter = Router()

// usersRouter.post('/login', loginValidater, loginController)

/**
 * Description: Register a new user
 * Path: /register
 * Method: POST
 * Body: { name: string, email:   string, password: string, confirm_password: string, date_of_birth: ISO8601 }
 */
usersRouter.post('/register', validate(registerValidator), wrapRequestHandler(registerController))

export default usersRouter
