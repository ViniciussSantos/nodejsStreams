const fs = require('fs');
const http = require('http') 

http.createServer((req, res) => {  

/*   const file = fs.readFileSync("big.file")
  res.write(file)
  res.end() */


  fs.createReadStream("test.mp4")
  .pipe(res) 

}).listen(3000, () => console.log('running at 3000'))