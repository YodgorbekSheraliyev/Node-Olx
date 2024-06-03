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
const upload = require('../utils/fileUpload')

const router = Router();

router.get("/", getPostersPage);
router.get("/add", addNewPosterPage);
router.post("/add", upload.single('image'), addNewPoster);
router.get("/:id/edit", getEditPosterPage);
router.post("/:id/edit", updatePoster);
router.post("/:id/delete", deletePoster);
router.get("/:id", getOnePoster);

module.exports = router;
