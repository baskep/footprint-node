const SUCCESS = genStatus(200, 'success')

module.exports = {
  SUCCESS,

  BAD_REQUEST: genStatus(400, '语义有误或参数错误'),
  NOT_FOUND: genStatus(404, '找不到相关内容'),
  SYSTEM_BUSY: genStatus(40301, '系统繁忙，请稍后再试！'),
  SYSTEM_API_LIMIT: genStatus(40302, '该接口或用户已达访问上限，请稍后再试！'),
  SYSTEM_API_FORBID: genStatus(40303, '该接口或用户已禁止访问！'),

  internalServerError: (errorMessage) => {
    errorMessage = errorMessage || '系统异常，请稍后再试。'
    return { status: { code: 500, message: errorMessage } }
  },

  NOT_LOGIN: genStatus(11001, '用户未登录'),
  LOGIN_INVALID: genStatus(113, '你的登录已经失效，请重新登录'),
  AUTH_FAILED: genStatus(11004, '密码错误'),
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
