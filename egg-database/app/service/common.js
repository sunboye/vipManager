'use strict';

const Service = require('egg').Service;
const fs = require('fs');
class CommonService extends Service {
  formateReturn(fData, status, msg, isList) {
    let response = {
      data: fData || null,
      msg,
      status,
      success: status === 200 || status === '200'
    };
    return response;
  }
  async readJsonFile(filepath) {
    const fileData = await fs.readFileSync(filepath, 'utf8');
    return JSON.parse(fileData);
  }
}

module.exports = CommonService;
