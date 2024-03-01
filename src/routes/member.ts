import express, { Express, Request, Response } from 'express';
const router = express.Router();

const memberController = require("../controllers/member");

router.get("/session", memberController.get_member);

module.exports = router;