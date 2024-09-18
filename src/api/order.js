import request from "@/request/index.js";

/**
 * 订单状态查询
 * orderId
 */
export const queryOrderStatus = (data = {}) => {
  return request({
    url: `/order/status/${data?.orderId}`,
    data,
  });
};

/**
 * 订单创建前置查询接口(cartIds和modelId只取一个字段 优先取cartIds)
 *
  {
    "cartIds": [
      0
    ],
    "modelId": 0
  }
 */
export const orderPreCreate = (data = {}) => {
  return request({
    url: `/order/preCreate`,
    data,
  });
};

/**
 * 开发票
 *
  "orderItemIds": [
    0
  ],
  "title": "string",
  "taxNo": "string",
  "content": "string",
  "email": "O.gisM@751KHpJQvXnBdNZnMSQ.cHoGuASe1WnFc4nIfHmJkAp.AJocsrCiTVXBM"
 */
export const orderItemReceipt = (data = {}) => {
  return request({
    url: `/order/itemReceipt`,
    data,
  });
};

/**
 * 订单行分页查询
  {
    "pageSize": 0,
    "pageNum": 0
  }
 */
export const orderItemList = (data = {}) => {
  return request({
    url: `/order/itemList`,
    data,
  });
};

/**
 * 创建订单(同时创建三方支付订单并返回三方支付订单数据)
  {
    "payType": 1,
    "modelIds": [
      0
    ]
  }
 */
  export const orderCreate = (data = {}) => {
    return request({
      url: `/order/create`,
      data,
    });
  };

  /**
 * 支付回调 - 微信
 */

export const payCallBackWx = (data = {}) => {
  return request({
    url: `/payment/callbacks/wechat/transaction`,
    data,
  });
};

/**
 * 支付回调 - 支付宝
 */

export const payCallBackAliPay = (data = {}) => {
  return request({
    url: `/payment/callbacks/ali/transaction`,
    data,
  });
};