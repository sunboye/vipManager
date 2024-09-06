'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/api/v1/loginApi')(app);
  require('./router/api/v1/vipersApi')(app);
  require('./router/api/v1/logsApi')(app);
  require('./router/api/v1/menusApi')(app);
};
