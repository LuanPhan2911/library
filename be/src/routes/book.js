const { Router } = require("express");
const AuthAdminMiddleware = require("../middleware/AuthAdminMiddleware");
const StoreBookRequest = require("../requests/book/StoreBookRequest");
const BookController = require("../controllers/BookController");
const isValidObjectIdMiddleWare = require("../middleware/IsValidObjectIdMiddleware");
const { upload } = require("../utils/fileStorage/upload");
const HasSingleFileMiddleware = require("../middleware/HasSingleFileMiddleware");
const router = Router();

router.get("/:_id/show", isValidObjectIdMiddleWare, BookController.show);
router.get("/", BookController.index);

router.use(AuthAdminMiddleware);
router.post("/create", StoreBookRequest, BookController.store);
router.put(
  "/:_id/edit",
  isValidObjectIdMiddleWare,
  StoreBookRequest,
  BookController.update
);
router.put(
  "/:_id/edit/image",
  isValidObjectIdMiddleWare,
  upload({
    dir: "books",
  }).single("image"),
  HasSingleFileMiddleware,
  BookController.updateImage
);
router.delete(
  "/:_id/delete",
  isValidObjectIdMiddleWare,
  BookController.destroy
);

module.exports = router;
