const { DataTypes, Model } = require('sequelize');
const sequelize = require('../index');

class Movies extends Model {};

Movies.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  // 在这里定义模型属性
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rate: {
    type: DataTypes.STRING,
    allowNull: false
  },
  actors: {
    type: DataTypes.TEXT
  },
  area: {
    type: DataTypes.STRING
  },
  director: {
    type: DataTypes.TEXT
  },
  description: {
    type: DataTypes.TEXT
  },
  picture: {
    type: DataTypes.STRING
  },
  type: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.STRING
  },
  playUrl: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isHot: {
    type: DataTypes.INTEGER,
  },
  isFollow: {
    type: DataTypes.INTEGER,
  }
}, {
  // 这是其他模型参数
  sequelize, // 我们需要传递连接实例
  modelName: 'Movies', // 我们需要选择模型名称
  timestamps: false
});
module.exports = Movies;