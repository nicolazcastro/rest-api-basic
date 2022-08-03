import express from 'express'
import diaryRouter from './routes/diaries'
import { generateToken } from './utils/jwt.utils'
import { TokenPayload } from './types/types'

const app = express()
app.use(express.json())

const PORT = 3000

/*
This is for testing purposes
*/
if (process.env.NODE_ENV !== 'production') {
  const payload: TokenPayload = {
    name: 'John Doe',
    userId: 123,
    accessTypes: [
      'getEntries',
      'findByIdWithoutSensitiveInfo',
      'findById',
      'addDiary',
      'updateDiary',
      'deleteDiary'
    ]
  }
  console.log('JWT', generateToken(payload))
}

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!  ')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server is runing in port ${PORT}`)
})
