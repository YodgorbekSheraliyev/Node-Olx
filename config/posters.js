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
    const data = fs.readFile(pathToDB, 'utf8' )
    const posters = JSON.parse(data)
    return posters
}

const getPosterById = async (id) => {
    const pathToDB = path.join(__dirname, 'db.json')
    const data = fs.readFile(pathToDB, 'utf8' )
    const posters = JSON.parse(data)
    const poster = posters.find(p => p.id == id)
    return poster
}
module.exports = {
    addNewPosterToDB,
    getAllPosters,
    getPosterById,

}