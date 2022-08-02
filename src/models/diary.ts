import { Schema, Document } from 'mongoose'
import { Visibility, Weather } from '../enums'

export interface IDiaryEntry extends Document{
  id: string
  date: string
  weather: Weather
  visibility: Visibility
  comment?: string
}

export const DiarySchema: Schema = new Schema({
  date: { type: String, required: true },
  weather: { type: String, required: true },
  visibility: { type: String, required: true },
  comment: { type: String, required: true },
  id: { type: Schema.Types.ObjectId, ref: 'id' }
})

export interface INonSensitiveInfoDiaryEntry extends Omit<IDiaryEntry, 'comment'>{}
export interface INewDiaryEntry extends Omit<IDiaryEntry, 'id'>{}
export type NewDiaryEntry = Omit<IDiaryEntry, 'id'>
