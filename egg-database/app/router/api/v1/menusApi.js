module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/menus', controller.menus.menus);
};
