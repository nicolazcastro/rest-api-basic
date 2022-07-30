import { DiarySchema, IDiaryEntry, INonSensitiveInfoDiaryEntry } from '../models/diary'
import { DiaryEntry, NonSensitiveInfoDiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'
import dotenv from 'dotenv'
import { connect, model } from 'mongoose'

const diaries: DiaryEntry[] = diaryData as DiaryEntry[]

export const getEntries = (): DiaryEntry[] => diaries

export async function findById (id: string): Promise<DiaryEntry | any> {
  dotenv.config()
  const DB_URL: string = process.env.DB_URL as string
  const DB_NAME: string = process.env.DB_NAME as string

  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    const Diary = model<IDiaryEntry>('diaries', DiarySchema)

    return await Diary.findById(id).then((entry: INonSensitiveInfoDiaryEntry | null) => {
      console.log('Result from DB: ')
      console.log(entry)
      if (entry == null) {
        return entry
      } else {
        const obj: Partial<INonSensitiveInfoDiaryEntry> = {
          id: entry._id,
          date: entry.date,
          weather: entry.weather,
          visibility: entry.visibility
        }
        return obj
      }
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

export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility
    }
  })
}

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }

  diaries.push(newDiary)
  return newDiary
}
