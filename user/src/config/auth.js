export default {
    ensureAuthenticated: (req, res, next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/api/v0/login')
    }
}