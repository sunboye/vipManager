module.exports = () => {
  return async function loggerMiddleware(ctx, next) {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.logger.info(`${ctx.status} - ${ms}ms`);
  };
};