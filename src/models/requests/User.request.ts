import { JwtPayload } from 'jsonwebtoken'
import { TokenType } from '~/constants/enum'

export interface LoginRequestBody {
  email: string
  password: string
}

export interface VerifyEmailRequestBody {
  email_verify_token: string
}
export interface RegisterRequestBody {
  email: string
  name: string
  password: string
  confirm_password: string
  date_of_birth: string
}
export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface ForgotPasswordReqBody {
  email: string
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}
export interface ResetPasswordReqBody {
  confirm_password: string
  password: string
  forgot_password_token: string
}
