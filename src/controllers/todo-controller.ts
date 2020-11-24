import { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo';

class TodoController {
  // GET /todo
  static async getTodoHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await Todo.fetchTodo(res.locals.payload.id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  // POST /todo
  static async newTodoPostHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await Todo.newTodo({
        title: req.body.title,
        description: req.body.description,
        user_id: res.locals.payload.id,
        status_id: 1
      });
      if (response.error !== undefined) {
        throw { errorName: 'todoInputValidationError', message: response.error };
      } else {
        res.status(201).json(response.data);
      }
    } catch (err) {
      next(err);
    }
  }

  // PUT /todo:todoId
  static async updateTodoPutHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await Todo.updateTodo(
        Number(req.params.todoId),
        {
          title: req.body.title,
          description: req.body.description,
          status_id: Number(req.body.status_id),
          user_id: res.locals.payload.id
        });

      if (response.error !== undefined) {
        throw { errorName: 'todoInputValidationError', message: response.error }
      } else {
        res.status(200).json(response.data);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  // DELETE /todo:todoId
  static async deleteTodoHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const deletedTodo = await Todo.deleteTodo(Number(req.params.todoId));
      if (deletedTodo.error) {
        throw { errorName: "notFound", message: deletedTodo.error };
      }
      const data = await Todo.fetchTodo(res.locals.payload.id);
      res.status(200).json({ deleted: deletedTodo, data: data });
    } catch (err) {
      next(err);
    }
  }

}

export default TodoController;