//导入依赖包
const http = require("http");
const path = require("path");
const fs = require("fs");

const superagent = require("superagent");
const cheerio = require("cheerio");
// http://www.lfanbai.com/pxo-1---/area/%E6%B3%B0%E5%9B%BD.html
const host = 'http://www.lfanbai.com/';
const url = 'pxo-1-3--/area/%E6%B3%B0%E5%9B%BD.html';
const waitFor = function(delay) {
  return new Promise((resolve) => {
    setTimeout(resolve(), delay);
  })
}
const getChildrenInfo = async function(childrenUrl) {
  try {
    const res = await superagent.get(host + childrenUrl);
    await waitFor(800);
    const $ = cheerio.load(res.text);
    // const detail = $('.container > div:nth-child(1) .myui-content__detail');
    const picture = $('.container > div:nth-child(1) .myui-content__thumb > a > img').attr('src');
    const name = $('h1').text();
    const rate = $('#rating > span.branch').text();
    const type = $('.container > div:nth-child(1) .myui-content__detail > a:nth-child(7)').text();
    // const area = $('.container > div:nth-child(1) .myui-content__detail > a:nth-child(10)').text();
    const year = $('.container > div:nth-child(1) .myui-content__detail > a:nth-child(13)').text();
    const actors = $('.container > div:nth-child(1) .myui-content__detail :nth-child(15)').text();
    const director = $('.container > div:nth-child(1) .myui-content__detail p:nth-child(16)').text();
    const description = $('#desc > div > div.myui-panel_bd > div > span').text();
    const playUrl = $('.container > div:nth-child(1) > div > .myui-content__operate > a').attr('href');
    return {
      name,
      picture,
      rate,
      type,
      area: '泰国',
      year,
      actors,
      director,
      playUrl,
      description
    }  
  } catch (error) {
    console.log(error);
  }
}
superagent
  .get(host + url)
  .end(async (error, response) => {
    if (error) throw new Error(error);
    //获取页面文档数据
    var content = response.text;
    //cheerio也就是nodejs下的jQuery  将整个文档包装成一个集合，定义一个变量$接收
    var $ = cheerio.load(content);
    //定义一个空数组，用来接收数据
    var result = [];
    //分析文档结构  先获取每个li 再遍历里面的内容(此时每个li里面就存放着我们想要获取的数据)
    const thumbList = $(".myui-vodlist__box .myui-vodlist__thumb");
    for (let i=0; i < thumbList.length; i++) {
      // if (i == 5) break;
      const childrenUrl = $(thumbList[i]).attr('href');
      const movie = await getChildrenInfo(childrenUrl);
      result.push(movie);
      console.log(Number(result.length/36*100).toFixed(2) + '%');
    }
    // $(".myui-vodlist__box .myui-vodlist__thumb").each(async (index, value) => {
    //   const childrenUrl = $(value).attr('href');
    //   const movie = await getChildrenInfo(childrenUrl);
    //   result.push(movie);
    // });
    //将数组转换成字符串
    result = JSON.stringify(result);
    fs.writeFile("boss.json", result, "utf-8", (error) => {
      //监听错误，如正常输出，则打印null
      if (error == null) {
        console.log("恭喜您，数据爬取成功!请打开json文件，先Ctrl+A，再Ctrl+K,最后Ctrl+F格式化后查看json文件(仅限Visual Studio Code编辑器)");
      }
    });
  });