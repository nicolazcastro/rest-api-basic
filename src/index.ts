import express from 'express'
import diaryRouter from './routes/diaries'
import userRouter from './routes/users'
import { generateToken } from './utils/jwt.utils'
import { TokenPayload } from './types/types'
import { AccessTypes } from './models/enums'

const app = express()
app.use(express.json())

const PORT = 3000

/*
This is for testing purposes
*/
if (process.env.NODE_ENV !== 'production') {
  const userTypes = Object.values(AccessTypes) as any[]
  const payload: TokenPayload = {
    name: 'John Doe',
    userId: 1,
    accessTypes: userTypes
  }
  console.log('JWT Token: ', generateToken(payload))
}

app.get('/ping', (_req, res) => {
  console.log('someone pinged here!!  ')
  res.send('pong')
})

app.use('/api/v1/diaries', diaryRouter)
app.use('/api/v1/user', userRouter)

app.listen(PORT, () => {
  console.log(`Server is runing in port ${PORT}`)
})
