import Taro from '@tarojs/taro';
import { View, Text, } from '@tarojs/components';
import { AtList, AtListItem, AtNavBar, AtInput, AtButton } from "taro-ui";
import PopUp from '@components/float-modal/index'
import { connect } from "@tarojs/redux";
import { dispatchAccount } from "../../../actions/home";
import fetch from "@utils/request";
import { API_Account_INFO } from '@constants/api'
import './index.scss'

@connect(state => state.home, dispatch => ({
  dispatchAccount() {
    dispatch(dispatchAccount())
  },
}))
export default class Setting extends Taro.Component {
  state = {
    isOpened: false,
    val: '',
    title: '',
  }

  // static defaultProps = {

  // };

  config = {
    navigationBarTitleText: "设置"
  };

  componentDidMount() {
    this.props.dispatchAccount()
  }

  handleClick() {
    console.log('click')
  }

  handleBack() {
    Taro.navigateTo({
      url: '/pages/index/index'
    });
  }

  //订阅消息
  handleSwitch() {
    wx.requestSubscribeMessage({
      tmplIds: ['qbgzVkDC8b1Btpj3UPPujIVOE1wqAVsjb7gckUCpJBk'],
      success: (res) => { console.log(res) },
      fail: (res) => (console.log(res))
    })
  }

  changeAccountName() {
    this.setState({
      title: '修改账本名字',
      isOpened: true
    })
  }

  changeBudget() {
    this.setState({
      title: '修改预算',
      isOpened: true
    })
  }

  changeWage() {
    this.setState({
      title: '修改月收入',
      isOpened: true
    })
  }

  handleInputComfirm() {
    let type = ''
    switch (this.state.title) {
      case '修改账本名字': {
        this.setState({
          accountName: this.state.val
        });
        this.handleComfirmAccountInfo({ accountName: this.state.val })
      } break;
      case '修改预算':
        this.setState({
          budget: this.state.val
        });
        this.handleComfirmAccountInfo({ budget: Number(this.state.val) })
        break;
      case '修改月收入':
        this.setState({
          wage: this.state.val
        });
        this.handleComfirmAccountInfo({ wage: Number(this.state.val) })
        break;
      default: break;
    }
    this.setState({
      isOpened: false,
      val:''
    })
    // Taro.showToast({
    //   title: '修改成功'
    // })

  }

  handleComfirmAccountInfo(payload) {
    // const payload = {accountName:"我的"}
    fetch({ url: API_Account_INFO, method: 'POST', showToast: true, payload }).then(res => {
      // if (res) {
      console.log(res + '1111')
      this.props.dispatchAccount()
      Taro.showToast({
        title: '修改成功',
        icon: 'none'
      })
      // } else {
      // }
    });
  }

  changeVal(value) {
    this.setState({
      val: value
    })
  }
  render() {
    const isWx = process.env.TARO_ENV === 'weapp';
    const { isOpened, title, val } = this.state
    const { budget, accountName, wage } = this.props.account;

    const type = title.substring(2, title.length)
    return (
      <View>
        {/* Todo */}
        {!isWx && <AtNavBar
          onClickLeftIcon={this.handleBack}
          color='#6190E8'
          // title='设置'
          leftText='返回'
          leftIconType='chevron-left'
        // rightFirstIconType='bullet-list'
        // rightSecondIconType='user'
        />}
        <AtList>
          <AtListItem title='账本名字' arrow='right' iconInfo={{
            size:
              25, color: '#78A4FA', value: 'star-2',
          }} onClick={this.changeAccountName.bind(this)} extraText={accountName} />
          <AtListItem title='预算' arrow='right' iconInfo={{
            size:
              25, color: '#78A4FA', value: 'star-2',
          }} onClick={this.changeBudget.bind(this)} extraText={'￥' + budget} />
          <AtListItem title='本月收入' arrow='right' iconInfo={{
            size:
              25, color: '#78A4FA', value: 'star-2',
          }} onClick={this.changeWage.bind(this)} extraText={'￥' + wage} />
          {/* <AtListItem title='日推送结算' arrow='right' onClick={this.handleClick} /> */}
          {isWx && <AtListItem title='日结算推送' arrow='right' onClick={this.handleSwitch} extraText='未订阅' />}

        </AtList>
        <PopUp isOpened={isOpened} title={title}>
          <AtInput
            name={type}
            title={type}
            type={type === '账本名字' ? 'text' : 'number'}
            placeholder={`请输入您的${type}`}
            value={val}
            onChange={this.changeVal.bind(this)}
          />
          <AtButton type="primary" onClick={this.handleInputComfirm.bind(this)}>确定</AtButton>
        </PopUp>
      </View>
    );
  }
}
