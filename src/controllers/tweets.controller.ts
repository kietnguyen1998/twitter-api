import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetRequestBody } from '~/models/requests/Tweets.request'
import { TokenPayload } from '~/models/requests/User.request'
import tweetService from '~/services/tweets.services'

export const createTweetController = async (req: Request<ParamsDictionary, any, TweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetService.createTweet(user_id, req.body)
  return res.json({
    message: 'Create Tweet Successfully',
    result
  })
}

export const getTweetController = async (req: Request, res: Response) => {
  //   const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  //   const tweet = {
  //     ...req.tweet,
  //     guest_views: result.guest_views,
  //     user_views: result.user_views,
  //     updated_at: result.updated_at
  //   }
  return res.json({
    message: 'Get Tweet Successfully',
    result: req.tweet
  })
}
