import LogsDAO from "../dao/logsDAO.js"

export default class LogsController {

  static async apiPostLog(req, res, next) {
    try {
      const userInfo = {
          name: req.body.user_name,
          _id: req.body.user_id,
          org_id: req.body.org_id
      }
      const produce = req.body.produce
      const type = req.body.type
      const totYield = req.body.yield
      const date = new Date(req.body.date)
      const description = req.body.description
      const category = req.body.category

      const logResponse = await LogsDAO.addLog(
        userInfo,
        produce,
        type,
        totYield,
        date,
        description,
        category
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }
  // api for getting logs. 
  static async apiGetLogs(req, res, next) {
    const logsPerPage = req.query.logsPerPage ? parseInt(req.query.logsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.type) {
      filters.type = req.query.type
    } else if (req.query.produce) {
      filters.produce = req.query.produce
    } else if (req.query.user_name) {
      filters.user_name = req.query.user_name
    }

    const { logsList, totalNumLogs } = await LogsDAO.getLogs({
      filters,
      page,
      logsPerPage,
    })

    let response = {
      logs: logsList,
      page: page,
      filters: filters,
      entries_per_page: logsPerPage,
      total_results: totalNumLogs,
    }
    res.json(response)
  }
}