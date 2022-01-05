const {Writable, Readable, Transform, pipeline} = require('stream')



const readableStream = Readable({
  read: function() {


  }

})


const writableStream = Writable({
  write: function(chunk, encoding, next){


  }


})

const transformStream = Transform({
  transform(chunk, enconding, next){


  }

})