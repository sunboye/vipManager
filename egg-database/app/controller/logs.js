'use strict';

const Controller = require('egg').Controller;

class LogsController extends Controller {
  async logsList() {
    const { ctx } = this;
    console.log('进入logs');
    const dataLogs = await ctx.service.logs.getLogs();
    if (dataLogs) {
      ctx.body = ctx.service.common.formateReturn(dataLogs, 200, '获取日志列表成功', true);
    } else {
      ctx.body = ctx.service.common.formateReturn(dataLogs, 403, '获取日志列表失败', true);
    }
    return ctx.body;
  }
}

module.exports = LogsController;
