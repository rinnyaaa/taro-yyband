import Taro from '@tarojs/taro';
import {View, Text, Picker, Swiper, SwiperItem, ScrollView} from '@tarojs/components';
import {AtButton, AtFloatLayout, AtTag, AtInput, AtForm, AtIcon} from "taro-ui";
import {connect} from "@tarojs/redux"
import {dispatchAccount, type} from "../../../actions/home";
import fetch from "@utils/request"
import {API_RECORD} from '@constants/api'

import './index.scss'

@connect(state => state.home, dispatch => ({
    dispatchAccount() {
      dispatch(dispatchAccount())
    },
    dispatchType() {
      dispatch(type())
    }
  })
)
export default class RecordModal extends Taro.Component {
  state = {
    dateSel: '2018-04-22',
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
    isOpened: '',
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
    const _self = this
    const {cost, isOutcome, dateSel, memo, selectedType,isClose} = this.state
    console.log('点击确定前的 this.state.isClose %s',this.state.isClose);
    let _tmp = !isClose;
    console.log(_self.setState);
    if (_tmp) {
      _self.setState({
        isClose: true
      })
    } else {
      _self.setState({
        isClose: false
      })
    }
    console.log('点击确定后的 this.state.isClose %s',this.state.isClose);
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
    const {isOpened, title, onClose, recordType} = this.props;
    console.log('组件内部的 isOpened %s',isOpened);
    const {isOutcome, isClose} = this.state
    console.log('组件内部的 !isClose %s',!isClose);
    const month = this.state.dateSel.split("-")[1]
    const day = this.state.dateSel.split("-")[2]
    return (
      <AtFloatLayout isOpened={isOpened && !isClose} title={title} onClose={onClose}>
        <View className="home-modal">
          {/* <Radio value='选中' checked>选中</Radio>
          <Radio style='margin-left: 20rpx' value='未选中'>未选中</Radio> */}
          <View className="home-modal-picker">
            <View className="tags">
              <AtTag type='primary' className="home-modal-tag" active={isOutcome} circle
                     onClick={this.handleChooseType.bind(this)}>支出</AtTag>
              <AtTag type='primary' className="home-modal-tag" active={!isOutcome} circle
                     onClick={this.handleChooseType.bind(this)}>收入</AtTag>
            </View>
            <View className="home-modal-picker-bg">
              <Picker mode='date' onChange={this.onDateChange}>
                <View className='picker-txt'>
                  {`${month}月${day}日`}
                </View>
              </Picker>
            </View>
          </View>
          {/* 选择类别 */}
          {/* <Swiper
            className='home-modal-swiper'
            indicatorColor='#999'
            indicatorActiveColor='#333'
            vertical={false}
            circular
            indicatorDots
          >
            <SwiperItem>
              <View className='home-modal-swiper-1'>
              <AtTag>标签</AtTag>
              <AtTag>标签</AtTag>
              <AtTag>标签</AtTag>
              <AtTag>标签</AtTag>
              </View>
            </SwiperItem>
            <SwiperItem>
              <View className='home-modal-swiper-2'>
                <AtIcon value='clock' size='30' color='#6190e8'></AtIcon>
              </View>
            </SwiperItem>
          </Swiper> */}
          <ScrollView scrollX scrollWithAnimation className='home-modal-swiper'>
            {
              recordType.map((item) => {
                // return(<AtTag circle className="home-modal-swiper-item" active={this.judgeType.bind(this,item._id)} onClick={this.selectType.bind(this,item._id)}>{item.name}</AtTag>)
                return (<AtTag circle className="home-modal-swiper-item" active={this.judgeType(item._id)}
                               onClick={this.selectType.bind(this, item._id)}>{item.name}</AtTag>)
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
