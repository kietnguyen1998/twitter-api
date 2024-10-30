import { TweetAudience, TweetType } from './../constants/enum'
import { checkSchema } from 'express-validator'
import { TWEETS_MESSAGES } from '~/constants/messages'
import { numberEnumToArray } from '~/utils/common'
import { validate } from '~/utils/validation'
const tweetType = numberEnumToArray(TweetType)
const tweetAudience = numberEnumToArray(TweetAudience)
console.log('TweetType', tweetType)
export const createTweetValidator = validate(
  checkSchema({
    type: {
      isIn: {
        options: tweetType,
        errorMessage: TWEETS_MESSAGES.INVALID_TYPE
      }
    },
    audience: {
      isIn: {
        options: tweetAudience,
        errorMessage: TWEETS_MESSAGES.INVALID_AUDIENCE
      }
    }
  })
)
