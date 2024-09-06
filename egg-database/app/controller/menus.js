'use strict';

const Controller = require('egg').Controller;

class MenusController extends Controller {
  async menus() {
    const { ctx } = this;
    console.log('进入menus');
    const data = await ctx.service.menus.getMenusTree();
    if (data && data.menus && data.menus.length) {
      ctx.body = ctx.service.common.formateReturn(data.menus, 200, '获取导航成功');
    } else {
      ctx.body = ctx.service.common.formateReturn(data.menus, 500, '获取导航失败');
    }
    return ctx.body;
  }
}

module.exports = MenusController;
