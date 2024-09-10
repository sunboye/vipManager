/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  config.cluster = {
    listen: {
      path: '',
      port: 8811,
      hostname: ''
    } 
  };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ]
  };
  config.jwt = {
    secret: 'secret_key_qiangqiang', // 用于签名的密钥
    expiresIn: '7d', // Token 过期时间
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1628171874901_5541';

  // add your middleware config here
  config.middleware = [
    'jwtMiddleware'
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'eggqq',
  };

  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: 'root',
      // 数据库名
      // database: 'viper_manager',
      database: 'myvipers',
    },
    tables: {
      login: 'admin_users',
      vipers: 'vip_users',
      opLogs: 'oprate_log'
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }

  return {
    ...config,
    ...userConfig,
  };
};
