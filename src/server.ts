import express, { Express } from 'express'
import { codeBlockRoutes } from '../api/codeBlock/codeBlock.routes'
import dotenv from 'dotenv'
import http from 'http'
import cors, { CorsOptions } from 'cors'
import path from 'path'
import { setupSocketAPI } from './services/socket.service'

dotenv.config()

const app: Express = express()
const corsOptions: CorsOptions = {
  origin: [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5173',
  ],
  credentials: true,
}
const server = http.createServer(app)
const port = process.env.PORT || 3030

app.use(express.json())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('public')))
} else {
  app.use(cors(corsOptions))
}

app.use('/api/codeBlock', codeBlockRoutes)
setupSocketAPI(server)

app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'))
})

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
