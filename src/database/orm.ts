import jsonfile from 'jsonfile'
import { AllTefilot } from '../models/Tefilot'
import { Options } from 'kosher-zmanim'

// import { IUser } from '@src/models/User'

// **** Variables **** //

const DB_FILE_NAME = 'database.json'

// **** Types **** //

interface DB {
  city?: Options
  tefilot?: AllTefilot
}

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<DB> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<DB>
}

/**
 * Update the file.
 */
function saveDb(db: DB): Promise<void> {
  return jsonfile.writeFile(__dirname + '/' + DB_FILE_NAME, db)
}

export const orm = {
  saveDb: saveDb,
  openDb: openDb,
}

// async function getDB() {
//   const db = await orm.openDb()
//   console.log('db: ', db)
//   return db
// }
// console.log('db: ', getDB())
