if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

import pool from '../config/dbconfig';

//REMEMBER TO CREATE THE POSTGRESQL DATABASE FIRST
//database name is defined in env variable DB_NAME

migrateTables();

async function migrateTables() {
  const client = await pool.connect();
  try {
    await client.query(
      `CREATE TABLE IF NOT EXISTS "Users" (
        id SERIAL PRIMARY KEY,
        email VARCHAR(50) NOT NULL,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        UNIQUE(email)
        );`
    )

    await client.query(
      `CREATE TABLE IF NOT EXISTS "Statuses" (
          id SERIAL PRIMARY KEY,
          status_description VARCHAR(255) NOT NULL
        );

      INSERT INTO
        "Statuses"
      Values
        ('1', 'Started.'),
        ('2', 'In progress.'),
        ('3', 'Finished.');
      `
    )

    await client.query(
      `CREATE TABLE IF NOT EXISTS "Todos" (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        status_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        CONSTRAINT fk_user
          FOREIGN KEY(user_id)
            REFERENCES "Users"(id)
            ON DELETE CASCADE,
        CONSTRAINT fk_status
          FOREIGN KEY(status_id)
            REFERENCES "Statuses"(id)
            ON DELETE CASCADE
      );
      `
    );
    console.log('finish migrating');
    client.release();
  } catch (err) {
    console.log(err);
    client.release();
  }
}