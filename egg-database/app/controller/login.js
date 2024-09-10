'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async login() {
    const { ctx } = this;
    console.log('进入login');
    const dataUsers = await ctx.service.login.getLogin();
    if (dataUsers && dataUsers.length) {
      const token = await ctx.app.jwt.sign({
        data: { ...dataUsers[0] }, // 可以添加更多的用户信息
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // 设置过期时间
      });
      ctx.body = ctx.service.common.formateReturn({ token }, 200, '登录成功');
      // ctx.set('token', token);
      // ctx.set('Access-Control-Expose-Headers', 'token');
    } else {
      ctx.body = ctx.service.common.formateReturn(null, 403, '请输入正确的账号和密码');
    }
    return ctx.body;
  }
}

module.exports = LoginController;
