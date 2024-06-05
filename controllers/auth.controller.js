const User = require("../models/user.model");
const bcrypt = require('bcryptjs')

const getLoginPage = (req, res) => {
  res.render("auth/login", {
    title: "Login",
  });
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
          return res.redirect("/profile" + req.session.user.name);
        });
      } else {
        return res.redirect("/auth/login");
      }
    } else {
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
    return res.redirect("/auth/login");
  }
  if (password !== password2) {
    return res.redirect("/auth/login");
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  await User.create({ email, name, password: hashedPassword, phone });
  res.redirect("/posters");
};

const getRegisterPage = (req, res) => {
  res.render("auth/register", {
    title: "Register",
  });
};

module.exports = {
  getLoginPage,
  getRegisterPage,
  loginUser,
  registerUser,
};
