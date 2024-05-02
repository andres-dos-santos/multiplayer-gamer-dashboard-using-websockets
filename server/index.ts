import { createServer } from 'http'
import { Server } from 'socket.io'

interface Score { name: string, value: number, id: string }

const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
})

let playerScores: Score[] = []

io.on('connection', (socket) => {
  socket.on('scores', (score) => {
    playerScores.push({ name: score.name, value: +score.score, id: socket.id })
    
    socket.emit('playerScores', playerScores)
  })

  setInterval(() => {
    socket.emit('playerScores', playerScores)
  }, 5000)
})

httpServer.listen(3000, () => {
  console.log('Server is running on port 3000', )
})