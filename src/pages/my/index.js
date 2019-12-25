import Taro from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import {
  AtButton,
  AtAvatar
} from "taro-ui";
import './index.scss'
import { hasLogin} from '@utils/common'

// import { connect } from "@tarojs/redux";

// @connect(
//   ({ login }) => ({
//     login
//   }), dispatch => ({})
// )
export default class Test extends Taro.Component {
  state = {
   isLogined:false,
  }

  config = {
    navigationBarTitleText: '我的'
  };

  componentDidMount() {

    Taro.eventCenter.on('login_success', (res)=>{
      this.setState({
      isLogined: hasLogin()
    })
    })
    this.setState({
      isLogined: hasLogin()
    })
  }

  handleLogin() {
    Taro.navigateTo({
      url: "/pages/user-login/index"
    });
  }

  handleLogOut() {
    Taro.clearStorage({
      success:function() {
        Taro.navigateTo({
          url: "/pages/user-login/index"
        });
      }
    })
  }

  // async judgeLogin () {
  //   const data= await Taro.getStorage({ key: 'token' }).then(res => res.data).catch(() => '')
  //   this.setState({
  //     token: data
  //   })
  // }

  render() {
    const isH5 = process.env.TARO_ENV === 'h5';
    // console.log(hasLogin())
    return (
      <View className="container">
        {/* <Text> 我的 </Text> */}
        <AtAvatar circle openData={{ type: 'userAvatarUrl' }}></AtAvatar>
        {/* <open-data type="userAvatarUrl" ></open-data> */}
        <open-data type="userNickName"></open-data>
        {/* {isH5&&
         <AtButton
              type="primary"
              openType="getUserInfo"
              onGetUserInfo={val => console.log(val)}
            >
              点击授权
            </AtButton>} */}
        {!this.state.isLogined && <AtButton type="primary" onClick={this.handleLogin}> 点击登录</AtButton>}
        {this.state.isLogined && <AtButton type="primary" onClick={this.handleLogOut}> 退出登录</AtButton>}

      </View>
    );
  }
}

