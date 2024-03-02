import express, { Express, Request, Response } from 'express';
const router = express.Router();

const todoController = require("../controllers/todo");
const multer = require('../helpers/multer');

router.get('/list', todoController.getTodoList);
router.post('/list',  multer.image_upload.array('file'), todoController.postTodoList, multer.body_parse.array());

module.exports = router;