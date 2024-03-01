import express from 'express';
const router = express.Router();
const multer = require('../helpers/multer');

const memberController = require("../controllers/member");

router.get("/session", memberController.getMember);
router.post('/session', multer.body_parse.array(), memberController.postMember);

module.exports = router;