import jsonfile from 'jsonfile'

// import { IUser } from '@src/models/User'

// **** Variables **** //

const DB_FILE_NAME = 'database.json'

// **** Types **** //

// interface IDb {
//   users: IUser[]
// }

// **** Functions **** //

/**
 * Fetch the json from the file.
 */
function openDb(): Promise<any> {
  return jsonfile.readFile(__dirname + '/' + DB_FILE_NAME) as Promise<any>
}

/**
 * Update the file.
 */
function saveDb(db: any): Promise<void> {
  return jsonfile.writeFile(__dirname + '/' + DB_FILE_NAME, db)
}

export const orm = {
  saveDb: saveDb,
  openDb: openDb,
}

async function getDB() {
  const db = await orm.openDb()
  console.log('db: ', db)
  return db
}
console.log('db: ', getDB())
