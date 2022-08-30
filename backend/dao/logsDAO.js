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

  static async addLog(userInfo, produce, type, totYield, numPlants, date, description) {
    try {
      const reviewDoc = { 
        user_name: userInfo.name,
        user_id: ObjectId(userInfo._id),
        org_id: ObjectId(userInfo.org_id),
        produce: produce,
        type: type,
        yield: totYield,
        num_plants: numPlants,
        date: date,
        description: description
      }

      return await logs.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }
}