const { Sequelize } = require('sequelize');
// mysql账号：root,密码：root
const sequelize = new Sequelize('movies', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;
