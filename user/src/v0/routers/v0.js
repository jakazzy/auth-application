import v0 from '../controllers'

export default (express)=>{
const router = express.Router()

// authentication
router.post('/signup', v0.usersController.create)
router.post('/login', v0.usersController.login)
// 
router.get('/users',  v0.usersController.index )
router.get('/dashboard', v0.usersController.show)
    return router
}