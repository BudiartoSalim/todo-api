import pool from '../config/dbconfig';

interface ITodo {
  id: number;
  title: string;
  description: string;
  status: number;
  user_id: number;
}

export default class Todo implements ITodo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status: number,
    public user_id: number
  ) { }

  static async newTodo() {

  }
}