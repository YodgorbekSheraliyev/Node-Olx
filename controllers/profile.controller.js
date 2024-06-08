const User = require('../models/user.model')

const getProfilePage = async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.id}).populate('posters').lean()
        const isMe = user._id == req.session.user._id.toString()
        if(!user) throw new Error("Bunday foydalanuvchi mavjud emas")

            res.render('user/profile', {
                title: user.name,
                user,
                isMe,
                myposters: req.session.user._id,
                posters: user.posters,
                isAuth: req.session.isLogged
            })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getProfilePage}