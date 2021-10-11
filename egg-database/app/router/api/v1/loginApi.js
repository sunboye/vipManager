module.exports = app => {
  const { router, controller } = app;
  router.post('/api/v1/login', controller.login.login);
};
