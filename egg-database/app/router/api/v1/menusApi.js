module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/getMenus', controller.menus.menus);
};
