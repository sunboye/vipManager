module.exports = {
  async getLoginDB(app, params) {
    const table = app.config.mysql.tables.login;
    const sqlStr = "SELECT * FROM " + table + " WHERE name='" + params.name + "' AND password='" + params.password + "'";
    console.log('sqlStr:' + sqlStr);
    const data = await app.mysql.query(sqlStr);
    return data;
  }
}