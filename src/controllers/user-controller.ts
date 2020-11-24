import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

class UserController {
  static async userRegisterPostHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.registerUser(req.body.email, req.body.username, req.body.password);
      if (data.success === true) {
        res.status(201).json({ message: data.message });
      } else {
        throw { errorName: 'regisError', message: data.message };
      }
    } catch (err) {
      next(err);
    }
  }

  static async userLoginPostHandler(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await User.login(req.body.email, req.body.password);
      if (data.access_token && data.success === true) {
        res.status(200).json({ message: data.message, access_token: data.access_token });
      } else {
        throw { errorName: 'loginError', message: data.message };
      }
    } catch (err) {
      next(err);
    }
  }

}

export default UserController;