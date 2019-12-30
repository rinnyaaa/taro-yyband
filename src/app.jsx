import '@tarojs/async-await'
import Taro, {Component} from '@tarojs/taro'
import {Provider} from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'
import Index from './pages/index'

import configStore from './store'

import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/plan/index',
      'pages/evening/index',
      'pages/my/index',
      'pages/user-login/index',
      'pages/index/setting/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '嘤嘤嘤行',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#666",
      selectedColor: "#6190E8",
      backgroundColor: "#fafafa",
      borderStyle: 'black',
      list: [{
        pagePath: "pages/index/index",
        iconPath: "./assets/tab-bar/home.png",
        selectedIconPath: "./assets/tab-bar/home-active.png",
        text: "记账"
      }, {
        pagePath: "pages/plan/index",
        iconPath: "./assets/tab-bar/plan.png",
        selectedIconPath: "./assets/tab-bar/plan-active.png",
        text: "计划"
      }, {
        pagePath: "pages/evening/index",
        iconPath: "./assets/tab-bar/goodevening.png",
        selectedIconPath: "./assets/tab-bar/goodevening-active.png",
        text: "晚安"
      }, {
        pagePath: "pages/my/index",
        iconPath: "./assets/tab-bar/my.png",
        selectedIconPath: "./assets/tab-bar/my-active.png",
        text: "个人"
      }]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序位置接口的效果展示'
      }
    }
  }

  componentDidMount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidCatchError() {
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index/>
      </Provider>
    )
  }
}

Taro.render(<App/>, document.getElementById('app'))
