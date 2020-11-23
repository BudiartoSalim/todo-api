import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

class UserController {
  static async userRegisterPostHandler(req: Request, res: Response, next: NextFunction) {
    const data = await User.registerUser(req.body.email, req.body.username, req.body.password);
    if (data.success === true) {
      res.status(201).json({ message: data.message });
    } else {
      next({ regisError: true, message: data.message });
    }
  }

  static async userLoginPostHandler(req: Request, res: Response, next: NextFunction) {
    const data = await User.login(req.body.email, req.body.password);
    if (data.access_token) {
      res.status(200).json({ message: data.message, access_token: data.access_token });
    } else {
      next({ loginError: true, message: data.message });
    }
  }

}

export default UserController;