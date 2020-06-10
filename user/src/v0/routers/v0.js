import v0 from '../controllers'
// import ensureAuthenticated from '../../config/auth'

export default (express)=>{
const router = express.Router()

// authentication
router.post('/signup', v0.usersController.create)
router.post('/login', v0.usersController.login)
// 
router.get('/users',  v0.usersController.index )
router.get('/dashboard',  v0.usersController.show)
router.post('/reset', v0.usersController.sendResetPasswordEmail)
router.put('/reset/:id/:token', v0.usersController.resetNewPassword)
router.delete('/users/:id', v0.usersController.delete )

// logout user
router.get('/logout', v0.usersController.logout)

// Google authentication
router.get('/auth/google', v0.usersController.googleLogin);

router.get('/auth/google/callback', v0.usersController.googleCallBack);

    return router
}