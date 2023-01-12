import express from 'express';
import commentsController from "../controllers/comments";

const router = express.Router();

//Comment Routes - simplified for now

router.post("/createComment/", commentsController.createComment);

router.post("/getComments/", commentsController.getComments);

router.put("/snapComment/", commentsController.snapComment);

router.post("/deleteComment/", commentsController.deleteComment);

export default router;