import Cookies from "js-cookie";

export { goLogin, closeLogin } from './login.js';

// 获取token
export const getToken = () => {
  return Cookies.get('token') || '';
}

// 获取当前语言种类
export const getLocale = () => {
  return localStorage.getItem('locale').toLocaleLowerCase() || 'en';
}