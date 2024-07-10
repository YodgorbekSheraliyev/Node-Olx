const User = require("../models/user.model");
const bcrypt = require('bcryptjs')

const getLoginPage = (req, res) => {
  if(!req.session.isLogged){
    res.render("auth/login", {
      title: "Login",
      error: req.flash('error')
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      const matchPassword = await bcrypt.compare(password, userExist.password);
      if (matchPassword) {
        req.session.user = userExist;
        req.session.isLogged = true;
        req.session.save((err) => {
          if (err) throw err;
          return res.redirect("/profile/" + req.session.user._id);
        });
      } else {
        req.flash("error", 'Parol noto\'g\'ri kiritilgan. Iltimos qaytadan urining!')
        return res.redirect("/auth/login");
      }
    } else {
      req.flash('error', "Bu email bilan ro'yhdatdan o'tilmagan. Iltimos ro'yhatdan o'ting!")
      return res.redirect("/auth/login");
    }
  } catch (error) {
    console.log(error);
  }
};

const registerUser = async (req, res) => {
  const { email, name, phone, password, password2 } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    req.flash('error', "Bu emaildan avval ro'yhatdan o'tilgan. Iltimos boshqa emaildan foydalaning!")
    return res.redirect("/auth/register");
  }
  if (password !== password2) {
    req.flash('error', "Parollar bir xil emas. Iltimos qaytadan urining!")
    return res.redirect("/auth/login");
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({ email, name, phone, avatar: req.file.filename, password: hashedPassword });
  req.session.user = user
  req.session.isLogged = true
  res.redirect("/posters");
};

const getRegisterPage = (req, res) => {
  if(!req.session.isLogged){
    res.render("auth/register", {
      title: "Register",
      error: req.flash('error'),
    });
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login')
  })
}

module.exports = {
  getLoginPage,
  getRegisterPage,
  loginUser,
  registerUser,
  logout
};
