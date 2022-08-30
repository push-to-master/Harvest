import LogsDAO from "../dao/logsDAO.js"

export default class LogsController {

  static async apiPostLog(req, res, next) {
    try {
      const userInfo = {
          name: req.body.user_name,
          _id: req.body.user_id,
          org_id: req.body.org_id
      }
      const produceName = req.body.produce_name
      const type = req.body.type
      const totYield = req.body.yield
      const numPlants = req.body.num_plants
      const date = new Date()

      const logResponse = await LogsDAO.addLog(
        userInfo,
        produceName,
        type,
        totYield,
        numPlants,
        date
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}