import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controller'
import {
  accessTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
/**
 * Description. Logout a user
 * Path: /logout
 * Method: POST
 * Header: { Authorization: Bearer <access_token> }
 * Body: { refresh_token: string }
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
export default usersRouter
