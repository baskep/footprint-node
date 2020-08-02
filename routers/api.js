const Router = require('@koa/router')
const UserMiddleware = require('../middleware/user')
const User = require('../controllers/user')
const Category = require('../controllers/category')
const InvitationCode = require('../controllers/invitation_code')

const router = new Router()

router.use(UserMiddleware.verify)

// user
router.get('/test', User.test)

// category
router.get('/category', Category.getCategory)

// category
router.get('/invitation-code', InvitationCode.generateInvitationCode)


module.exports = router.routes()