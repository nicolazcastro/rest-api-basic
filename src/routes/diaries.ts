import express from 'express'
import * as diaryServices from '../services/diariesServices'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
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
    const newDiaryEntry = toNewDiaryEntry(req.body)

    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
