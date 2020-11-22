import express = require('express');
const router: express.Router = express.Router();

import UserController from '../controllers/user-controller';
import TodoController from '../controllers/todo-controller';

router.post('/register', UserController.userRegisterPostHandler);
router.post('/login', UserController.userLoginPostHandler);
router.post('/todo', TodoController.newTodoPostHandler);

module.exports = router;