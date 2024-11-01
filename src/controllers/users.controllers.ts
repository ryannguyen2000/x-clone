import { Request, RequestHandler, Response } from 'express'
import usersService from '~/services/users.services'
import { NextFunction, ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

export const loginController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (email === 'nguyenthaibao' && password === '123456') {
    return res.status(200).json({
      message: 'Login success'
    })
  }
  res.json({
    message: 'Login success'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await usersService.register(req.body)
  return res.json({
    message: 'Register success',
    result
  })
}
