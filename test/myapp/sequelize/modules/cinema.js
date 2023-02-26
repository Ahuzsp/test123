const { DataTypes, Model } = require('sequelize');
const sequelize = require('../index');

class Cinema extends Model {};

Cinema.init({
  poid: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  // 在这里定义模型属性
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  distance: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Cinema', // 我们需要选择模型名称
  timestamps: false
});

module.exports = Cinema; 