const fs = require('fs');
const http = require('http') 

http.createServer((req, res) => {  

  fs.createReadStream("testfile")
  .pipe(res) 

}).listen(3000, () => console.log('running at 3000'))