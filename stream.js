const { createWriteStream, createReadStream } = require('fs')
const {Writable, Readable, Transform, pipeline, Duplex} = require('stream')
const { promisify } = require('util')

const asyncPipeline = promisify(pipeline)



const readableStream = Readable({
  read: function() {
    for( let i = 0; i < 10000; i++) {
      const Product = `barcode: ${Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000}, name: product-${i}\n`
      const product = { barcode: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000, name: `product-${i}`}
      this.push(Product)
    }
    this.push(null)
  }

})

const header = Transform({
  transform(chunk, enconding, callback){
    this.counter = this.counter ?? 0;

    if (this.counter) {
        return callback(null, chunk)
    }

    this.counter += 1;
    callback(null, "barcode,name\n".concat(chunk))
  }
})


const readCSV = Transform({
  transform: function(chunk, encoding, callback){
    const data = chunk.toString()
    const arr = data.split('\n')
    arr.shift(0)

    callback(null,arr.toString())
  }
})

/* const toJSON = Transform({
  transform: function(chunk)
})
 */

/* asyncPipeline(
  readableStream,
  header,
  createWriteStream('products.csv'),  
) */

asyncPipeline(
  createReadStream('products.csv'),
  readCSV,
)