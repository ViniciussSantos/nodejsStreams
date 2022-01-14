const { createWriteStream, createReadStream } = require('fs')
const {Writable, Readable, Transform, pipeline, Duplex} = require('stream')
const csvToJson = require('./csvToJson.js');
const { promisify } = require('util')


const toObject = csvToJson.toObject()
const stringify = csvToJson.stringify()

const asyncPipeline = promisify(pipeline)


const readableStream = Readable({
  read: function() {
    for( let i = 0; i < 10; i++) {
      const Product = `barcode: ${Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000}, name: product-${i}\n`
      const product = { barcode: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000, name: `product-${i}`}
      this.push(JSON.stringify(product))
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

const mapToCSV= Transform({
  transform(chunk, enconding, callback){

    const data = JSON.parse(chunk)

    const product = `${data.barcode},${data.name}\n`
    callback(null, product)
    
  }


})


asyncPipeline(
  readableStream,
  mapToCSV, 
  header,
  createWriteStream('products.csv'),  
)

asyncPipeline(
  createReadStream('products.csv', 'utf-8'),
  toObject,
  stringify,
  createWriteStream('arroz.json')
)

console.log('funcionou')