import OrgsDAO from "../dao/orgsDAO.js"

export default class OrgsController {

  static async apiPostOrg(req, res, next) {
    try {
      const name = req.body.name
      const description = req.body.description
      const isPersonal = req.body.is_personal
      const members = req.body.members

      const orgResponse = await OrgsDAO.addOrg(
        name,
        description,
        isPersonal,
        members
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetOrgs(req, res, next) {
    const orgsPerPage = req.query.orgsPerPage ? parseInt(req.query.orgsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.name) {
      filters.name = req.query.name
    }

    const { orgsList, totalNumOrgs } = await OrgsDAO.getOrgs({
      filters,
      page,
      orgsPerPage,
    })

    let response = {
      logs: orgsList,
      page: page,
      filters: filters,
      entries_per_page: orgsPerPage,
      total_results: totalNumOrgs,
    }
    res.json(response)
  }
}