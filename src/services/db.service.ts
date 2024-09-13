import { MongoClient, Db, Collection } from 'mongodb'
import { config } from '../../config/index'

interface DbService {
  getCollection: (collectionName: string) => Promise<Collection>
}

export const dbService: DbService = {
  getCollection,
}

let dbConn: Db | null = null

async function getCollection(collectionName: string): Promise<Collection> {
  try {
    const db = await _connect()
    const collection = db.collection(collectionName)
    return collection
  } catch (err) {
    throw err
  }
}

async function _connect(): Promise<Db> {
  if (dbConn) return dbConn
  try {
    const client = await MongoClient.connect(config.dbURL)
    const db = client.db(config.dbName)
    dbConn = db
    return db
  } catch (err) {
    throw err
  }
}
