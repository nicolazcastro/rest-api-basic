import dotenv from 'dotenv'
import { connect, model } from 'mongoose'
import * as DiaryModel from '../models/diary'
import * as UserModel from '../models/user'

dotenv.config()
const DB_URL: string = process.env.DB_URL as string
const DB_NAME: string = process.env.DB_NAME as string

export async function connectDb (): Promise<void> {
  await connect(DB_URL + '/' + DB_NAME)
}

export function getUserModel (): any {
  return model<UserModel.IUser>('users', UserModel.UserSchema)
}

export function getDiaryModel (): any {
  return model<DiaryModel.IDiaryEntry>('diaries', DiaryModel.DiarySchema)
}
