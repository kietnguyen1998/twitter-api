import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import { SearchQuery } from '~/models/requests/Search.request'
import searchService from '~/services/search.services'

export const searchController = async (req: Request<ParamsDictionary, any, any, SearchQuery>, res: Response) => {
  const limit = +req.query.limit
  const page = +req.query.page
  const result = await searchService.search({
    limit,
    page,
    content: req.query.content,
    media_type: req.query.media_type,
    user_id: req.decoded_authorization?.user_id as string,
    people_follow: req.query.people_follow
  })
  res.json({
    message: 'Search Successfully',
    result: {
      tweets: result.tweets,
      limit,
      page,
      total_page: Math.ceil(result.total / limit)
    }
  })
}
