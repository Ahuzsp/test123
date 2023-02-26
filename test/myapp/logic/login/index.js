const Users = require('../../sequelize/modules/users');
const { Op } = require("sequelize");

module.exports = {
  async createUser(req, res) {
    const user = req.body;
    try {
      const ret = await Users.create(user);
      if (ret instanceof Users) {
        res.send({
          code: 0,
          message: 'ok',
          data: user
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  async userLogin(req, res) {
    const user = req.body;
    try {
      const ret = await Users.findAll({
        where: user
      });
      if (ret[0] instanceof Users) {
        res.cookie('name', user.account, { maxAge: 60000 });
        res.send({
          code: 0,
          message: 'ok',
          data: user
        })
      } else {
        console.log('当前账号不存在！');
        res.send({
          code: 2,
          message: '当前账号不存在！',
          data: user
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
}