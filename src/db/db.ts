import dotenv from 'dotenv'
import { connect, model, disconnect, Types, connection } from 'mongoose'
import * as DiaryModel from '../models/diary'
import * as UserModel from '../models/user'

dotenv.config()
const DB_URL: string = process.env.DB_URL as string
const DB_NAME: string = process.env.DB_NAME as string

export async function connectDb (): Promise<void> {
  await connect(DB_URL + '/' + DB_NAME)
}

export async function disconnectDb (): Promise<void> {
  await disconnect()
}

export function getUserModel (): any {
  return model<UserModel.IUser>('users', UserModel.UserSchema)
}

export function getDiaryModel (): any {
  return model<DiaryModel.IDiaryEntry>('diaries', DiaryModel.DiarySchema)
}

export function getNewObjectId (): any {
  return new Types.ObjectId()
}

export async function collectionExist (collName: string): Promise<boolean> {
  await connectDb()
  connection.db.listCollections({ name: collName })
    .next(function (_err, collinfo) {
      if (collinfo != null) {
        return true
      }
      return false
    })
  return false
}
