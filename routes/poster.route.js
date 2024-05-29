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

const router = Router();

router.get("/", getPostersPage);
router.get("/add", addNewPosterPage);
router.post("/add", addNewPoster);
router.get("/:id", getOnePoster);
router.get("/:id/edit", getEditPosterPage);
router.post("/:id/edit", updatePoster);
router.post("/:id/delete", deletePoster);

module.exports = router;
