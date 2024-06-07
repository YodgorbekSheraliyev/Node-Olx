const User = require('../models/user.model')

const getProfilePage = async (req, res) => {
    try {
        const user = await User.findOne({name: req.params.name}).populate('posters').lean()
        if(!user) throw new Error("Bunday foydalanuvchi mavjud emas")

            res.render('user/profile', {
                title: user.name,
                user,
                posters: user.posters,
                isAuth: req.session.isLogged
            })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getProfilePage}