import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let orgs

export default class OrgsDAO {
  static async injectDB(conn) {
    if (orgs) {
      return
    }
    try {
      orgs = await conn.db(process.env.HARVEST_NS).collection("orgs")
    } catch (e) {
      console.error(`Unable to establish collection handles in orgsDAO: ${e}`)
    }
  }

  static async addOrg(name, description = "", isPersonal = false, members = []) {
    try {
      const reviewDoc = { 
        name: name,
        description: description,
        is_personal: isPersonal,
        members: members
      }

      return await orgs.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async getOrgs({
    filters = null,
    page = 0,
    orgsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
      }
    }

    let cursor
    
    try {
      cursor = await orgs
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { orgsList: [], totalNumOrgs: 0 }
    }

    const displayCursor = cursor.limit(orgsPerPage).skip(orgsPerPage * page)

    try {
      const orgsList = await displayCursor.toArray()
      const totalNumOrgs = await orgs.countDocuments(query)

      return { orgsList, totalNumOrgs }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { orgsList: [], totalNumOrgs: 0 }
    }
  }
}