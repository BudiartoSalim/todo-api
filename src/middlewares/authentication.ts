import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import pool from '../config/dbconfig';

export default async function authentication(req: Request, res: Response, next: NextFunction) {
  const client = await pool.connect();
  try {
    const token = req.headers.access_token;
    if (typeof token === 'string') {
      const secret_key = process.env.JWT_SECRET_KEY;
      res.locals.payload = jwt.verify(token, '' + secret_key);
      const user = await client.query(`SELECT * FROM "Users" WHERE "id" = $1;`, [res.locals.payload.id]);
      client.release();
      if (res.locals.payload && user.rows.length === 1 && user.username === res.locals.payload.username) {
        next();
      } else {
        res.status(401).json({ errorType: 'AuthError', message: 'Unauthorized.' });
      }
    } else {
      res.status(401).json({ errorType: 'AuthError', message: 'Unauthorized.' });
    }
  } catch (err) {
    res.status(401).json({ errorType: 'AuthError', message: 'Unauthorized.' });
  }
}