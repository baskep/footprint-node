const Router = require('@koa/router')
const UserMiddleware = require('../middleware/user')
const User = require('../controllers/user')
const Category = require('../controllers/category')
const CategoryDetail = require('../controllers/category_detail')
const InvitationCode = require('../controllers/invitation_code')
const user = require('../controllers/user')

const router = new Router()
const authRouter = new Router()
const notAuthRouter = new Router()

// 不需要登录验证的接口
notAuthRouter.post('/login', User.login);
notAuthRouter.post('/login-out', User.loginOut);
notAuthRouter.get('/verify-code', User.getVerifyCode);
notAuthRouter.get('/category', Category.getCategory)
notAuthRouter.get('/empty-footprint', CategoryDetail.getFootprintList)

authRouter.use(UserMiddleware.verify)

// user
authRouter.get('/test', User.test)
authRouter.post('/edit-user', User.editUser)
authRouter.post('/user-info', User.editUserPd)

// category
authRouter.get('/category', Category.getCategory)

// categoryDetail
authRouter.get('/footprint', CategoryDetail.getFootprintList)
authRouter.post('/edit-list', CategoryDetail.editeCategoryDetail)

// invitationCode
authRouter.get('/invitation-code', InvitationCode.generateInvitationCode)


router
  .use(notAuthRouter.routes())
  .use(authRouter.routes())

module.exports = router.routes();