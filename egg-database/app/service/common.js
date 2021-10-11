'use strict';

const Service = require('egg').Service;
class CommonService extends Service {
  formateReturn(fData, status, msg, isList) {
    let param = {
      data: fData || null,
      meta: { msg: msg, status: status },
    };
    if (isList) {
      console.log('isList:' + isList);
      param.total = fData.total;
      param.pagenum = fData.pagenum;
    }
    return param;
  }
}

module.exports = CommonService;
