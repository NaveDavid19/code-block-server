import { Server, Socket } from 'socket.io'
import http from 'http'

let io: Server | null = null

export function setupSocketAPI(server: http.Server): void {
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  })

  io.on('connection', (socket: Socket) => {
    console.log('Socket connected')

    socket.on('disconnect', () => {
      console.log(`Socket disconnected [id: ${socket.id}]`)
    })

    socket.on('student-join', ({ msg, data }: { msg: string; data: any }) => {
      console.log('msg:', msg)
      io?.emit('increase-watchers', data)
    })

    socket.on('student-left', ({ msg, data }: { msg: string; data: any }) => {
      console.log('msg:', msg)
      io?.emit('decrease-watchers', data)
    })

    socket.on('mentor-join', ({ msg, data }: { msg: string; data: any }) => {
      console.log(`SOCKET-`, msg)
      io?.emit('mentor-join', data)
    })

    socket.on('mentor-left', ({ msg, data }: { msg: string; data: any }) => {
      console.log(`SOCKET-`, msg)
      io?.emit('mentor-left')
    })

    socket.on('code-changed', ({ msg, data }: { msg: string; data: any }) => {
      console.log('msg:', msg)
      io?.emit('code-changed', data)
    })
  })
}
