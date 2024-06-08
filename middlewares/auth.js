const protected = (req, res, next) => {
    if(!req.session.user){
        res.redirect('/')
    }
    next()
}

const guest = (req, res, next) => {
    if(req.session.user){
        res.redirect('/')
    }
    next()
}

module.exports = {protected, guest}