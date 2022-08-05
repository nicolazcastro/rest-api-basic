import { UserSchema, IUser, INewUserEntry } from '../models/user'
import dotenv from 'dotenv'
import { connect, model } from 'mongoose'

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

    console.log('New User: ')
    console.log(newUserEntry)

    return await newUserEntry.save().then(() => {
      return newUserEntry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  })
}
