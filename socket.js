net = require('net')

// node -e "process.stdin.pipe(require('net').connect(3000))"
net.createServer(socket => socket.pipe(process.stdout)).listen(3000)

