import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'

const keyFile = './../../private.key'

export function generateToken (): any {
  const payload = {
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

  const privateKey = {
    key: fs.readFileSync(path.join(__dirname, keyFile), 'utf8'),
    passphrase: 'suhcyhvcahya'
  }

  const signInOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '1h'
  }

  return sign(payload, privateKey, signInOptions)
}

interface TokenPayload {
  exp: number
  accessTypes: string[]
  name: string
  userId: number
}

export async function validateToken (token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, keyFile))

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256']
  }

  return await new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error: any, decoded: any) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (error) return reject(error)

      resolve(decoded)
    })
  })
}
