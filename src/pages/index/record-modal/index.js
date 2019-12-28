import Taro from '@tarojs/taro';
import { View, Text, Picker, Swiper, SwiperItem, ScrollView } from '@tarojs/components';
import { AtButton, AtFloatLayout, AtTag, AtInput, AtForm, AtIcon } from "taro-ui";
import { connect } from "@tarojs/redux"
import { dispatchAccount, type,getRecentRecord } from "../../../actions/home";
import fetch from "@utils/request"
import { API_RECORD } from '@constants/api'
import moment from "moment"
import './index.scss'

@connect(state => state.home, dispatch => ({
  dispatchAccount() {
    dispatch(dispatchAccount())
  },
  dispatchType() {
    dispatch(type())
  },
  getRecentRecord() {
    dispatch(getRecentRecord())
  }
})
)
export default class RecordModal extends Taro.Component {
  state = {
    dateSel: moment(Date()).format('YYYY-MM-DD'),
    cost: '',
    memo: '',
    isOutcome: true,
    selectedType: '',
    isClose: false
  }

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    isOpened: true,
    title: '',
    onClose: () => {
      console.log('close')
    }
  };

  componentDidMount() {
    this.props.dispatchType()
  }

  onDateChange = e => {
    this.setState({
      dateSel: e.detail.value
    })
  }

  handleChangeCost(cost) {
    this.setState({
      cost
    })
    // 在小程序中，如果想改变 cost 的值，需要 `return cost` 从而改变输入框的当前值
    return cost
  }

  handleChangeMemo(memo) {
    this.setState({
      memo,
    })
    // 在小程序中，如果想改变 memo 的值，需要 `return memo` 从而改变输入框的当前值
    return memo
  }

  handleConfirm() {
    const { cost, isOutcome, dateSel, memo, selectedType } = this.state
    const payload = {
      consumption: Number(cost),
      isOut: isOutcome,
      typeId: selectedType,
      remark: memo,
      time: dateSel+" "+ moment(Date()).format('YYYY-MM-DD HH:mm:ss').split(" ")[1]
    }
    Taro.showLoading({
      title: '少女记账中...'
    })
    fetch({ url: API_RECORD, showToast: true, payload, method: 'POST' }).then(res => {
      if (res) {
        this.props.dispatchAccount()
        this.props.getRecentRecord()
        this.props.onClose()
      } else {
        console.log('record err')
      }
    });
  }

  selectType(id) {
    this.setState({
      selectedType: id
    })
  }

  judgeType(id) {
    return this.state.selectedType === id
  }

  handleChooseType() {
    //切换收支模式
    this.setState({
      isOutcome: !this.state.isOutcome
    })
  }


  render() {
    const { isOpened, title, onClose, recordType } = this.props;
    const { isOutcome, isClose } = this.state
    const month = this.state.dateSel.split("-")[1]
    const day = this.state.dateSel.split("-")[2]
    const end = moment(Date()).format('YYYY-MM-DD')
    return (
      <AtFloatLayout isOpened={isOpened} title={title} onClose={onClose}>
        <View className="home-modal">
          {/* <Radio value='选中' checked>选中</Radio>
          <Radio style='margin-left: 20rpx' value='未选中'>未选中</Radio> */}
          <View className="home-modal-picker">
            <View className="tags">
              <AtTag type='primary' className="home-modal-tag" active={isOutcome} circle onClick={this.handleChooseType.bind(this)}>支出</AtTag>
              <AtTag type='primary' className="home-modal-tag" active={!isOutcome} circle onClick={this.handleChooseType.bind(this)}>收入</AtTag>
            </View>
            <View className="home-modal-picker-bg">
              <Picker mode='date' onChange={this.onDateChange} end={end}>
                <View className='picker-txt'>
                  {`${month}月${day}日`}
                </View>
              </Picker>
            </View>
          </View>
          <ScrollView scrollX scrollWithAnimation className='home-modal-swiper'>
            {
              recordType.map((item) => {
                // return(<AtTag circle className="home-modal-swiper-item" active={this.judgeType.bind(this,item._id)} onClick={this.selectType.bind(this,item._id)}>{item.name}</AtTag>)
                return (<AtTag circle className="home-modal-swiper-item" active={this.judgeType(item._id)} onClick={this.selectType.bind(this, item._id)}>{item.name}</AtTag>)
              })
            }
          </ScrollView>
          <View className="home-modal-form">
            <AtForm>
              <AtInput
                name='cost'
                title='金额'
                type='number'
                placeholder='请输入金额'
                value={this.state.cost}
                onChange={this.handleChangeCost.bind(this)}
              />
              <AtInput
                name='memo'
                title='备注'
                type='text'
                placeholder='请输入备注'
                value={this.state.memo}
                onChange={this.handleChangeMemo.bind(this)}
              />
            </AtForm>
          </View>
          <AtButton type="primary" onClick={this.handleConfirm.bind(this)}>确认</AtButton>

        </View>
      </AtFloatLayout>
    );
  }
}
