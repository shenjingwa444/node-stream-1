const {Transform} = require('stream')
const upperCaseTr = new Transform({
  transform(chunk,encoding,callback){
    //将输入数据转换为大写
    this.push(chunk.toString().toUpperCase());
    callback()
  }
})

process.stdin.pipe(upperCaseTr).pipe(process.stdout)