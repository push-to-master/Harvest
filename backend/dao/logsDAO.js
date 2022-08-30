import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let logs

export default class LogsDAO {
  static async injectDB(conn) {
    if (logs) {
      return
    }
    try {
      logs = await conn.db(process.env.HARVEST_NS).collection("logs")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addLog(restaurantId, user, review, date) {
    try {
      const reviewDoc = { name: user.name,
          user_id: user._id,
          date: date,
          text: review,
          restaurant_id: ObjectId(restaurantId), }

      return await logs.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }
}