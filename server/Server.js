import express from 'express'
import cors from 'cors'
import connectToDB from './dbConnection.js'
import clientRouter from './routes/clientRouterjs'

await connectToDB()

const server = express()
server.use(clientRouter)

server.use (cors())

server.get('/', (req, res) => {
    res.send('Server is running!')
})
server.post('/api/data', (req, res) => {
    res.send('Post request received!')
})
server.put('/api/submit', (req, res) => {
    res.send('Put request received!')
}
)
server.listen(3000, () => {
    console.log('Server is running on port 3000')
})