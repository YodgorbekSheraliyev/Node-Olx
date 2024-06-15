const Poster = require('../models/poster.model')

const getHomePage = async (req, res) => {
    const posters = await Poster.find().lean()
    res.render("home", {
        title: "Home page",
        user: req.session.user,
        posters,
        isLogged: req.session.isLogged,
    })
}

module.exports = {
    getHomePage
}