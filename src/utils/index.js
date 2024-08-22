import Cookies from "js-cookie";

export { goLogin, closeLogin } from './login.js';

// 获取token
export const getToken = () => {
  return Cookies.get('token') || '';
}