module.exports = {
    async getLogsDB(app, params) {
      const table = app.config.mysql.tables.opLogs;
      let count = 0;
      params.offset = (Number(params.pagenum) - 1) * params.limit
      const sqlStr = `SELECT * FROM ${table} LIMIT ${params.offset},${params.limit}`;
      let countStr = `SELECT COUNT(*) as count FROM ${table}`;
      console.log('sqlStr:' + sqlStr);
      count = await app.mysql.query(countStr);
      const data = await app.mysql.query(sqlStr);
      data.total = count[0].count;
      data.pagenum = Number(params.pagenum);
      return data;
    }
}