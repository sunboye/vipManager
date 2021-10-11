module.exports = app => {
    const { router, controller } = app;
    router.get('/api/v1/logs', controller.logs.logsList);
};
  