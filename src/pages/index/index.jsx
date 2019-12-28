import Taro, { Component } from "@tarojs/taro";
import { View, Button, Text, Image } from "@tarojs/components";

import {
  AtTabs,
  AtTabsPane,
  AtActivityIndicator,
  AtButton,
  AtNoticebar
} from "taro-ui";

import cardBg from "@assets/card.jpg";

import { connect } from "@tarojs/redux";
import { getWindowHeight } from "../../utils/style";
import Card from "./card";
import RecordModal from "./record-modal";
import RecentRecords from "./recent-records";
import "./index.scss";
import { fail } from "assert";

@connect(
  state => state.home,
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
      accountLength: 1,
      isOpened: false,
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

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}
  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true });
    }, 1000);
  }

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  handleClose() {
    this.setState({
      isOpened: false
    });
  }

  handleOpen() {
    this.setState({
      isOpened: true
    });
  }

  render() {
    const height = getWindowHeight(true, 0.5, -46);
    const { isOpened, isOpened_curtain } = this.state;
    const { records } = this.props.recentRecords;
    const renderAccountList = () => {
      const { accountLength } = this.state;
      // if (accountLength === 0) {
      return (
        //Taro的坑！！！！！！！！！！
        // <View className="home-nodata" style={{ height, width: "100%" }}>
        <View className="home-nodata" style={"height:" + height}>
          {/* {records&&records.length === 0 && (
            <View style="text-align:center">
              <Image style="width:138px;height:125px" src={nodata}></Image>
              <View>
                <Text className="home-nodata-txt">开始记账吧</Text>
              </View>
            </View>
          )}
          {(records&&records.length!==0) && (
            <View style="width:90%">
            </View>
          )} */}
          <RecentRecords />

          <View style="margin:20px 62px;width:60%">
            <AtButton
              type="primary"
              className="btn"
              onClick={this.handleOpen.bind(this)}
            >
              记一笔
            </AtButton>
          </View>
        </View>
      );
    };
    // if (!this.state.loaded) {
    //   return (
    //     <AtActivityIndicator
    //       mode="center"
    //       content="加载中..."
    //     ></AtActivityIndicator>
    //   );
    // }
    const tabList = [{ title: "本月账单" }, { title: "统计" }];
    return (
      <View className="index">
        {/* {renderCurtain()} */}
        <AtTabs
          current={this.state.current}
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
        >
          {/* <AtNoticebar marquee icon="volume-plus" close={true}>
            大碗宽面正在烧制中......
          </AtNoticebar> */}

          <AtTabsPane current={this.state.current} index={0}>
            {/* 本月账单 */}
            <View style="text-align: center;">
              <View
                style={{ height: height, width: "100%", position: "relative" }}
              >
                <Image style={{ height: "100%", width: "100%" }} src={cardBg} />
                <Card />
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
