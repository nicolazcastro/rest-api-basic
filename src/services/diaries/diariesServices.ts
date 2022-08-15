import { DiarySchema, IDiaryEntry, INewDiaryEntry, INonSensitiveInfoDiaryEntry, IParsedDiaryEntry, DiaryUser } from '../../models/diary'
import dotenv from 'dotenv'
import { connect, model } from 'mongoose'
import * as userServices from '../users/usersServices'

dotenv.config()
const DB_URL: string = process.env.DB_URL as string
const DB_NAME: string = process.env.DB_NAME as string
const Diary = model<IDiaryEntry>('diaries', DiarySchema)

export async function getEntries (): Promise<IDiaryEntry[] | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    return await Diary.find().then((entries: INonSensitiveInfoDiaryEntry[] | null) => {
      // console.log('Result from DB: ')
      // console.log(entries)
      if (entries == null) {
        return entries
      } else {
        const objs: any[] = []
        entries.forEach(element => {
          const obj: Partial<INonSensitiveInfoDiaryEntry> = {
            id: element._id.valueOf(),
            date: element.date,
            weather: element.weather,
            user: element.user,
            userId: element.userId,
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
          id: entry._id.valueOf(),
          date: entry.date,
          weather: entry.weather,
          user: entry.user,
          visibility: entry.visibility
        }
        return obj
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

export async function addDiary (parsedDiaryEntry: IParsedDiaryEntry): Promise<IDiaryEntry | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    const user = await userServices.findByUserId(parsedDiaryEntry.userId)

    if (user === null) {
      throw new Error('User does not exist')
    }

    const newDiaryEntry: INewDiaryEntry = new Diary({
      date: parsedDiaryEntry.date,
      weather: parsedDiaryEntry.weather,
      visibility: parsedDiaryEntry.visibility,
      userId: parsedDiaryEntry.userId,
      user: user._Id,
      comment: parsedDiaryEntry.comment
    })

    console.log('New Diary Entry: ')
    console.log(newDiaryEntry)

    return await newDiaryEntry.save().then(() => {
      return newDiaryEntry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  })
}

export async function updateDiary (id: string, parsedDiaryEntry: INewDiaryEntry): Promise<IDiaryEntry | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    const updatedDiaryEntry = {
      date: parsedDiaryEntry.date,
      weather: parsedDiaryEntry.weather,
      visibility: parsedDiaryEntry.visibility,
      comment: parsedDiaryEntry.comment
    }

    const filter = { _id: id }

    console.log('Updated Diary Entry: ')
    console.log(updatedDiaryEntry)

    return await Diary.findByIdAndUpdate(filter, updatedDiaryEntry).then(() => {
      return updatedDiaryEntry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  })
}

export async function setDiaryUser (diary: IDiaryEntry): Promise<void> {
  await userServices.findByUserId(diary.userId).then(async (user) => {
    console.log('Result from user service: ', user.userId)

    const diaryUser: DiaryUser = {
      type: user._id,
      ref: 'IUser'
    }

    console.log('diaryUser', diaryUser.type, typeof diaryUser.type)

    await connect(DB_URL + '/' + DB_NAME).then(async () => {
      console.log('about to update:', diary.id)
      await Diary.findByIdAndUpdate(diary.id, { user: diaryUser })
    })
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function deleteDiary (id: string): Promise<IDiaryEntry | any> {
  return await connect(DB_URL + '/' + DB_NAME).then(async () => {
    const filter = { _id: id }

    return await Diary.findByIdAndDelete(filter).then((deletedEntry) => {
      return deletedEntry
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  })
}
