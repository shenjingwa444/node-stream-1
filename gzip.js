const fs = require('fs')
const zlib = require('zlib')
const file = process.argv[2]
const {Transform} = require('stream')
const crypto = require('crypto')
const reportProcess = new Transform({
  transform(chunk,encoding,callback){
    process.stdout.write('.')
    //this.push(chunk) 相当于在 callback 中写第二个参数
    callback(null,chunk)
  }
})

fs.createReadStream(file)
  //加密方式为 aes192，秘钥为 123456
  //先加密，再压缩
  .pipe(crypto.createCipher('aes192','123456'))
  .pipe(zlib.createGzip())
  .pipe(reportProcess)
  .pipe(fs.createWriteStream(file + ".zz"))
  .on('finish',()=>console.log('done'))