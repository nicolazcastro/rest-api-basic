import { Schema, model, connect } from 'mongoose'
import dotenv from 'dotenv'

export async function connectToDatabase () {
  try {
    console.log('333')

    dotenv.config()
    const DB_URL: string = process.env.DB_URL as string
    console.log(DB_URL)

    console.log('444')
    await connect(DB_URL)

    const db: mongoDB.Db = client.db(process.env.DB_NAME)

    console.log(`Successfully connected to database: ${db.databaseName}`)
    return client
  } catch (e: any) {
    console.log(e)
    throw new Error(e)
  }
}

export { mongoDB, ObjectId }
