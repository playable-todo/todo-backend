import express, { Express, Request, Response } from 'express';
const router = express.Router();

const todoController = require("../controllers/todo");
const multer = require('../helpers/multer');

router.get('/list', todoController.getTodoList);

module.exports = router;