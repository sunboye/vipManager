'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class userService extends Service {
  async getUsersList() {
    const { service } = this;
    const userList = await service.common.readJson('users');
    return userList;
  }

  async userCheck(tarUser) {
    const users = await this.getUsersList();
    let i = 0,
      flag = false;
    for (i = 0; i < users.length; i++) {
      if (users[i].username === tarUser.username && users[i].password === tarUser.password) {
        flag = true;
        break;
      }
    }
    return flag ? users[i] : {};
  }
}

module.exports = userService;
