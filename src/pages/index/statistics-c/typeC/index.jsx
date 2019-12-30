import Taro from '@tarojs/taro';
import {View, Text,} from '@tarojs/components';
import {AtList, AtListItem, AtNavBar, AtIcon, AtInput, AtButton, AtProgress} from "taro-ui";
import PopUp from '@components/float-modal/index'
import {Echart} from 'echarts12'
import './index.scss'

export default class Setting extends Taro.Component {

  static defaultProps = {
    type: 'week',
  };

  state = {
    val: '',
    totalBudget: 1500,
  }

  componentDidMount() {
    // console.log(this.props.type)
  }

  render() {
    let total = 1000, count = 2
    let {title, totalBudget} = this.state
    const data = {
      week: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      month: ['12-01', '12-03', '12-05', '12-07', '12-08', '12-10', '12-12', '12-14', '12-16', '12-18', '12-20', '12-22', '12-24', '12-26', '12-28',
        '12-30'],
      year: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    }
    // 图标数据
    let option = {
      title: {
        show: true,
        text: '支出金额（元）'
      },
      xAxis: {
        type: 'category',
        nameRotate: '180',
        data: data[this.props.type],
        axisPointer: {
          show: true,
          snap: true,
        }
      },
      yAxis: {
        type: 'value',
        num: '0',
        axisPointer: {
          show: true,
          snap: true,
        }
      },
      series: [{
        data: [14, 22, 33, 15, 13.7, 18.21, 5.1, 14, 22, 33, 15, 13.7, 18.21, 5.1, 14, 22, 33, 15, 13.7, 18.21, 5.1, 14, 22, 33, 15, 13.7, 18.21, 5.1],
        type: 'line',
        smooth: true
      }]
    };
    let rankingRes = [
      {
        icon: '图',
        category: '电影',
        Proportion: '1.23',
        outlay: '354.00',
      },
      {
        icon: '图',
        category: '美食',
        Proportion: '1.23',
        outlay: '200.00',
      },
      {
        icon: '图',
        category: '外卖',
        Proportion: '23.13',
        outlay: '231.00',
      },
      {
        icon: '图',
        category: '出行',
        Proportion: '50.22',
        outlay: '723.00',
      },
    ]
    return (
      <View>
        {/*top*/}
        <View>
          <View>总支出 {total}</View>
          <Text>平均值 {total / count}</Text>
        </View>
        <View style={'background:black;height:2px'}></View>
        {/*图标数据*/}
        <Echart option={option}/>
        {/*支出排行榜*/}
        <View className='fz-b-24 mar-l-20'>支出排行榜</View>
        <View style='font-size:.8rem'>
          {/*icon靠左， 类型和百分比左靠中  金额靠右*/}
          {
            rankingRes.map(e => {
              //比例数值
              let _tmp = ((Number.parseFloat(e.outlay) / totalBudget) * 100).toFixed(2)
              // 0 25 50 75 100 分四阶段
              let stage = '';
              if (_tmp >= 0 && _tmp < 25){stage='rgba(75, 220, 79, 0.48)'}
              if (_tmp >= 25 && _tmp < 50){stage='blue'}
              if (_tmp >= 50 && _tmp < 75){stage='yellow'}
              if (_tmp >= 75 && _tmp <= 100){stage='red'}
                return (
                  <View className='margin-lr-16 mar-top-20 padding-all-10 border-bottom-grap'>
                    <View className='acea-row row-between fz-c-grap'>
                      <View className='acea-row'>
                        <View style='height:37px;width:37px'>{e.icon}</View>
                        <View>{e.category}</View>
                      </View>
                      <View>
                        <View style='width:65px'>{_tmp}%</View>
                      </View>
                      <View style=''>{e.outlay}</View>
                    </View>
                    <AtProgress className='m-progress' percent={_tmp} status='progress' color={stage} isHidePercent/>
                  </View>
                )
            })
          }
        </View>

      </View>
    );
  }
}
