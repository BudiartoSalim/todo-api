import pool from '../config/dbconfig';
const bcrypt = require('bcryptjs');

export default class User {
  //post /register
  static async registerUser(email: string, username: string, password: string) {
    const emailRegex: RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

    //input validators
    if (emailRegex.test(email) === false) { return `Must be in valid email format.`; };
    if (username.length < 4 || username.length > 50) { return `Username must be between 4 - 50 characters long.` };
    if (password.length < 4 || password.length > 50) { return `Password must be between 4 - 50 characters long.` };

    const client = await pool.connect();
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword: string = bcrypt.hashSync(password, salt);

      await client.query(
        `INSERT INTO "Users"(email, username, password) VALUES($1, $2, $3) RETURNING *;
        `, [email, username, hashedPassword]
      );

      client.release();
      return `User ${username} is successfully registered!`;
    }
    catch (err) {
      client.release();
      if (err.constraint === "Users_email_key") {
        return 'Email unavailable.';
      }
      console.log(err);
      return err;
    }
  }

  // POST /login
  static async login(email: string, password: string) {
    const client = await pool.connect();
    try {
      const currentUser = await client.query(
        `SELECT * FROM "Users" WHERE "email" = $1 LIMIT 1`,
        [email]
      )

      client.release();
      if (currentUser.rows.length === 1) {
        if (bcrypt.compareSync(password, currentUser.rows[0].password)) {
          return currentUser;
        }
      }
      return 'Wrong ID/Password';

    } catch (err) {
      client.release();
      return err;
    }
  }
}