import { DiarySchema, IDiaryEntry, INewDiaryEntry, INonSensitiveInfoDiaryEntry } from '../models/diary'
import dotenv from 'dotenv'
import { connect, model } from 'mongoose'

dotenv.config()
const DB_URL: string = process.env.DB_URL as string
const DB_NAME: string = process.env.DB_NAME as string
const Diary = model<IDiaryEntry>('diaries', DiarySchema)

export async function getEntries (): Promise<IDiaryEntry[] | any> {
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

export async function findByIdWithoutSensitiveInfo (id: string): Promise<IDiaryEntry | any> {
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

export async function findById (id: string): Promise<IDiaryEntry | any> {
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

export async function addDiary (parsedDiaryEntry: INewDiaryEntry): Promise<IDiaryEntry | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    const newDiaryEntry: INewDiaryEntry = new Diary({
      date: parsedDiaryEntry.date,
      weather: parsedDiaryEntry.weather,
      visibility: parsedDiaryEntry.visibility,
      comment: parsedDiaryEntry.comment
    })

    console.log('newDiaryEntry: ')
    console.log(newDiaryEntry)

    return await newDiaryEntry.save().then(() => {
      return newDiaryEntry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  })
}
