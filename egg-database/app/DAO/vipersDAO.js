module.exports = {
  async getViperListDB(app, params) {
    const table = app.config.mysql.tables.vipers;
    let count = 0;
    console.log(params)
    params.offset = (params.current - 1) * params.limit
    let sqlStr = "SELECT * FROM " + table + " LIMIT " + params.offset + "," + params.limit;
    let countStr = "SELECT COUNT(*) as count FROM " + table;
    if (params.query) {
      sqlStr = "SELECT * FROM " + table + " WHERE name LIKE '%" + params.query +"%' OR telephone LIKE '%" + params.query + "%'" + " LIMIT " + params.offset + "," + params.limit;
      countStr = "SELECT COUNT(*) as count FROM " + table + " WHERE name LIKE '%" + params.query +"%' OR telephone LIKE '%" + params.query + "%'";
    }
    console.log(sqlStr)
    console.log(countStr);
    count = await app.mysql.query(countStr);
    const data = await app.mysql.query(sqlStr);
    return {
      records: data,
      total: count.length ? count[0].count || 0 : 0,
      current: Number(params.current)
    };
  },

  async postViperMoneyDB(app, params) {
    const table1 = app.config.mysql.tables.vipers;
    const table2 = app.config.mysql.tables.opLogs;
    const opMoney = params.money;
    const vvid = params.vvid;
    let sqlStr1 = "";
    let sqlStr2 = "";
    let opResult = 1;
    if (params.opType === 1) {
      console.log(params)
      sqlStr1 = `UPDATE ${table1} SET balance=convert(balance-${opMoney},decimal(10,2)) WHERE id='${vvid}'`;
    } else {
      sqlStr1 = `UPDATE ${table1} SET balance=convert(balance+${opMoney},decimal(10,2)) WHERE id='${vvid}'`;
    }
    const data = await app.mysql.query(sqlStr1);
    sqlStr2 = `INSERT INTO ${table2} (user_id,op_type,money,op_result) VALUES ('${vvid}',${params.opType},${opMoney},${opResult})`;
    if (data.changedRows) {
      await app.mysql.query(sqlStr2);
    } else {
      opResult = 2;
      sqlStr2 = `INSERT INTO ${table2} (user_id,op_type,money,op_result) VALUES ('${vvid}',${params.opType},${opMoney},${opResult})`;
      await app.mysql.query(sqlStr2);
      return null;
    }
    return data;
  }
}