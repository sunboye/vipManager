module.exports = options => {
  return async function jwtMiddleware(ctx, next) {
    const token = ctx.get('Authorization');
    try {
      if (ctx.request.path !== '/api/v1/login') {
        const realToken = token ? token.indexOf('Bearer ') > -1 ? token.split('Bearer ')[1] : token : null
        await ctx.app.jwt.verify(realToken);
      }
      await next();
    } catch (err) {
      console.dir(err)
      ctx.status = 401;
      ctx.body = {
        code: 401,
        success: false,
        msg: token ? '会话超时，请重新登录' : 'Token 校验失败，请登录',
        data: null
      };
    }
  };
};