const fs = require('fs')
const path = require('path')

const addNewPosterToDB = async (poster) => {
    const pathToDB = path.join(__dirname, 'db.json')
    const data = fs.readFile(pathToDB, 'utf8' )
    const posters = JSON.parse(data)
    posters.push(poster)

    fs.writeFile(pathToDB, JSON.stringify(posters), (err) => {
        if(err) throw err
        console.log('Data added')
    })
}

const getAllPosters = async () => {
    const pathToDB = path.join(__dirname, 'db.json')
    fs.readFile(pathToDB, 'utf8', (err, data) => {
        if(err) throw err
        return JSON.parse(data)
    })
}

const getPosterById = async (id) => {
    const pathToDB = path.join(__dirname, 'db.json')
    const data = fs.readFile(pathToDB, 'utf8' )
    const posters = JSON.parse(data)
    const poster = posters.find(p => p.id == id)
    return poster
}

const editPosterById = (id, editedPoster) => {
    const pathToDB = path.join(__dirname, 'db.json')
    const data = fs.readFile(pathToDB, 'utf8' )
    let posters = JSON.parse(data)
    const index = posters.findIndex(p => p.id === id)
    posters[index] = {
        id: posters[index].id,
        title: editedPoster.title,
        image: editedPoster.image,
        amount: editedPoster.amount,
        region: editedPoster.region,
        description: editedPoster.description
    }

    fs.writeFile(pathToDB, JSON.stringify(posters), (err) => {
        if(err) throw err
        console.log('Posted updated')
    })
}

const deletePosterById = (id) => {
    const pathToDB = path.join(__dirname, 'db.json')
    const data = fs.readFile(pathToDB, 'utf8' )
    let posters = JSON.parse(data)
    posters = posters.filter(p => p.id !== id)
    fs.writeFile(pathToDB, JSON.stringify(posters), (err) => {
        if(err) throw err
        console.log('Poster deleted')
    })
}
module.exports = {
    addNewPosterToDB,
    getAllPosters,
    getPosterById,
    editPosterById, 
    deletePosterById
}