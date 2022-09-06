import LoginDAO from "../dao/loginDAO.js"

export default class LoginController {

  static async apiGetUser(req, res, next) {

    let filters = {}
    if (req.body.user_name) {
      filters.user_name = req.body.user_name;
    }
    if (req.body.password){
      filters.password = req.body.password;
    }

    const { userDetails } = await LoginDAO.getUser({
      filters
    })
    
    let response = {
      user_details: userDetails,
    }
    res.json(response)
  }
}