const {Readable} = require('stream')
const inStream = new Readable({
  read(size){
    //将一个 code 变成一个 char
    const char = String.fromCharCode(this.currentCharCode++)
    this.push(char)
    console.log(`推了 ${char}`)
    if(this.currentCharCode > 90){  //90 是 Z
      this.push(null)
    }
  }
})

inStream.currentCharCode = 65  //65 对应 A
inStream.pipe(process.stdout)  //stdout 会调用 read()