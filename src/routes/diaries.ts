import express from 'express'
import * as diaryServices from '../services/diariesServices'
import toNewDiaryEntry from '../services/utils'
import * as Auth from './../middlewares/auth.middleware'

const router = express.Router()

router.route('/').get(Auth.authorize(['getEntries']), (_req, res) => {
  diaryServices.getEntries().then((diaries) => {
    console.log('Result from service: ')
    console.log(diaries)
    return (diaries != null) ? res.send(diaries) : res.sendStatus(404)
  }).catch((e: any) => {
    console.log(e)
    throw new Error(e)
  })
})

router.route('/:id').get(Auth.authorize(['findByIdWithoutSensitiveInfo']), (req, res) => {
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

router.route('/full/:id').get(Auth.authorize(['findById']), (req, res) => {
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

router.route('/').post(Auth.authorize(['addDiary']), (req, res) => {
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

router.route('/:id').patch(Auth.authorize(['updateDiary']), (req, res) => {
  try {
    const parsedDiaryEntry = toNewDiaryEntry(req.body)
    console.log(parsedDiaryEntry)

    diaryServices.updateDiary(req.params.id, parsedDiaryEntry).then((diary) => {
      console.log('Result from added new entry: ')
      console.log(diary)
      return (diary != null) ? res.send(diary) : res.sendStatus(200)
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

router.route('/:id').delete(Auth.authorize(['deleteDiary']), (req, res) => {
  try {
    diaryServices.deleteDiary(req.params.id).then((diary) => {
      console.log('Result from deleted entry: ')
      console.log(diary)
      if (diary != null) {
        res.status(200).send(diary)
      } else {
        res.sendStatus(404)
      }
    }).catch((e: any) => {
      console.log(e)
      throw new Error(e)
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
})

export default router
