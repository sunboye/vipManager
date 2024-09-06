'use strict';

const Service = require('egg').Service;
const { getViperListDB, postViperMoneyDB } = require('../DAO/vipersDAO');
class VipersService extends Service {
  async getVipersList() {
    const {ctx, app} = this;
    const params = {}
    console.dir(ctx.request.query);
    params.limit = ctx.request.query.size
    params.current = ctx.request.query.current;
    params.query = ctx.request.query.query
    let vipers = await getViperListDB(app, params);
    if (vipers) {
      vipers = ctx.service.common.formateReturn(vipers, 200, '获取会员列表成功', true);
    } else {
      vipers = ctx.service.common.formateReturn(vipers, 403, '获取会员列表失败', true);
    }
    return vipers;
  }
  async oprateViperMoney() {
    const {ctx, app} = this;
    let params = {}
    console.dir(ctx.request.body);
    params = ctx.request.body
    let vipers = await postViperMoneyDB(app, params);
    if (vipers) {
      vipers = ctx.service.common.formateReturn(vipers, 200, '操作成功', false);
    } else {
      vipers = ctx.service.common.formateReturn(vipers, 403, '操作失败，请重试', false);
    }
    console.dir(vipers);
    return vipers;
  }
}

module.exports = VipersService;
