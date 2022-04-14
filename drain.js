// 将数据写入提供的可写流一百万次。
// 注意背压。
const fs = require('fs')
const writer = fs.createWriteStream('./big_file.txt')
function writeOneMillionTimes(writer, data) {
  let i = 1000000;
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // 最后一次！
        writer.write(data);
      } else {
        // 看看是应该继续，还是等待。
        // 不要传入回调，因为还没有完成。
        ok = writer.write(data);
        if(ok === false){
          console.log("不能再写了")
        }
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // 必须早点停下来！
      // 等它排空时再写一些。
      writer.once('drain', ()=>{
        console.log("来点水")
        write()
      });
    }
  }
  write();
}
writeOneMillionTimes(writer,'hello world')