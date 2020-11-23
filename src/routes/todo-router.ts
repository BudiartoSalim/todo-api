import express = require('express');
const router: express.Router = express.Router();

import TodoController from '../controllers/todo-controller';

router.post('/', TodoController.newTodoPostHandler);


module.exports = router;