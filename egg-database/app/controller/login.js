'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    console.log('进入login');
    const dataUsers = await ctx.service.login.getLogin();
    console.log(dataUsers);
    if (dataUsers) {
      ctx.body = ctx.service.common.formateReturn(dataUsers, 200, '登录成功');
      if (dataUsers[0].token) {
        ctx.set('token', dataUsers[0].token);
      }
      ctx.set('Access-Control-Expose-Headers', 'token');
    } else {
      ctx.body = ctx.service.common.formateReturn(dataUsers, 403, '请输入正确的账号和密码');
    }
    return ctx.body;
  }
}

module.exports = LoginController;
