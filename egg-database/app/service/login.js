'use strict';

const Service = require('egg').Service;
const { getLoginDB } = require('../DAO/loginDAO.js');

class LoginService extends Service {
  async getLogin() {
    const {ctx, app} = this;
    const params = {
      name: ctx.request.body.name,
      password: ctx.request.body.password
    }
    const loginUser = await getLoginDB(app, params);
    return loginUser;
  }
}

module.exports = LoginService;
