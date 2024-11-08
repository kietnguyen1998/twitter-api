import { Collection, Db, MongoClient } from 'mongodb'
import 'dotenv/config'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.shema'
import Tweet from '~/models/schemas/Tweet.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'
import Bookmark from '~/models/schemas/Bookmark.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cwpndke.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (err) {
      console.log('err', err)
    }
  }
  async indexUsers() {
    const exist = await this.users.indexExists(['email_1_password_1', 'username_1', 'email_1'])
    if (!exist) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 }, { unique: true })
    }
  }
  async indexRefreshToken() {
    const exist = await this.refreshToken.indexExists(['exp_1', 'token_1'])
    if (!exist) {
      this.refreshToken.createIndex({ token: 1 })
      this.refreshToken.createIndex({ exp: 1 }, { expireAfterSeconds: 0 })
    }
  }
  indexVideoStatus() {}
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  get tweets(): Collection<Tweet> {
    return this.db.collection(process.env.DB_TWEETS_COLLECTION as string)
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
  }
  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string)
  }
  get hashtags(): Collection<Hashtag> {
    return this.db.collection(process.env.DB_HASHTAG_COLLECTION as string)
  }
  get bookmark(): Collection<Bookmark> {
    return this.db.collection(process.env.DB_BOOKMARKS_COLLECTION as string)
  }
}

const databaseService = new DatabaseServices()
export default databaseService
