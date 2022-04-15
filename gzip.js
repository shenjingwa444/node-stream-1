const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
const {Transform} = require('stream')

const reportProcess = new Transform({
  transform(chunk,encoding,callback){
    process.stdout.write('.')
    //this.push(chunk) 相当于在 callback 中写第二个参数
    callback(null,chunk)
  }
})

fs.createReadStream(file)
  .pipe(zlib.createGzip())
  //每次来数据，就打一个 '.' ，然后将数据原封不动的传给下一个
  //这样可以对数据进行无限的处理，很像 webpack 的 loader
  .pipe(reportProcess)
  .pipe(fs.createWriteStream(file + ".zz"))
  .on('finish',()=>console.log('done'))