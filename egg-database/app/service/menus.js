'use strict';

const Service = require('egg').Service;
const path = require('path');

class MenusService extends Service {
  async getMenusTree() {
    const { service } = this;
    console.log('getMenusTree');
    const menus = await service.common.readJsonFile(path.resolve(__dirname, '../../static/menus.json'));
    // console.log(menus);
    return menus;
  }
}

module.exports = MenusService;
