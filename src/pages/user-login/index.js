import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtForm, AtInput, AtButton } from 'taro-ui'

// import { connect } from "@tarojs/redux";
// import { login, logout } from "../../actions/login";

import fetch from "../../utils/request";
import { API_USER_LOGIN } from '@constants/api'

import './index.scss'
// @connect(
//   ({ login }) => ({
//     login
//   }),
//   dispatch => ({
//     login() {
//       dispatch(login())
//     },
//     logout() {
//       dispatch(logout())
//     },
//   })
// )

export default class Login extends Taro.Component {
  constructor() {
    super(...arguments)
    this.state = {
      email: '',
      password: ''
    }
  }
  // static options = {
  //   addGlobalClass: true
  // }
  handleChangeEmail(value) {
    this.setState({
      email: value
    })
  }
  handleChangePwd(value) {
    this.setState({
      password: value
    })
  }
  onSubmit(event) {
    console.log(event)
  }
  onReset(event) {
    console.log(event)
  }
  toast() {
    console.log('1234')
    Taro.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }

  login() {
    const { email, password } = this.state
    const payload = { email, password }
    if(!email) {
      Taro.showToast({
        title: '请输入邮箱',
        icon: 'none'
      }).then(console.log('没输邮箱'))
      return
    }
    if(!password) {
      Taro.showToast({
        title: '请输入密码',
        icon: 'none'
      }).then()
      return
    }
    fetch({ url: API_USER_LOGIN, method: 'POST', showToast: true, payload }).then(res => {
      if (res) {
        // this.props.login();
        Taro.eventCenter.trigger('login_success')
        Taro.showToast({
          title: '登陆成功',
          icon: 'none'
        }).then(function () {
          Taro.navigateBack({ })
        })
        // Taro.navigateBack({ })
      } else {
        // this.setState({ loaded: true, login: false });
      }
    });

  }

  render() {
    return (
      <View className="container">
        <View className="login-form">
          <View style="text-align:center"><Image style="width:200px;height:200px" src='http://www.zard1991.cn:8080/image/yyy/logo.jpg'></Image></View>
          <AtForm
            onSubmit={this.onSubmit.bind(this)}
            onReset={this.onReset.bind(this)}
          >
            <AtInput
              name='usernmae'
              title='用户名'
              type='text'
              placeholder='邮箱'
              value={this.state.email}
              onChange={this.handleChangeEmail.bind(this)}
            />
            <AtInput
              name='pwd'
              title='密码'
              type='password'
              placeholder='密码需要由字母数字组成'
              value={this.state.password}
              onChange={this.handleChangePwd.bind(this)}
            />

          </AtForm>
          <View style="margin-top:20px" >
              <AtButton type="primary" onClick={this.login.bind(this)}>登录</AtButton>
            </View>
            <View className="login-redirect">
              <View onClick={this.toast}>注册账号</View>
              <View onClick={this.toast}>忘记密码</View>
            </View>
        </View>
      </View>
    )
  }
}
