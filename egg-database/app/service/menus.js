'use strict';

const Service = require('egg').Service;
const fs = require('fs');

class MenusService extends Service {
  async getMenusTree() {
    const { service } = this;
    console.log('getMenusTree');
    const menus = await service.common.readJson('menus');
    console.log('menus:' + menus);
    return menus;
  }
}

module.exports = MenusService;
