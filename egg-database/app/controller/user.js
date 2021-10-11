'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    console.log('进入login');
    const dataUsers = await ctx.service.user.userCheck(ctx.request.body);
    if (Object.keys(dataUsers).length) {
      ctx.body = ctx.service.common.formateReturn(dataUsers, 200, '登录成功');
    } else {
      ctx.body = ctx.service.common.formateReturn(dataUsers, 403, '请输入正确的账号和密码');
    }
    return ctx.body;
  }
}

module.exports = LoginController;