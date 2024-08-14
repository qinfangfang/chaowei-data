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
 * 标签分组列表(包含标签信息) - 不分页
 */

export const getModelTagGroup = (data = {}) => {
  return request({
    url: "/modelTagGroup/list",
    data,
  });
};

/**
 * 模型分类
 */

export const getModelCategory = (data = {}) => {
  return request({
    url: "/modelCategory/list",
    data,
  });
};

/**
 * 收费模型列表
 * {
  "pageSize": 0,
  "pageNum": 0,
  "categoryId": 0,
  "tagIds": [
    0
  ]
}
 */

export const getModelList = (data = {}) => {
  return request({
    url: "/model/list",
    data,
  });
};

/**
 * 收费模型列表
 * {
  "pageSize": 0,
  "pageNum": 0,
  "categoryId": 0,
  "tagIds": [
    0
  ]
}
 */

export const getModelFreeList = (data = {}) => {
  return request({
    url: "/model/freeList",
    data,
  });
};

/**
 * 模型详情
 * id
 */

export const getModelDetailById = (data = {}) => {
  return request({
    url: `/model/detail/${data?.id}`,
    data,
  });
};
