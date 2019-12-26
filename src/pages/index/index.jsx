import Taro, {Component} from "@tarojs/taro";
import {View, Button, Text, Image} from "@tarojs/components";
import {
  AtTabs,
  AtTabsPane,
  AtActivityIndicator,
  AtButton,
  AtNoticebar
} from "taro-ui";

// import cardBg from "@assets/card.jpg";
import nodata from "@assets/nodata.png";

import {connect} from "@tarojs/redux";

// import { add, minus, asyncAdd } from "../../actions/counter";
import {getWindowHeight} from "../../utils/style";
import Card from "./card";
import RecordModal from "./record-modal";

import "./index.scss";
import {fail} from "assert";

@connect(
  ({counter, login}) => ({
    counter,
    login
  }),
  dispatch => ({
    // add() {
    //   dispatch(add());
    // },
    // dec() {
    //   dispatch(minus());
    // },
    // asyncAdd() {
    //   dispatch(asyncAdd());
    // }
  })
)

class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      loaded: false,
      accountLength: 0,
      isOpened: true,
      isOpened_curtain: true
    };
  }

  config = {
    navigationBarTitleText: "记账"
  };
  // static options = {
  //   addGlobalClass: true
  // }
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  componentDidMount() {
    // Taro.showToast({
    //   title: "测试",
    //   icon: "none",
    //   duration: 2000
    // });
    // wx.authorize({ scope: "scope.userInfo" });
    // wx.checkSession({
    //   success () {
    //     //session_key 未过期，并且在本生命周期一直有效
    //   },
    //   fail () {
    //     // session_key 已经失效，需要重新执行登录流程
    //     wx.login() //重新登录
    //   }
    // })
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting["scope.userInfo"]) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function(res) {
    //           console.log(res.userInfo);
    //         },
    //         fail: function(res) {
    //           console.log(res);
    //           console.log("shibai ");
    //         }
    //       });
    //     } else {
    //       console.log("未授权");
    //     }
    //   }
    // });

    // 登录
    // if (process.env.TARO_ENV === "weapp")
    //   wx.login({
    //     success(res) {
    //       if (res.code) {
    //         //发起网络请求
    //         // wx.request({
    //         //   url: 'https://test.com/onLogin',
    //         //   data: {
    //         //     code: res.code
    //         //   }
    //         // })
    //         console.log(res.code);
    //       } else {
    //         console.log("登录失败！" + res.errMsg);
    //       }
    //     }
    //   });
    // console.log(this.props.login.isLogined);
    // if (!this.props.login.isLogined) {
    //   Taro.navigateTo({
    //     url: "/pages/user-login/index"
    //   });
    // }
    setTimeout(() => {
      this.setState({loaded: true});
    }, 1000);
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  handleClose() {
    // this.setState({
    //   isOpened: !isOpened
    // });
  }

  handleOpen() {
    const {isOpened} = this.state
    this.setState({
      isOpened: !isOpened
    });
    console.log(this.state.isOpened);
  }

  render() {
    const height = getWindowHeight(true, 0.5, -46);
    const {isOpened, isOpened_curtain} = this.state;
    //授权幕布
    // const renderCurtain = () => {
    //   if (process.env.TARO_ENV === "weapp") {
    //     return (
    //       <View>
    //         <AtCurtain
    //           isOpened={isOpened_curtain}
    //           // onClose={this.onClose.bind(this)}
    //         >
    //           <Image style="width:100%;height:250px" src={nodata}/>
    //           <Button plain type='primary'>点击授权</Button>
    //         </AtCurtain>
    //       </View>
    //     );
    //   }
    // };
    // 最近两条记账记录
    const renderAccountList = () => {
      const {accountLength} = this.state;
      if (accountLength === 0) {
        return (
          <View
            className="home-nodata"
            style={{height: height, width: "100%"}}
          >
            <Image style="width:138px;height:125px" src={nodata}></Image>
            <View>
              <Text className="home-nodata-txt">开始记账吧</Text>
            </View>
            <View style="margin:20px 62px;width:60%">
              <AtButton type="primary" className="btn" onClick={this.handleOpen.bind(this)}>
                记一笔
              </AtButton>
            </View>
            {/* <AtButton
              type="primary"
              openType="getUserInfo"
              onGetUserInfo={val => console.log(val)}
              style="display:none"
            >
              点击授权
            </AtButton> */}
          </View>
        );
      }
    };
    // if (!this.state.loaded) {
    //   return (
    //     <AtActivityIndicator
    //       mode="center"
    //       content="加载中..."
    //     ></AtActivityIndicator>
    //   );
    // }
    const tabList = [{title: "本月账单"}, {title: "统计"}];
    return (
      <View className="index">
        {/* {renderCurtain()} */}
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          <AtNoticebar marquee icon='volume-plus' close={true}>
            大碗宽面正在烧制中......
          </AtNoticebar>

          <AtTabsPane current={this.state.current} index={0}>
            {/* 本月账单 */}
            <View style="text-align: center;">
              <View style={{height: height, width: "100%"}}>
                {/* <Image style={{ height: "100%", width: "100%" }} src={cardBg} /> */}
                <Card/>
              </View>
            </View>
            {renderAccountList()}
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            {/* 统计 */}
            <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
              暂无内容
            </View>
          </AtTabsPane>
        </AtTabs>
        <RecordModal
          isOpened={isOpened}
          title=""
          onClose={this.handleClose.bind(this)}
        />
      </View>
    );
  }
}

export default Index;
