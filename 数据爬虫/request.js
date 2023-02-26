//导入依赖包
const fs = require("fs");
const path = require("path");
const request = require("request");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");

const requestPromise = function(url) {
  return new Promise((resolve, reject) => {
    request(url, { encoding: null }, (error, response, body) => {
      if (response && response.statusCode === 200) {
        const bufs = iconv.decode(body, 'gb2312');
        const html = bufs.toString(bufs);
        resolve(html);
      } else {
        reject(error);
      }
    })
  })
}
const host = 'https://m.dytt8.net/';
const url = 'html/gndy/rihan/list_6_3.html';

requestPromise(host + url).then(async res => {
  const ret = [];
  const $ = cheerio.load(res);
  const list = $('.co_content8 > ul > table > tbody > tr:nth-child(2) > td:nth-child(2) > b > a');
  for (let item of list) {
    const url = $(item).attr('href');
    const movies = await getMovieDetail(url);
    if (!ret.includes(movies)) {
      ret.push(movies);
    }
  }
  result = JSON.stringify(ret);
  //将数组输出到json文件里  刷新目录 即可看到当前文件夹多出一个boss.json文件(打开boss.json文件，ctrl+A全选之后 ctrl+K，再Ctrl+F即可将json文件自动排版)
  fs.writeFile("result.json", result, "utf-8", (error) => {
    //监听错误，如正常输出，则打印null
    if (error == null) {
      console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)");
    }
  });
  // $('.co_content8 > ul > table > tbody > tr:nth-child(2) > td:nth-child(2) > b > a').each(async (i, item)=> {
  //   const url = $(item).attr('href');
  //   const movies = await getMovieDetail(url);
  //   ret.push(movies);
  //   //将数组转换成字符串
  //   if (ret.length === 25) {
  //     result = JSON.stringify(ret);
  //     //将数组输出到json文件里  刷新目录 即可看到当前文件夹多出一个boss.json文件(打开boss.json文件，ctrl+A全选之后 ctrl+K，再Ctrl+F即可将json文件自动排版)
  //     fs.writeFile("result.json", result, "utf-8", (error) => {
  //       //监听错误，如正常输出，则打印null
  //       if (error == null) {
  //         console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)");
  //       }
  //     });
  //   }
  // })
})
const descMap = {
  oName: {
    label: '译名',
    value: ''
  },
  name: {
    label: '片名',
    value: ''
  },
  year: {
    label: '年代',
    value: ''
  },
  country: {
    label: '产地',
    value: ''
  },
  type: {
    label: '类别',
    value: ''
  },
  releaseDate: {
    label: '上映日期',
    value: ''
  },
  rate: {
    label: '评分',
    value: ''
  },
  actors: {
    label: '主演',
    value: ''
  },
  desc: {
    label: '简介',
    value: ''
  },
}
const waitFor = function(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve(), delay);
  })
}
const getMovieDetail = async (url) => {
  const html = await requestPromise(host + url);
  await waitFor(800);
  const $ = cheerio.load(html);
  const allDesc = JSON.stringify($('#Zoom > span').text()).replace(/\s+/g, '').replace(/\\\n/g, '');
  const descArr = allDesc.split('◎');
  const picture = $('#Zoom > span > img').attr('src');
  descArr.forEach((item) => {
    for (let k in descMap) {
      const idx = item.indexOf(descMap[k].label);
      if (idx > -1) {
        descMap[k].value = item.replace(new RegExp(descMap[k].label), '');
        const dIdx = item.indexOf('磁力');
        if (k === 'desc' && dIdx > -1) {
          descMap[k].value = item.slice(0, dIdx);
        }
      }
    }
  })
  const movies = {
    name: descMap['name'].value,
    desc: descMap['desc'].value,
    picture,
    country: descMap['country'].value,
    oName: descMap['oName'].value,
    year: descMap['year'].value,
    type: descMap['type'].value,
    releaseDate: descMap['releaseDate'].value,
    rate: descMap['rate'].value,
    actors: descMap['actors'].value,
  }
  return movies;
}
