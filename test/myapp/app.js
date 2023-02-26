const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./sequelize/index');
const movieRoute = require('./routes/movies');
const cinemaRoute = require('./routes/cinema');
const loginRoute = require('./routes/login');

const app = express();
// 解决跨域
app.use(cors());
// 解决post拿不到参数问题和请求体过大问题
app.use( bodyParser.json({limit: "15360mb", type:'application/json'}) );      
app.use(bodyParser.urlencoded({
  limit: "15360mb",
  extended: true,
  parameterLimit:5000000,
  type:'application/json'
})); 
app.use('/movie', movieRoute);
app.use('/cinema', cinemaRoute);
app.use('/login', loginRoute);
// 启动sequelize连接数据库
(async function() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
app.listen(8000, () => {
  console.log(`Example app listening on port 8000`);
})

module.exports = app;