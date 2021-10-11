'use strict';

const Controller = require('egg').Controller;

class MenusController extends Controller {
  async menus() {
    const { ctx } = this;
    console.log('进入menus');
    const menus = await ctx.service.menus.getMenusTree();
    console.dir('menus:' + menus);
    if (menus.length) {
      ctx.body = ctx.service.common.formateReturn(menus, 200, '获取导航成功');
    } else {
      ctx.body = ctx.service.common.formateReturn(menus, 500, '获取导航失败');
    }
    return ctx.body;
  }
}

module.exports = MenusController;
