import { Redirect } from 'expo-router'
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite'

async function createTables(db: SQLiteDatabase) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA forgein_keys = ON;

      CREATE TABLE IF NOT EXISTS Lists (
        lid INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date DATE NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL,
        serial INTEGER NOT NULL UNIQUE
      );

      CREATE TABLE IF NOT EXISTS Items (
        iid INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        expireDate DATE NOT NULL,
        priority TEXT NOT NULL,
        serial INTEGER NOT NULL UNIQUE,
        lid INTEGER,
        FOREIGN KEY (lid) REFERENCES Lists(lid)
      );
		`)
		console.log('Table(s) created successfully.')
  } catch (error) {
    console.log('Error while initializing database : ', error)
  }
}

const Root = () => {
  return (
    <SQLiteProvider databaseName="listonomics.db" onInit={createTables}>
      <Redirect href="home" />
    </SQLiteProvider>
  )
}

export default Root