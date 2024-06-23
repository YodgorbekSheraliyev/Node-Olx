const { Router } = require("express");
const {
  addNewPosterPage,
  getPostersPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  deletePoster,
} = require("../controllers/poster.controller");
const { protected } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");

const router = Router();

router.get("/", getPostersPage);
router.get("/add", protected, addNewPosterPage);
router.post("/add", protected, upload.single("image"), addNewPoster);
router.get("/:id/edit", protected, getEditPosterPage);
router.post("/:id/edit", protected, updatePoster);
router.post("/:id/delete", protected, deletePoster);
router.get("/:id", getOnePoster);

module.exports = router;
