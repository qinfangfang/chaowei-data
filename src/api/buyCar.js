import request from "@/request/index.js";

/**
 * 加入购物车
 */
export const addModelToCarById = (data = {}) => {
  return request({
    url: `/orderCart/addModel/${data?.id}`,
    data,
  });
};

/**
 * 用户购物车列表
 */
export const orderCartList = (data = {}) => {
  return request({
    url: `/orderCart/list`,
    data,
  });
};


/**
 * 删除购物车
 * cartIds: cartId[]
 */
export const orderCartDeleteById = (data = {}) => {
  return request({
    url: `/orderCart/del`,
    data,
  });
};