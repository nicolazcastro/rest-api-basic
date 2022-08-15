import { Seeder } from 'mongo-seeding'
import * as diaryServices from '../services/diaries/diariesServices'
import path from 'path'

const config = {
  database: {
    name: 'diarydb'
  },
  dropDatabase: true
}
const seeder = new Seeder(config)

const collectionReadingOptions = {
  extensions: ['ts', 'js', 'cjs', 'json'],
  ejsonParseOptions: {
    relaxed: false
  },
  transformers: [
    Seeder.Transformers.replaceDocumentIdWithUnderscoreId
  ]
}

const collections = seeder.readCollectionsFromPath(path.resolve('./src/seed/data'), collectionReadingOptions)

seeder
  .import(collections)
  .then(async () => {
    console.log('Seed OK')

    const diaries = await diaryServices.getEntries()

    console.log('Qtty of diaries service: ', diaries.length)

    for (const diary of diaries) {
      console.log('Result from diaries service: ', diary)

      await diaryServices.setDiaryUser(diary)
    }
  })
  .catch(err => {
    console.log(err)
  })
