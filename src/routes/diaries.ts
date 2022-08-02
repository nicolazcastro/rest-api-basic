import express from 'express'
import * as diaryServices from '../services/diariesServices'
import toNewDiaryEntry from '../services/utils'

const router = express.Router()

router.get('/', (_req, res) => {
  diaryServices.getEntries().then((diaries) => {
    console.log('Result from service: ')
    console.log(diaries)
    return (diaries != null) ? res.send(diaries) : res.sendStatus(404)
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
})

router.get('/:id', (req, res) => {
  console.log(req.params.id)
  diaryServices.findByIdWithoutSensitiveInfo(req.params.id).then((diary) => {
    console.log('Result from service: ')
    console.log(diary)
    return (diary != null) ? res.send(diary) : res.sendStatus(404)
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
})

router.get('/full/:id', (req, res) => {
  console.log(req.params.id)
  diaryServices.findById(req.params.id).then((diary) => {
    console.log('Result from service: ')
    console.log(diary)
    return (diary != null) ? res.send(diary) : res.sendStatus(404)
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
})

router.post('/', (req, res) => {
  try {
    const parsedDiaryEntry = toNewDiaryEntry(req.body)
    console.log(parsedDiaryEntry)

    diaryServices.addDiary(parsedDiaryEntry).then((diary) => {
      console.log('Result from added new entry: ')
      console.log(diary)
      return (diary != null) ? res.send(diary) : res.sendStatus(201)
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
