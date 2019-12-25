import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'

export default class Test extends Taro.Component {

  config = {
   navigationBarTitleText: '计划'
  };

  render() {
    return (
      <View className="index">
        <Text> 计划 </Text>
      </View>
    );
  }
}
