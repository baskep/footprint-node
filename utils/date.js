const SECONDS = 1000 // 秒
const MINUTES = 60 * SECONDS // 分
const HOUR = 60 * MINUTES // 小时
const DAY = 24 * HOUR // 天
const YEAR = 365 * DAY // 年

const MONTH_DAY = 31
const YEAR_DAY = 365
const QUARTER_DAY = 90

// 获取明天凌晨时间
function getTomorrowMor(time = Date.now()) {
  const date = new Date(time + DAY)
  date.setHours(0, 0, 0, 0)
  return date
}

// 今天开始时间
function getTodayStart(date = new Date()) {
  date.setHours(0, 0, 0, 0)
  return date
}

// 今天结束时间
function getTodayEnd(date = new Date()) {
  date.setHours(23, 59, 59, 1000)
  return date
}

// 是否属于同一天
function isSameDay(time1, time2) {
  const date1 = time1 instanceof Date ? time1 : new Date(time1)
  const date2 = time2 instanceof Date ? time2 : new Date(time2)
  return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate()
}

function getDateOffsetMS(ms) {
  return new Date(Date.now() + ms)
}

function getLastYearDate() {
  return getDateOffsetMS(YEAR)
}

function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time, 10) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

module.exports = {
  SECONDS,
  MINUTES,
  HOUR,
  DAY,
  YEAR,
  MONTH_DAY,
  YEAR_DAY,
  QUARTER_DAY,
  getTomorrowMor,
  getTodayStart,
  getTodayEnd,
  isSameDay,
  getLastYearDate,
  getDateOffsetMS,
  parseTime,
  formatTime
}