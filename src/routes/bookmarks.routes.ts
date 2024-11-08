import { Router } from 'express'
import { bookmarksTweetController } from '~/controllers/bookmarks.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middleware'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarksRouter = Router()
/**
 * Description: Bookmark Tweet
 * Path: /
 * Method: POST
 * Body: { tweet_id: string }
 * Header: { Authorization: Bearer <access_token> }
 */
bookmarksRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(bookmarksTweetController))
export default bookmarksRouter
