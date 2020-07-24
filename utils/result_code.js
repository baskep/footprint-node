const SUCCESS = genStatus(200, 'success')

module.exports = {
  SUCCESS,

  // 40：参数校验
  BAD_REQUEST: genStatus(40000, '语义有误或参数错误'),
  NOT_FOUND: genStatus(40404, '找不到相关内容'),
  SYSTEM_BUSY: genStatus(40301, '系统繁忙，请稍后再试！'),
  SYSTEM_API_LIMIT: genStatus(40302, '该接口或用户已达访问上限，请稍后再试！'),
  SYSTEM_API_FORBID: genStatus(40303, '该接口或用户已禁止访问！'),

  // 50：系统错误
  internalServerError: (errorMessage) => {
    errorMessage = errorMessage || '系统异常，请稍后再试。'
    return this.body = { status: { code: 50000, message: errorMessage } }
  },

  // 11：用户
  NOT_LOGIN: genStatus(11001, '用户未登录'),
  NOT_LOGIN_C: genStatus(11002, '用户未登陆'), // C端需要登录但是未登陆的错误
  LOGIN_INVALID: genStatus(11003, '你的登录已经失效，请重新登录'),
  AUTH_FAILED: genStatus(11004, '用户名或密码错误'),
  USER_FROZEN: genStatus(11011, '用户被冻结'),
  USER_NOT_FOUND: genStatus(11012, '用户不存在，或者被管理员删除'),
  USER_NOT_EXISTED: genStatus(11013, '用户不存在'),
  ERROR_USER_INFO: genStatus(11014, '用户信息不匹配，请重新登录'),
  USER_FORBIDDEN: genStatus(11403, '用户没权限!'),

  success: (data) => {
    return Object.assign({ data }, SUCCESS)
  },

  paramsUNExistError: (params) => {
    const errMsg = Object.keys(params).map(key => { return params[key] ? null : key }).filter(i => i).join('、')
    if (errMsg) {
      return { status: { code: 400, message: `invalid params: ${errMsg}` } }
    }
    return null
  }
}

function genStatus(code, message, messageDescription = '') {
  return { status: { code, message, messageDescription } }
}
