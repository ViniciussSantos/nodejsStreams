const stream = require('stream')

const readableSrc = new stream.Readable

readableSrc.on('data', (data) => console.log('recebi um chunk ', data))
readableSrc.on('error', (err)=> console.log('deu ruim! ', err))
readableSrc.on('close',()=> console.log('fechou'))

readableSrc.push('arroz1')
readableSrc.push('arroz2')
readableSrc.push('arroz3')
readableSrc.emit('error', 'err')
readableSrc.push(null)

