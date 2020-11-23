import pool from '../config/dbconfig';

interface ITodo {
  title: string;
  description: string;
  user_id: number;
  status_id: number;
}

export default class Todo implements ITodo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status_id: number,
    public user_id: number
  ) { }

  static async fetchTodo(userId: number) {
    const client = await pool.connect();
    try {
      const todoData = await client.query(
        `SELECT * FROM "Todos"
        LEFT JOIN "Statuses" 
        ON "Todos".status_id = "Statuses".id
        WHERE "user_id" = $1;`,
        [userId]
      );
      client.release();
      return { success: true, data: todoData.rows };
    } catch (err) {
      client.release();
      return err;
    }
  }

  static async newTodo(todo: ITodo) {
    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO "Todos"(title, description, status_id, user_id ) VALUES($1, $2, $3, $4);`,
        [todo.title, todo.description, todo.status_id, todo.user_id]
      );
      client.release();
      return { success: true };

    } catch (err) {
      client.release();
      return err;
    }
  }

  static async updateTodo(todoId: number, todo: ITodo) {
    if (todo.status_id === 1 || todo.status_id === 2 || todo.status_id === 3) {
      const client = await pool.connect();
      try {
        client.query(`UPDATE "Todos" 
        SET status_id = $1, title = $2, description = $3
        WHERE id = $4;`, [todo.status_id, todo.title, todo.description, todoId]);
        client.release();
        return { success: true };
      } catch (err) {
        client.release();
        return err;
      }
    } else {
      return { message: "Bad Request." };
    }
  }

  static async deleteTodo(todoId: number): Promise<ITodo> {
    const client = await pool.connect();
    try {
      const deletedTodo = await client.query(`DELETE FROM "Todos" WHERE id = $1 RETURNING *;`, [todoId]);
      client.release();
      return deletedTodo;
    } catch (err) {
      client.release();
      return err;
    }
  }

}
