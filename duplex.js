const {Duplex} = require('stream')
const inoutStream = new Duplex({
  write(chunk,encoding,callback){
    console.log(chunk.toString())
    callback()
  },
  read(){
    const char = String.fromCharCode(this.currentCharCode++)
    this.push(char)
    if(this.currentCharCode > 90){
      this.push(null)
    }
  }
})

inoutStream.currentCharCode = 65
process.stdin.pipe(inoutStream).pipe(process.stdout)