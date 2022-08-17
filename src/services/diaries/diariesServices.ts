import { IDiaryEntry, INewDiaryEntry, INonSensitiveInfoDiaryEntry, IParsedDiaryEntry, DiaryUser } from '../../models/diary'
import * as userServices from '../users/usersServices'
import * as db from '../../db/db'

const Diary = db.getDiaryModel()

export async function getEntries (): Promise<IDiaryEntry[] | any> {
  await db.connectDb()

  return Diary.find().then((entries: INonSensitiveInfoDiaryEntry[] | null) => {
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

export async function findByIdWithoutSensitiveInfo (id: string): Promise<IDiaryEntry | any> {
  await db.connectDb()
  return Diary.findById(id).then((entry: INonSensitiveInfoDiaryEntry | null) => {
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
}

export async function findById (id: string): Promise<IDiaryEntry | any> {
  await db.connectDb()
  return Diary.findById(id).then((entry: INonSensitiveInfoDiaryEntry | null) => {
    console.log('Result from DB: ')
    console.log(entry)

    return entry
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function addDiary (parsedDiaryEntry: IParsedDiaryEntry): Promise<IDiaryEntry | any> {
  await db.connectDb()
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
}

export async function updateDiary (id: string, parsedDiaryEntry: INewDiaryEntry): Promise<IDiaryEntry | any> {
  await db.connectDb()
  const updatedDiaryEntry = {
    date: parsedDiaryEntry.date,
    weather: parsedDiaryEntry.weather,
    visibility: parsedDiaryEntry.visibility,
    comment: parsedDiaryEntry.comment
  }

  const filter = { _id: id }

  console.log('Updated Diary Entry: ')
  console.log(updatedDiaryEntry)

  return Diary.findByIdAndUpdate(filter, updatedDiaryEntry).then(() => {
    return updatedDiaryEntry
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
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

    await db.connectDb()
    console.log('about to update:', diary.id)
    await Diary.findByIdAndUpdate(diary.id, { user: diaryUser })
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}

export async function deleteDiary (id: string): Promise<IDiaryEntry | any> {
  await db.connectDb()
  const filter = { _id: id }

  return Diary.findByIdAndDelete(filter).then((deletedEntry: any) => {
    return deletedEntry
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
}
