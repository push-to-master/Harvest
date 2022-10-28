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
      console.error(`Unable to establish collection handles in logsDAO: ${e}`)
    }
  }

  static async addLog(userInfo, produce, type, totYield, date, description, category) {
    try {
      const reviewDoc = { 
        user_name: userInfo.name,
        user_id: ObjectId(userInfo._id),
        org_id: ObjectId(userInfo.org_id),
        produce: produce,
        type: type,
        yield: totYield,
        date: date,
        description: description,
        category: category
      }

      return await logs.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }
  // gets logs
  static async getLogs({
    filters = null,
    page = 0,
    logsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("user_name" in filters) {
        query = { $text: { $search: filters["user_name"] } }
      } else if ("type" in filters) {
        query = { "type": { $eq: filters["type"] } }
      } else if ("produce" in filters) {
        query = { "produce": { $eq: filters["produce"] } }
      }
    }

    let cursor
    
    try {
      cursor = await logs
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { logsList: [], totalNumLogs: 0 }
    }

    const displayCursor = cursor.limit(logsPerPage).skip(logsPerPage * page)

    try {
      const logsList = await displayCursor.toArray()
      const totalNumLogs = await logs.countDocuments(query)

      return { logsList, totalNumLogs }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { logsList: [], totalNumLogs: 0 }
    }
  }
}