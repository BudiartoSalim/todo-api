import express = require('express');
const router: express.Router = express.Router();
const todoRouter = require('./todo-router');

import UserController from '../controllers/user-controller';

router.post('/register', UserController.userRegisterPostHandler);
router.post('/login', UserController.userLoginPostHandler);
router.use('/todo', todoRouter);

module.exports = router;