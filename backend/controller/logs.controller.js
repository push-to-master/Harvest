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
      const numPlants = req.body.num_plants
      const date = new Date()
      const description = req.body.description

      const logResponse = await LogsDAO.addLog(
        userInfo,
        produce,
        type,
        totYield,
        numPlants,
        date,
        description
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}