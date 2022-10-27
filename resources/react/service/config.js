const APP_NAME = process.env.MIX_APP_NAME
const APP_URL = process.env.MIX_APP_URL || '/api/v1/'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USER_DATA = 'user_data'
const EXPIR_DATE = 'token_expire_at'
const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

export { ACCESS_TOKEN, REFRESH_TOKEN, USER_DATA, EXPIR_DATE, CSRF_COOKIE_NAME, CSRF_HEADER_NAME, APP_NAME, APP_URL }
