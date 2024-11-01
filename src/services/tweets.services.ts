import { TweetRequestBody } from '~/models/requests/Tweets.request'

class TweetService {
  createTweet(body: TweetRequestBody) {
    return body
  }
}

const tweetService = new TweetService()
export default tweetService
