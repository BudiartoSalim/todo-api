import { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.errorName === 'regisError') {
    res.status(400).json({ errorName: err.errorName, message: err.message });
  } else if (err.errorName === 'loginError') {
    res.status(401).json({ errorName: err.errorName, message: err.message });
  } else if (err.errorName === 'todoInputValidationError') {
    res.status(400).json({ errorName: err.errorName, message: err.message });
  } else if (err.errorName === 'notFound') {
    res.status(404).json({ errorName: err.errorName, message: err.message });
  }
  else {
    res.status(500).json({ errorName: 'UnknownError', message: err.message });
  }
}