import { UserSchema, IUser, INewUserEntry } from '../models/user'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { connect, model } from 'mongoose'
import { TokenPayload } from '../types/types'
import { generateToken } from '../utils/jwt.utils'
import { AccessTypes, AdminAccessTypes } from '../models/enums'

dotenv.config()
const DB_URL: string = process.env.DB_URL as string
const DB_NAME: string = process.env.DB_NAME as string
const User = model<IUser>('users', UserSchema)

export const getNextUserId = async (): Promise<number | any> => {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await User.findOne().sort({ userId: -1 }).limit(1).then((entry: IUser | null) => {
      console.log('Result next Id from DB: ')
      console.log(entry)
      if (entry == null) {
        return 1
      } else {
        const obj: Partial<IUser> = {
          userId: entry.userId + 1
        }
        return obj.userId
      }
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function login (email: string, password: string): Promise<string | null> {
  try {
    if ((email.length > 0) && (password.length > 0)) {
      return await connect(DB_URL + '/' + DB_NAME).then(async () => {
        console.log('Conection ok')
        return await User.findOne({ email }).then(async (user: IUser | null) => {
          if (user == null) {
            return null
          }

          const passMatch = await bcrypt.compare(password, user.password)

          if ((user != null) && passMatch) {
            let accessTypes: string[] = []

            const userTypes = Object.values(AccessTypes) as any[]
            const adminUserTypes = Object.values(AdminAccessTypes) as any[]

            if (user.profile === 'admin') {
              accessTypes = adminUserTypes
            } else {
              accessTypes = userTypes
            }

            const payload: TokenPayload = {
              name: user.name,
              userId: user.userId,
              accessTypes
            }

            return generateToken(payload)
          } else {
            console.log('password invalid for: ' + email)
            return null
          }
        }).catch((e: any) => {
          console.log('user not found', e)
          throw new Error(e)
        })
      }).catch((e: any) => {
        console.log(e)
        throw new Error(e)
      })
    } else {
      console.log('Invalid Data')
      return null
    }
  } catch (e: any) {
    console.log('error')
    console.log(e.message)
    return null
  }
}

export async function findByEmail (email: string): Promise<IUser | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await User.findOne({ email: email }).then((entry: IUser | null) => {
      console.log('Result from DB: ')
      console.log(entry)

      return entry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function findMeByUserId (userId: string): Promise<IUser | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await User.findOne({ userId }).then((entry: IUser | null) => {
      const obj: Partial<IUser> = {
        userId: entry?.userId,
        name: entry?.name,
        email: entry?.email,
        profile: entry?.profile
      }
      return obj
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  }

  ).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function findById (id: string): Promise<IUser | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await User.findById(id).then((entry: IUser | null) => {
      console.log('Result from DB: ')
      console.log(entry)

      return entry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  }

  ).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function register (parsedUserEntry: INewUserEntry): Promise<IUser | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    const newUserEntry: INewUserEntry = new User({
      name: parsedUserEntry.name,
      email: parsedUserEntry.email,
      userId: parsedUserEntry.userId,
      enabled: true,
      password: parsedUserEntry.password,
      profile: parsedUserEntry.profile
    })
    return await newUserEntry.save().then(() => {
      console.log('user saved')
      return newUserEntry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  })
}
