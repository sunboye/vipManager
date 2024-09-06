'use strict';

const Service = require('egg').Service;
const { getLogsDB } = require('../DAO/logsDAO.js');

class LogsService extends Service {
  async getLogs() {
    const {ctx, app} = this;
    const params = {}
    console.dir(ctx.request.query);
    params.limit = ctx.request.query.size
    params.current = Number(ctx.request.query.current);
    params.query = ctx.request.query.query
    const logsList = await getLogsDB(app, params);
    return logsList;
  }
}

module.exports = LogsService;
