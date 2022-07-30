import { DiarySchema, IDiaryEntry, INonSensitiveInfoDiaryEntry } from '../models/diary'
import { DiaryEntry, NewDiaryEntry } from '../types'
import diaryData from './diaries.json'
import dotenv from 'dotenv'
import { connect, model } from 'mongoose'

dotenv.config()
const DB_URL: string = process.env.DB_URL as string
const DB_NAME: string = process.env.DB_NAME as string
const diaries: DiaryEntry[] = diaryData as DiaryEntry[]
const Diary = model<IDiaryEntry>('diaries', DiarySchema)

export async function getEntries (): Promise<DiaryEntry[] | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await Diary.find().then((entries: INonSensitiveInfoDiaryEntry[] | null) => {
      console.log('Result from DB: ')
      console.log(entries)
      if (entries == null) {
        return entries
      } else {
        const objs: any[] = []
        entries.forEach(element => {
          const obj: Partial<INonSensitiveInfoDiaryEntry> = {
            id: element._id,
            date: element.date,
            weather: element.weather,
            visibility: element.visibility
          }
          objs.push(obj)
        })

        return objs
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

export async function findByIdWithoutSensitiveInfo (id: string): Promise<DiaryEntry | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
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

export async function findById (id: string): Promise<DiaryEntry | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await Diary.findById(id).then((entry: INonSensitiveInfoDiaryEntry | null) => {
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

export const addDiary = (newDiaryEntry: NewDiaryEntry): DiaryEntry => {
  const newDiary = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...newDiaryEntry
  }

  diaries.push(newDiary)
  return newDiary
}
