const Poster = require("../models/poster.model");
const User = require('../models/user.model')


const getPostersPage = async (req, res) => {
  const posters = await Poster.find().lean();
  res.render("poster/posters", {
    title: "Posters",
    posters: posters.reverse(),
    user: req.session.user
  });
};

const getOnePoster = async (req, res) => {
  const id = req.params.id;
  const poster = await Poster.findByIdAndUpdate(id, {$inc: {visits: 1}}, {returning: true}).populate('author').lean();

  const user = req.session.user
  console.log(user)
  console.log(poster.author._id)

  const isMe = user._id.toString() == poster.author._id
  console.log(isMe)
  res.render("poster/one", {
    title: poster.title,
    poster,
    user,
    isMe,
    author: poster.author
  });
};

const addNewPosterPage = (req, res) => {
  res.render("poster/add-poster", { title: "Add Poster", user: req.session.user });
};

const addNewPoster = async (req, res) => {
  try {
    const poster = {
      title: req.body.title,
      amount: req.body.amount,
      region: req.body.region,
      image: req.file.filename,
      description: req.body.description,
      author: req.session.user._id
    };
    const newPoster = new Poster(poster);
    await User.findByIdAndUpdate(req.session.user._id, {$push: {posters: newPoster._id}}, {new: true, upsert: true})
    newPoster.save()
    res.redirect('/posters/' + newPoster._id)

  } catch (error) {
    console.log(error)
  }
};

const getEditPosterPage = async (req, res) => {
  try {
    const id = req.params.id;
    const poster = await Poster.findById(id).lean();
    const user = req.session.user
    res.render("poster/edit-poster", {
      title: "Edit poster",
      poster, user
    });
  } catch (error) {
    console.log(error);
  }
};

const updatePoster = async (req, res) => {
  try {
    const editedPoster = {
      title: req.body.title,
      image: req.file.filename,
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
