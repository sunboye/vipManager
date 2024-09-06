'use strict';

const Service = require('egg').Service;
const fs = require('fs');
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
  async readJsonFile(filepath) {
    // return new Promise((resolve, reject) => {
    //   fs.readFile(filepath, 'utf8', function (err, data) {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(JSON.parse(data));
    //     }
    //   });
    // });
    const fileData = await fs.readFileSync(filepath, 'utf8');
    return JSON.parse(fileData);
  }
}

module.exports = CommonService;
