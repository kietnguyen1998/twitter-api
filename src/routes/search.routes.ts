import { Router } from 'express'
import { searchController } from '~/controllers/search.controller'
import { paginationValidator } from '~/middlewares/tweets.middleware'
import { accessTokenValidator } from '~/middlewares/users.middleware'

const searchRouter = Router()
searchRouter.get('/', accessTokenValidator, paginationValidator, searchController)
export default searchRouter
