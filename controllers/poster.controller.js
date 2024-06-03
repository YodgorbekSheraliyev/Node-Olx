const Poster = require("../models/poster.model");

const getPostersPage = async (req, res) => {
  const posters = await Poster.find().lean();
  res.render("poster/posters", {
    title: "Posters",
    posters: posters.reverse(),
  });
};

const getOnePoster = async (req, res) => {
  const id = req.params.id;
  const poster = await Poster.findByIdAndUpdate(id, {inc}).lean();
  console.log(poster)
  res.render("poster/one", {
    title: poster.title,
    poster,
  });
};

const addNewPosterPage = (req, res) => {
  res.render("poster/add-poster", { title: "Add Poster" });
};

const addNewPoster = async (req, res) => {
  const poster = {
    title: req.body.title,
    amount: req.body.amount,
    region: req.body.region,
    image: req.file.filename,
    description: req.body.description,
  };
  await Poster.create(poster);
  res.redirect("/posters");
};

const getEditPosterPage = async (req, res) => {
  try {
    const id = req.params.id;
    const poster = await Poster.findById(id).lean();
    res.render("poster/edit-poster", {
      title: "Edit poster",
      poster
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePoster = async (req, res) => {
  try {
    const editedPoster = {
      title: req.body.title,
      image: req.body.image,
      amount: req.body.amount,
      region: req.body.region,
      description: req.body.description,
    };
    await Poster.findByIdAndUpdate(req.params.id, editedPoster);
    res.redirect("/posters");
  } catch (error) {
    console.log(error);
  }
};

const deletePoster = async (req, res) => {
  try {
    await Poster.findByIdAndDelete(req.params.id)
    res.redirect('/posters')
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPostersPage,
  addNewPosterPage,
  addNewPoster,
  getOnePoster,
  getEditPosterPage,
  updatePoster,
  deletePoster,
};
