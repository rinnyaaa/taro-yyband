import Taro from '@tarojs/taro'
export const hasLogin = () => {
    return Taro.getStorageSync('token')
    // const data= await Taro.getStorage({ key: 'token' }).then(res => res.data).catch(() => '')
  }
  