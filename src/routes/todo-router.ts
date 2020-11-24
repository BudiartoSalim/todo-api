import express = require('express');
const router: express.Router = express.Router();

import TodoController from '../controllers/todo-controller';
import authentication from '../middlewares/authentication';

router.use(authentication);
router.get('/', TodoController.getTodoHandler);
router.post('/', TodoController.newTodoPostHandler);
router.put('/:todoId', TodoController.updateTodoPutHandler);
router.delete('/:todoId', TodoController.deleteTodoHandler);



module.exports = router;