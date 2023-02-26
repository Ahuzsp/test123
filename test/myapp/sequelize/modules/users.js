const { DataTypes, Model } = require('sequelize');
const sequelize = require('../index');

class Users extends Model {};

Users.init({
  account: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  // 在这里定义模型属性
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Users', // 我们需要选择模型名称
  timestamps: false
});
module.exports = Users;