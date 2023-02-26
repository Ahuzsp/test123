const Cinema = require('../../sequelize/modules/cinema');
const { Op } = require("sequelize");

module.exports = {
  async addCinemaBatch(req, res) {
    const params = req.body;
    await Cinema.bulkCreate(params);
    console.log('cinema实例已保存到数据库!');
    res.send({
      code: 0,
      msg: 'success',
      data: params
    })
  },
  async getAllCinema(req, res) {
    const allCinemas = await Cinema.findAll();
    if (allCinemas.every(user => user instanceof Cinema)) {
      res.send({
        code: 0,
        msg: 'success',
        data: allCinemas
      })
    }
  },
  async findAllCinemaByQuery(req, res) {
    const query = req.query;
    const queryCinemas = await Cinema.findAll({
      where: {
        [Op.and]: [ query ]
      }
    })
    if (queryCinemas.every(user => user instanceof Cinema)) {
      res.send({
        code: 0,
        msg: 'success',
        data: queryCinemas
      })
    }
  }
}