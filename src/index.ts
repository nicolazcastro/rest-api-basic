import express from 'express'
import diaryRouter from './routes/diaries'
import { generateToken } from './utils/jwt.utils'

const app = express()
app.use(express.json())

const PORT = 3000

if (process.env.NODE_ENV !== 'production') {
  console.log('JWT', generateToken())
}

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!  ')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server is runing in port ${PORT}`)
})
