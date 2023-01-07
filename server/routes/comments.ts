import express from 'express';

const router = express.Router();
const commentsController = require("../controllers/comments");

//Comment Routes - simplified for now

router.post("/createComment/", commentsController.createComment);

router.post("/getComments/", commentsController.getComments);

router.put("/snapComment/", commentsController.snapComment);

router.post("/deleteComment/", commentsController.deleteComment);

module.exports = router;