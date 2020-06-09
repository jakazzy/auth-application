import v0 from '../controllers'

export default (express)=>{
const router = express.Router()

// authentication
router.get('/login', v0.usersController.login)

router.get('/signup', v0.usersController.create)

// 
router.get('/users',  v0.usersController.index )
    return router
}