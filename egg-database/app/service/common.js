'use strict';

const Service = require('egg').Service;
class CommonService extends Service {
  formateReturn(fData, status, msg, isList) {
    console.log(fData)
    let response = {
      data: fData || null,
      msg,
      status,
      success: status === 200 || status === '200'
    };
    return response;
  }
}

module.exports = CommonService;
