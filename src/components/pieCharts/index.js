import Taro from '@tarojs/taro';
import { View, Text, Picker } from '@tarojs/components';
import { AtButton, AtFloatLayout, AtInput, AtForm } from "taro-ui";

import './index.scss'

export default class FloatModal extends Taro.Component {
  state = {
   
  }

  static defaultProps = {
    isOpened: false,
    title: '',
    onClose: () => {
      console.log('close')
    }
  };

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  // handleChangeCost (cost) {
  //   this.setState({
  //     cost
  //   })
  //   // 在小程序中，如果想改变 cost 的值，需要 `return cost` 从而改变输入框的当前值
  //   return cost
  // }

  
  
  

  render() {
   const {isOpened,title,onClose} = this.props
    return (
      <AtFloatLayout isOpened={isOpened} title={title} onClose={onClose}>
        <View className="modal-content">
        {this.props.children}
        </View>
      </AtFloatLayout>
    );
  }
}
