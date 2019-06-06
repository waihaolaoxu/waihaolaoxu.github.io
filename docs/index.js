/*
 * @Author: qdlaoxu
 * @Date:   2019-06-06 09:50:01
 * @Last Modified by:   qdlaoxu
 * @Last Modified time: 2019-06-06 15:32:44
 */
var fs = require('fs');
var join = require('path').join;
var writerStream = fs.createWriteStream('SUMMARY.md');
writerStream.write(`* [首页](README.md)\n\n`);

function getJsonFiles(jsonPath) {
  let jsonFiles = [];
  let group = {};
  function findJsonFile(path) {
    let files = fs.readdirSync(path);
    files.forEach(function (item, index) {
      let fPath = join(path, item);
      let stat = fs.statSync(fPath);
      if (stat.isDirectory() === true) {
        findJsonFile(fPath);
      }
      if (stat.isFile() === true && /md$/.test(item)) {
        fPath = fPath.replace(/\\/g,'/');
        if(fPath.indexOf("/") > 0){
          jsonFiles.push(fPath);
        }
      }
    });
  }
  findJsonFile(jsonPath);
  jsonFiles.map(dir => {
    let arr = dir.split('/');
    var data = fs.readFileSync(dir);
    let title = data.toString().split('\n')[0].replace('#','').trim();
    let groupName = arr[0];
    let fileName = title || arr[1].split('.')[0];
    if(group[groupName]){
      group[groupName].dirs.push({
        name:fileName,
        dir:dir
      })
    }else{
      group[groupName]={
        dirs:[{
          name:fileName,
          dir:dir
        }]
      }
    }
  });
  console.log(group);
  for(let x in group){
    writerStream.write(`* [${x}]() \n`);
    group[x].dirs.forEach(d=>{
      writerStream.write(` * [${d.name}](${d.dir}) \n`);
    })
  }
}

getJsonFiles("./");
