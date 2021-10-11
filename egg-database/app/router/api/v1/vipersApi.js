module.exports = app => {
  const { router, controller } = app;
  router.get('/api/v1/vipers', controller.vipers.vipers);
  router.post('/api/v1/vipers/oprate', controller.vipers.viperOptate);
};
