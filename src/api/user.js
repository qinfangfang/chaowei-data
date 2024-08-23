import request from "@/request/index.js";

/**
 * 查询用户信息
 */
export const getUserInfo = (data = {}) => {
  return request({
    url: "/user/info",
    data,
  });
};

/**
 * 修改密码
 */
export const changePwd = (data = {}) => {
  return request({
    url: "/user/changePwd",
    data,
  });
};

/**
 * 忘记密码邮件
 */
export const emailForgotPwd = (data = {}) => {
  return request({
    url: "/captcha/emailForgotPwd",
    data,
  });
};

/**
 * 根据邮件code获取用户信息
 */
export const emailCodeUserInfo = (data = {}) => {
  return request({
    url: "/captcha/emailCodeUserInfo",
    data,
  });
};

/**
 * 退出登录(无参数 header加上token调用即可)
 */
export const logOut = (data = {}) => {
  return request({
    url: "/auth/logout",
    data,
  });
};

/**
 * 通过邮件重置密码
 */
export const emailResetPwd = (data = {}) => {
  return request({
    url: "/auth/emailResetPwd",
    data,
  });
};


/**
 * 通过邮件注册(先发送邮件)
 */
export const sendEmailRegister = (data = {}) => {
  return request({
    url: "/captcha/emailRegister",
    data,
  });
};

/**
 * 通过邮件注册
 */
export const emailRegister = (data = {}) => {
  return request({
    url: "/auth/emailRegister",
    data,
  });
};

/**
 * 登录
 */
export const emailLogin = (data = {}) => {
  return request({
    url: "/auth/emailLogin",
    data,
  });
};
