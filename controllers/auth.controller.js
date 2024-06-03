const getLoginPage = (req, res) => {
    res.render('auth/login', {
        title: "Login"
    })
}

const getRegisterPage = (req, res) => {
    res.render('auth/register', {
        title: "Register"
    })
}

module.exports = {
    getLoginPage, getRegisterPage
}