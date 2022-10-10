import CategoryDAO from "../dao/categoryDAO.js"

export default class CategoryController {
  static async apiGetCategory(req, res, next) {
    const CategoryPerPage = req.query.CategoryPerPage ? parseInt(req.query.CategoryPerPage, 10) : 100
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

  
    let filters = {}
    if (req.query.Supertype) {
      filters.Supertype = req.query.Supertype
    } else if (req.query.Type) {
      filters.Type = req.query.Type
    } else if (req.query.produce) {
      filters.Food = req.query.Food
    }

    const { categoryList, totalNumcategory } = await CategoryDAO.getcategory({
      filters,
      page,
      CategoryPerPage,
    })

    let response = {
      category: categoryList,
      page: page,
      filters: filters,
      entries_per_page: CategoryPerPage,
      total_results: totalNumcategory,
    }
    res.json(response)
      }
}