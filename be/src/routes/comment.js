const { Router } = require("express");
const AuthMiddleware = require("../middleware/AuthMiddleware");
const CommentController = require("../controllers/CommentController");
const StoreCommentRequest = require("../requests/comment/StoreCommentRequest");
const isValidPageNumberMiddleware = require("../middleware/IsValidPageNumberMiddleWare");
const isValidObjectIdMiddleWare = require("../middleware/IsValidObjectIdMiddleware");
const DestroyCommentRequest = require("../requests/comment/DestroyCommentRequest");

const router = Router();

router.get("/", isValidPageNumberMiddleware, CommentController.index);
router.get(
  "/:_id/replies",
  isValidPageNumberMiddleware,
  CommentController.getReplies
);

router.use(AuthMiddleware);
router.post("/create", StoreCommentRequest, CommentController.store);
router.delete(
  "/:_id/delete",
  isValidObjectIdMiddleWare,
  CommentController.destroy
);
router.delete(
  "/delete_all",
  DestroyCommentRequest,
  CommentController.destroyAll
);

module.exports = router;
