const {addNewPosterToDB, getAllPosters, getPosterById} = require('../config/posters')
const {v4} = require('uuid')

const getPostersPage = async (req, res) => {
    const posters = await getAllPosters()
    res.render('poster/posters', {title: "Posters"})
}

const getOnePoster = async (req, res) => {
    const id = req.params.id
    const poster = await getPosterById(id)
    res.render('poster/one', {
        title: poster.title,
        poster
    })
}

const addNewPosterPage = (req, res) => {
    res.render('poster/add-poster', {title:"Add Poster"})
}

const addNewPoster = async (req, res) => {
    const poster = {
        id: v4(),
        title: req.body.title,
        amount: req.body.amount,
        region: req.body.region,
        image: req.body.image,
        description: req.body.description
    }
    await addNewPosterToDB(poster)
    res.redirect('/')
}


module.exports = {getPostersPage, addNewPosterPage, addNewPoster, getOnePoster}