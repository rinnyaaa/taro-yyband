import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import './index.scss'

export default class INDEX extends Taro.Component {
  render() {
    return (
      <View>
        {/* <AtList> */}
          <AtListItem
            title='标题文字'
            arrow='right'
            hasBorder={false}
            thumb='https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
          />
          <AtListItem
            title='标题文字'
            note='描述信息'
            arrow='right'
            hasBorder={false}
            thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
          />
        {/* </AtList> */}
      </View>
    )
  }
}