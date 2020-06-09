import v0 from '../controllers'
import ensureAuthenticated from '../../config/auth'

export default (express)=>{
const router = express.Router()

// authentication
router.post('/signup', v0.usersController.create)
router.post('/login', v0.usersController.login)
// 
router.get('/users',  v0.usersController.index )
router.get('/dashboard', ensureAuthenticated, v0.usersController.show)

// logout user
router.get('/logout', v0.usersController.logout)
    return router
}