import v1 from '../controllers'
// import ensureAuthenticated from '../../config/auth'

export default (express)=>{
const router = express.Router()

// authentication
router.post('/signup', v1.usersController.create)
router.post('/login', v1.usersController.login)
// 
router.get('/users',  v1.usersController.index )
router.get('/dashboard',  v1.usersController.show)
router.put('/reset', v1.usersController.sendResetPasswordEmail)
router.put('/reset/:id/:token', v1.usersController.resetNewPassword)
router.delete('/users/:id', v1.usersController.delete )

// logout user
router.get('/logout', v1.usersController.logout)

// Google authentication
router.get('/auth/google', v1.usersController.googleLogin);

router.get('/auth/google/callback', v1.usersController.googleCallBack);
router.get('/', v1.usersController.welcome)
    return router
}