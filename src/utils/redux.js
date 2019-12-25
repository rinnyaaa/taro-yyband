/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */
import fetch from './request'
import Taro from '@tarojs/taro'

export function createAction(options) {
  const { url, payload, method, fetchOptions, cb, type } = options
  return (dispatch) => {
    return fetch({ url, payload, method, ...fetchOptions }).then((res) => {
      Taro.hideLoading()
      dispatch({ type, payload: cb ? cb(res) : res })
      return res
    })
  }
}
