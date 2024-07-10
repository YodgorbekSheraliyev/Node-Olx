const User = require("../models/user.model");
const bcrypt = require('bcryptjs')
const path = require('path')
const fs = require('fs')

const getProfilePage = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id })
      .populate("posters")
      .lean();
    const isMe = user._id == req.session.user._id.toString();
    if (!user) throw new Error("Bunday foydalanuvchi mavjud emas");

    res.render("user/profile", {
      title: user.name,
      user,
      isMe,
      myposters: req.session.user._id,
      posters: user.posters,
      isAuth: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

const getMyProfilePage = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.session.user._id })
      .populate("posters")
      .lean();
      console.log(user);
    const isMe = user._id == req.session.user._id.toString();
    if (!user) throw new Error("Bunday foydalanuvchi mavjud emas");

    res.render("user/profile", {
      title: user.name,
      user,
      isMe,
      myposters: req.session.user._id,
      posters: user.posters,
      isAuth: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUserPage = async (req, res) => {
    try {
    const user = await User.findById(req.session.user._id).lean()
    res.render("user/update", {
        title: user.name,
        user: user,
        posters: user.posters,
        isAuth: req.session.isLogged,
        error: req.flash("error")   
      });
  } catch (error) {
    console.log(error)
  }
};

const updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id)
        const {name, phone, oldPassword, newPassword} = req.body
        if(oldPassword == "" && newPassword == ""){
            await User.findByIdAndUpdate(user._id, {name, phone,})
            return res.redirect('/profile/' + user._id)
        }
        const matchPassword = await bcrypt.compare(oldPassword, user.password)
            if(!matchPassword){
                req.flash("error", "Old password is wrong")
                return res.redirect('/profile/change')
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)
            await User.findByIdAndUpdate(user._id, {
                name, phone, password: hashedPassword
            })
            return res.redirect('/profile/' + user._id)

    } catch (error) {
        console.log(error)
    }
}

module.exports = { getProfilePage, getMyProfilePage, updateUserPage, updateUser };
