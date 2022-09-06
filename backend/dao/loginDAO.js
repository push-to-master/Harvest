import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let user

export default class LoginDAO {
  static async injectDB(conn) {
    if (user) {
      return
    }
    try {
      user = await conn.db(process.env.HARVEST_NS).collection("users")
    } catch (e) {
      console.error(`Unable to establish collection handles in usersDAO: ${e}`)
    }
  }

  static async getUser({
    filters = null,
  } = {}) {
    let query
    if (filters) {
      if ("user_name" in filters) {
        query = { $text: { $search: filters["user_name"] } }
      }
    }

    let cursor
    
    try {
      cursor = await user.find(query)
      const users = await cursor.toArray()
      const userDetails = users[0]

      return { userDetails }
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { user_details: {} }
    }
  }

  static async createUser(userInfo) {
    try {
      const reviewDoc = { 
        user_name: userInfo.name,
        password: userInfo.password
      }

      return await user.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to create user: ${e}`)
      return { error: e }
    }
  }
}