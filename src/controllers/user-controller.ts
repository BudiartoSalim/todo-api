import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

class UserController {
  static async userRegisterPostHandler(req: Request, res: Response, next: NextFunction) {
    const response: string = await User.registerUser(req.body.email, req.body.username, req.body.password);
    res.status(200).json({ message: response });
  }

  static async userLoginPostHandler(req: Request, res: Response, next: NextFunction) {
    const data = await User.login(req.body.email, req.body.password);
    res.status(200).json(data);
  }

}

export default UserController;