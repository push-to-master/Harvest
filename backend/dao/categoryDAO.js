import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let category

export default class CategoryDAO {
  static async injectDB(conn) {
    if (category) {
      return
    }
    try {
      category = await conn.db(process.env.HARVEST_NS).collection("category")
    } catch (e) {
      console.error(`Unable to establish collection handles in CategoryDAO: ${e}`)
    }
  }

  static async getcategory({
    filters = null,
    page = 0,
    categoryPerPage = 100,
  } = {}) {
    let query
    if (filters) {
      if ("Type" in filters) {
        query = { "Type": {  $eq: filters["Type"]} }
      }
    }
    let cursor
    
    try {
      cursor = await category
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { categoryList: [], totalNumcategory: 0 }
    }

    const displayCursor = cursor.limit(categoryPerPage).skip(categoryPerPage * page)

    try {
      const categoryList = await displayCursor.toArray()
      const totalNumcategory = await category.countDocuments(query)

      return { categoryList, totalNumcategory }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { categoryList: [], totalNumcategory: 0 }
    }
  }
}