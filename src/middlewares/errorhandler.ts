import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.message !== undefined) {
    if (err.regisError === true) {
      res.status(400).json({ errorType: 'RegisError', message: err.message });
    } else if (err.loginError === true) {
      res.status(400).json({ errorType: 'LoginError', message: err.message });
    }
    else {
      res.status(500).json({ errorType: 'UnhandledError', message: err.message });
    }
  } else {
    res.status(500).json({ errorType: 'UnknownError', message: err.message });
  }
}