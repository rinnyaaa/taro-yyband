import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtButton } from "taro-ui";
import './index.scss'
import { connect } from "@tarojs/redux";
import {dispatchAccount} from "../../../actions/home";

// import GET_ACCOUNT_INFO from "@constants/home"
// import { API_Account_INFO } from '@constants/api'
// import fetch from "@utils/request"
@connect(state => state.home, dispatch => ({
  dispatchAccount() {
    dispatch(dispatchAccount())
  },
}))

export default class Card extends Taro.Component {
  state = {
    // consumption: 100,
    // totalIncome: 100,
    // wage: 6000,
    // budget: 4000,
    // accountName: '我的账本'
  }

  componentDidMount() {
    this.props.dispatchAccount()
  }

  handleSetting() {
    Taro.navigateTo({
      url: '/pages/index/setting/index'
    });
  }

  render() {
    const { budget, totalOut, wage,accountName,totalIn } = this.props.account;
    const budget_percent = Math.floor((totalOut / budget)*10000)/100
    const budgetPercent = (budget_percent<100)?budget_percent:100
    return (
      <View className="main">
        <View style="flex:1">
        </View>
        <View className="home-card">
          {/* <Text> Test </Text> */}
          <View className="home-card-title"><Text className="home-card-title-txt"> {accountName} </Text><View><AtButton className="home-card-title-btn" type="primary" size="small" circle={true} onClick={this.handleSetting}>设置</AtButton></View></View>
          <View className="home-card-divider">
          <View className="home-card-divider-sub" style={{width:budgetPercent+'%'}}>
            </View>
          </View>
          <View className="home-card-info">
            <View className="home-card-l">
              <Text className="home-card-l-total"> {Math.floor((totalOut / budget)*10000)/100}%预算已用 </Text>
              <Text className="home-card-l-txt">总支出</Text>
              <Text className="home-card-l-txt">￥{totalOut}</Text>
            </View>
            <View className="home-card-r">
              <View className="home-card-r-total"> {Math.floor((totalOut / wage)*10000)/100}%工资已用 </View>
              <View className="home-card-r-txt">总收入</View>
              <View className="home-card-r-txt">￥{totalIn}</View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
