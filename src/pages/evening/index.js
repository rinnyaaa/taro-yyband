import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import './index.scss'

export default class Test extends Taro.Component {

  config = {
   navigationBarTitleText: '晚安'
  };

  render() {
    return (
      <View className="index">
        <Text> 晚安 </Text>
      </View>
    );
  }
}
