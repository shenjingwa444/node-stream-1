const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
fs.createReadStream(file)
  .pipe(zlib.createGzip())
  //每次有数据就添加一个 '.' ，以此来监听数据的传输次数
  .on('data',()=>process.stdout.write('.'))
  .pipe(fs.createWriteStream(file + ".gz"))
  .on('finish',()=>console.log('done'))