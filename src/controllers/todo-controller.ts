import { Request, Response, NextFunction } from 'express';
import Todo from '../models/todo';

class TodoController {
  static async newTodoPostHandler(req: Request, res: Response, next: NextFunction) {
    const newId: number = parseInt(req.body.id);
    const newOwner: number = parseInt(req.body.user_id);
    const data = new Todo(
      newId,
      req.body.title,
      req.body.description,
      req.body.status,
      newOwner
    );
    console.log(data)
    res.status(200).json(data);
  }

}

export default TodoController;