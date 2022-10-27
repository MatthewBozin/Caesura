const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");

//Comment Routes - simplified for now

router.post("/createComment/", commentsController.createComment);

router.post("/getComments/", commentsController.getComments);

router.post("/snapComment/:id", commentsController.snapComment);

router.post("/deleteComment/:id", commentsController.deleteComment);

module.exports = router;