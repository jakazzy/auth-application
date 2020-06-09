import v0 from '../controllers'

export default (express)=>{
const router = express.Router()

// authentication
router.post('/login', v0.usersController.login)

router.post('/signup', v0.usersController.create)

// 
router.get('/users',  v0.usersController.index )
    return router
}