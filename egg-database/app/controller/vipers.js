'use strict';

const Controller = require('egg').Controller;

class VipersController extends Controller {
  async vipers() {
    const { ctx } = this;
    console.log('进入vipers');
    console.dir(ctx.request.body);
    ctx.body = await ctx.service.vipers.getVipersList();
    return ctx.body;
  }
  async viperOptate() {
    const { ctx } = this;
    console.log('充值消费');
    console.dir(ctx.request.body);
    ctx.body = await ctx.service.vipers.oprateViperMoney();
    return ctx.body;
  }
}

module.exports = VipersController;
