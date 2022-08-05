import { Schema, Document } from 'mongoose'

export interface IUser extends Document{
  id: string
  name: string
  email: string
  enabled: boolean
  profile: string
  password: string
  userId: number
}

export const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  enabled: { type: Boolean, required: true },
  profile: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Number, required: true },
  id: { type: Schema.Types.ObjectId, ref: 'id' }
})

export interface INewUserEntry extends Omit<IUser, 'id'>{}
export type NewUserEntry = Omit<IUser, 'id'>