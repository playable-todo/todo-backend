import express, { Express, Request, Response } from 'express';
const router = express.Router();

const todoController = require("../controllers/todo");
const multer = require('../helpers/multer');

router.get('/list', todoController.getTodoList);
router.post('/list',  multer.file_upload.array('file'), todoController.postTodoList, multer.body_parse.array());
router.put('/list/:todo_id', multer.file_upload.array('file'), todoController.putTodoList, multer.body_parse.array());
router.delete('/list/:todo_id', todoController.deleteTodoList);

module.exports = router;