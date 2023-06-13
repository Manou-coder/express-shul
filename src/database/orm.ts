import jsonfile from 'jsonfile'
import { AllTefilot } from '../models/Tefilot'
import { Options } from 'kosher-zmanim'

// important for typescipt compiling
import './database.json'
// ---------------------------------

const DATABASE_ENV = process.cwd() + '/src/database'
console.log('DATABASE_ENV: ', DATABASE_ENV)
console.log('__dirname: ', __dirname)

// **** Variables **** //

const DB_FILE_NAME = 'database.json'
console.log('hello', DATABASE_ENV + '/' + DB_FILE_NAME)

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
  jsonfile.writeFile(DATABASE_ENV + '/' + DB_FILE_NAME, db)
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
