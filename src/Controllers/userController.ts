
import * as userServices from '../services/usersServices'
import { Request, Response } from 'express'
import toNewUserEntry from '../services/userUtils'
import { decodeToken } from '../utils/jwt.utils'

export async function register (req: Request, res: Response): Promise<void> {
  try {
    const parsedUserEntry = await toNewUserEntry(req.body)
    console.log('New User to register')
    console.log(parsedUserEntry)

    userServices.register(parsedUserEntry).then((user) => {
      console.log('Result from added new entry: ')
      console.log(user)
      return (user != null) ? res.send(user) : res.sendStatus(201)
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export async function login (req: Request, res: Response): Promise<void> {
  try {
    if (req.body.email !== undefined && req.body.password !== undefined) {
      userServices.login(req.body.email, req.body.password).then((token) => {
        return (token != null) ? res.send({ token }) : res.sendStatus(401)
      }).catch((e: any) => {
        console.log(e)
        throw new Error(e)
      })
    } else {
      res.status(401).send({ error: 'Invalid Credentials' })
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export async function me (req: Request, res: Response): Promise<void> {
  try {
    let token: string = req.headers.authorization as string
    if (token.toLowerCase().startsWith('bearer')) {
      token = token.slice('bearer'.length).trim()
    }

    const decodedToken = decodeToken(token)
    if (typeof decodedToken.userId !== 'number') {
      userServices.findById(decodedToken.userId).then((user) => {
        console.log('Result from added new entry: ')
        console.log(user)
        return (user != null) ? res.send(user) : res.sendStatus(201)
      }).catch((e: any) => {
        console.log(e)
        throw new Error(e)
      })
    } else {
      res.status(500).send()
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
