const {addNewPosterToDB, getAllPosters, getPosterById, editPosterById, deletePosterById} = require('../config/posters')
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

const getEditPosterPage = async (req, res) => {
    try {
        const poster = await getPosterById(req.params.id)
        res.render('poster/edit-poster', {
            title: "Edit poster"
        })
    } catch (error) {
        console.log(error)
    }
}

const updatePoster = async (req, res) => {
    try {
        const editedPoster = {
            title: req.body.title,
            image: req.body.image,
            amount: req.body.amount,
            region: req.body.region,
            description: req.body.description
        }
        await editPosterById(req.params.id, editedPoster)
        res.redirect('/posters')
    } catch (error) {
        console.log(error)
    }
}

const deletePoster = async (req, res) => {
    try {
        await deletePosterById(req.params.id)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getPostersPage, addNewPosterPage, addNewPoster, getOnePoster, getEditPosterPage, updatePoster, deletePoster}