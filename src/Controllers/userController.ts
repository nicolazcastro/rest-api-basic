
import * as userServices from '../services/usersServices'
import { Request, Response } from 'express'
import toNewUserEntry from '../services/userUtils'

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
