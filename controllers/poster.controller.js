const Poster = require("../models/poster.model");
const User = require('../models/user.model');
const filtering = require("../utils/filtering");

const getPostersPage = async (req, res) => {
  try {
    const pageLimit = 10;
    const limit = parseInt(req.query.limit)
    const page = parseInt(req.query.page)
    const total = await Poster.countDocuments();

    // Redirect if queries page, limit doesn't exist
    if(req.url === '/'){
      return res.redirect(`?page=1&limit=${pageLimit}`)
    }
    if(req.query.search){
      const {search} = req.query
      const posters = await Poster.searchPartial(search, (err, data) => {
        if(err) throw new Error()
      }).lean()
    
      return res.status(200).render('poster/searchResults', {
        title: "Search results",
        posters: posters.reverse(),
        user: req.session.user,
        querySearch: req.query.search
      })
    }

    if(!req.query.page || !req.query.limit){
      const {category, from, to, region} = req.query
      const filterings = filtering(category, from, to, region)
      const posters = await Poster.find(filterings).lean();
      // const posters = await Poster.find({region: "Andijon"}).lean();
      return res.render('poster/searchResults', {
        title: "Filter results",
        posters: posters.reverse(),
        user: req.session.user,
        querySearch: req.query.search
      })
    }

    const posters = await Poster
    .find()
    .sort({createdAt: -1})
    .skip((page-1)*limit)
    .limit(limit)
    .lean();
    return res.render("poster/posters", {
      title: "Posters",
      posters: posters.reverse(),
      pagination:{
        page,
        limit,
        pageCount: Math.ceil(total/limit)
      },
      user: req.session.user
    });
  } catch (error) {
    console.log(error)
  }
};

const getOnePoster = async (req, res) => {
  const id = req.params.id;
  const poster = await Poster.findByIdAndUpdate(id, {$inc: {visits: 1}}, {returning: true}).populate('author').lean();

  const user = req.session.user

  const isMe = user._id.toString() == poster.author._id
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
      category: req.body.category,
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
      category: req.body.category,
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
