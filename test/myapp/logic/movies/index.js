const Movies = require('../../sequelize/modules/movies');
const { Op } = require("sequelize");

module.exports = {
  async getMoviesByQuery(req, res) {
    // const { area } = req.query;
    const ret = await Movies.findAll({
      where: req.query
    })
    console.log('movie实例查询成功!');
    res.send({
      code: 0,
      msg: 'success',
      data: ret
    });
  },
  async addMovieInstance(req, res) {
    const params = req.body;
    const movie = await Movies.bulkCreate(params);
    console.log('movie实例已保存到数据库!');
    res.send({
      code: 0,
      msg: 'success',
      data: params
    })
  },
  async setMovieHot(req, res) {
    const data = req.body;
    try {
      const ret = await Movies.bulkCreate(data, { updateOnDuplicate: ['isHot'] });
      res.send({
        code: 0,
        msg: 'success',
        data: data
      })   
    } catch (error) {
      console.log(error);
    }
  }
}