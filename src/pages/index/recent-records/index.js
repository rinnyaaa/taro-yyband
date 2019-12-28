import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { connect } from '@tarojs/redux'
import { getRecentRecord } from "../../../actions/home";
import nodata from "@assets/nodata.png";
import './index.scss'

// import fetch from "@utils/request"
// import { API_RECORD } from '@constants/api'
@connect(state => state.home, dispatch => ({
  getRecentRecord() {
    dispatch(getRecentRecord())
  },
})
)
export default class INDEX extends Taro.Component {

  static options = {
    addGlobalClass: true
  }

  componentDidMount() {
    this.props.getRecentRecord()
  }

  render() {
    const { records } = this.props.recentRecords
    const info = Taro.getSystemInfoSync()
    const { screenWidth } = info
    const imgIn = 'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
    const imgOut = 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
    return (
      <View className="container" style={"width:"+screenWidth+'px'}>
        {records && records.length === 0 && (
          <View style="text-align:center">
            <Image style="width:138px;height:125px" src={nodata}></Image>
            <View>
              <Text className="home-nodata-txt">开始记账吧</Text>
            </View>
          </View>
        )}
        <View style="width:90%">
          {
            records && records.map((item) => {
              const { recordItem, time } = item
              const { consumption, isOut } = recordItem
              return (
                <AtListItem
                  title='外卖'
                  note={time}
                  extraText={'-' + consumption}
                  arrow='right'
                  hasBorder={false}
                  thumb={isOut ? imgOut : imgIn}
                />
              )
            })
          }
        </View>
      </View>
    )
  }
}