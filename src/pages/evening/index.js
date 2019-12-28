import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'

export default class Test extends Taro.Component {

  config = {
   navigationBarTitleText: '晚安'
  };

  componentDidMount() {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })
  }

  render() {
    return (
      <View className="index">
        <Text> 晚安 </Text>
      </View>
    );
  }
}
