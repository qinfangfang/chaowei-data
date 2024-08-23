import axios from "axios";
import { getToken, getLocale } from "@/utils";
import Cookies from "js-cookie";

const IS_DEV = process.env.NODE_ENV;
/**
 * 创建 axios实例
 * baseURL 基础路径 带有/
 * timeout 超时时间,单位毫秒
 * @type {AxiosInstance}
 */
console.log();
const service = axios.create({
  baseURL: process.env.VITE_API_BASE_URL,
  timeout: 30000,
});

/**
 * 发送请求
 * @param url 请求路径
 * @param method 请求方式 默认 'get'
 * @param data  入参
 * @param isUploadFile 本次请求是否上传文件 true:是
 * @param responseType 用于文件下载场景 responseType = "blob"
 * @param headers 自定义请求头字段
 * @returns promise 实例
 */
const request = ({
  url,
  method = "post",
  data = {},
  responseType,
  headers = {},
  timeout = 0,
} = {}) => {
  const _url = `${IS_DEV ? "/api" : ""}${url}`;
  return service.request({
    url: _url,
    method,
    data,
    responseType,
    headers,
    timeout,
  });
};

/**
 * @desc 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    console.log("request--start",config, config.url, config.data);
    config.headers['X-Token'] = getToken();
    config.headers['X-Language'] = getLocale();
    return config;
  },
  (e) => {
    console.error("interceptors.request is error", e);
    showFailToast("请求出错");
    return Promise.reject(e);
  }
);

/**
 * @desc 响应拦截器
 * 服务器需要设置
 * response.setHeader("Access-Control-Expose-Headers", "Content-Disposition")
 * response.setHeader("Content-Disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));
 */
service.interceptors.response.use(
  async (res) => {
    // 兼容各种服务端响应体
    const resCode = res?.data?.code;
    const resData = res?.data?.data;
    if([2001,2002,2003].includes(resCode)) {  // 2001(其他地方登录被挤掉)、2002(token已过期)、2003(token无效)都需要重新登录
      Cookies.set("token", '');  // 清除token
    }
    if (resCode == "0") {
      return resData;
    }
    return res?.data;
  },
  (error) => {
    console.error(
      "response--error",
      typeof error === "object" ? JSON.stringify(error) : error
    );
    return Promise.reject(error);
  }
);

export default request;
