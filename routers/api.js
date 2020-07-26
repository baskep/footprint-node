const Router = require('@koa/router')
const UserMiddleware = require('../middleware/user')
const User = require('../controllers/user')
const Category = require('../controllers/category')

const router = new Router()

router.use(UserMiddleware.verify)

// user
router.get('/test', User.test)

// category
router.get('/category', Category.getCategory)


module.exports = router.routes()