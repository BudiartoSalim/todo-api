import pool from '../config/dbconfig';

interface ITodo {
  id?: number;
  title: string;
  description: string;
  user_id: number;
  status_id: number;
}

interface ITodoResponseSchema {
  success: boolean;
  data?: ITodo[];
  error?: any;
}

export default class Todo implements ITodo {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public status_id: number,
    public user_id: number
  ) { }

  static async fetchTodo(userId: number): Promise<ITodo[]> {
    const client = await pool.connect();
    try {
      const todoData = await client.query(
        `SELECT "Todos".id, "Todos".title, "Todos".description, "Statuses".status_description, "Todos".status_id FROM "Todos"
        LEFT JOIN "Statuses" 
        ON "Todos".status_id = "Statuses".id
        WHERE "user_id" = $1
        ORDER BY "Todos".id;`,
        [userId]
      );
      client.release();
      return todoData.rows;
    } catch (err) {
      client.release();
      return err;
    }
  }

  //input validation
  static todoInputValidator(todo: ITodo): ITodoResponseSchema {
    if (!todo.title || todo.title.length < 3) {
      return { success: false, error: 'Title must be between 3 - 255 characters long.' };
    };
    if (todo.description && todo.description.length > 255) {
      return { success: false, error: 'Description too long.' };
    };

    return { success: true }
  }

  static async newTodo(todo: ITodo): Promise<ITodoResponseSchema> {
    const validInputCheck = this.todoInputValidator(todo);
    if (validInputCheck.success === false) {
      return validInputCheck;
    }

    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO "Todos"(title, description, status_id, user_id ) VALUES($1, $2, $3, $4);`,
        [todo.title, todo.description, todo.status_id, todo.user_id]
      );
      client.release();
      const data = await Todo.fetchTodo(todo.user_id);
      return { success: true, data: data };

    } catch (err) {
      client.release();
      return { success: false, error: err };
    }
  }

  static async updateTodo(todoId: number, todo: ITodo): Promise<ITodoResponseSchema> {
    const validInputCheck = this.todoInputValidator(todo);
    if (validInputCheck.success === false) {
      return validInputCheck;
    }
    if (todo.status_id === 1 || todo.status_id === 2 || todo.status_id === 3) {
      const client = await pool.connect();
      try {
        const dbResponse = await client.query(`UPDATE "Todos" 
        SET status_id = $1, title = $2, description = $3
        WHERE id = $4;`, [todo.status_id, todo.title, todo.description, todoId]);
        client.release();

        if (dbResponse.rowCount === 0) {
          return { success: false, error: 'Todo not found.' };
        }
        const data = await Todo.fetchTodo(todo.user_id);
        return { success: true, data: data };
      } catch (err) {
        client.release();
        return err;
      }
    } else {
      return { success: false, error: "Bad Request." };
    }
  }

  static async deleteTodo(todoId: number): Promise<ITodoResponseSchema> {
    const client = await pool.connect();
    try {
      const deletedTodo = await client.query(`DELETE FROM "Todos" WHERE id = $1 RETURNING *;`, [todoId]);
      client.release();

      if (!deletedTodo || deletedTodo.rowCount < 1) {
        return { success: false, error: "Todo not found." };
      }

      return { success: true, data: deletedTodo.rows };
    } catch (err) {
      client.release();
      return err;
    }
  }

}
