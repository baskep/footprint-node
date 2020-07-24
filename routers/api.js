const Router = require('@koa/router')
const UserMiddleware = require('../middleware/user')
const User = require('../controllers/user')

const router = new Router()

router.use(UserMiddleware.verify)

router.get('/test', User.test)


module.exports = router.routes()