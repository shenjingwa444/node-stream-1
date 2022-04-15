const {Readable} = require('stream')
const inStream = new Readable()
inStream.push("abcdefjhijklm")
inStream.push('nopqrstuvwxyz')
inStream.push(null)
//pipe 默认监听 data 事件
//inStream.pipe(process.stdout)
inStream.on('data',(chunk)=>{
  process.stdout.write(chunk)
  console.log("写数据了")
})
