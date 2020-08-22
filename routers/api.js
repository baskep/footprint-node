const Router = require('@koa/router')
const UserMiddleware = require('../middleware/user')
const User = require('../controllers/user')
const Category = require('../controllers/category')
const InvitationCode = require('../controllers/invitation_code')

const router = new Router()
const authRouter = new Router()
const notAuthRouter = new Router()

// 不需要登录验证的接口
notAuthRouter.post('/login', User.login);
notAuthRouter.get('/verify-code', User.getVerifyCode);

authRouter.use(UserMiddleware.verify)

// user
authRouter.get('/test', User.test)

// category
authRouter.get('/category', Category.getCategory)

// category
authRouter.get('/invitation-code', InvitationCode.generateInvitationCode)


router
  .use(notAuthRouter.routes())
  .use(authRouter.routes())

module.exports = router.routes();