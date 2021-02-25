import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import styles from './CardList.less'
import Completed from './Completed'


@withI18n()
class LineChart extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      inactive: [],
    }
  }

  onByModelClick = (e) => {
    this.props.onFilterChange();
  }
  onClickByModelEvents = {
    'click': this.onByModelClick
  }

  onChangeChart = () => {
    this.props.onFilterChange();
  }

  render() {
    let xData = this.props.safety_Trend?this.props.safety_Trend.map(v=>v.day):[]
    let yData = this.props.safety_Trend?this.props.safety_Trend.map(v=>v.low):[]
    // let yDataLow = this.props.safety_Trend?this.props.safety_Trend.map(v=>v.low):[]
    let yDataMiddle = this.props.safety_Trend?this.props.safety_Trend.map(v=>v.middle):[]
    let yDataHigh = this.props.safety_Trend?this.props.safety_Trend.map(v=>v.high):[]
    const option = {
      color: ['#EE5465', '#F5BF5B', '#13B495'],
      tooltip: {
        trigger: 'axis',
      },
      title: {
        text:'威胁趋势',
        x: 'left',
        y: '20px',
        textStyle: {
            fontSize: 17,
            fontWeight: 'normal',
            color: '#42DDA9'          // 主标题文字颜色
        },
      },
      legend: {
        x: 'center',
        y: '22px',
        textStyle: {
          fontSize: 10,
          color: '#42DDA9',
        },
        data:['高危','中危','低危']
      },
      grid: {
        left: 40,
      },
      xAxis: {
        boundaryGap: false,
        axisLabel: {
          rotate: -45,
          fontSize: 10,
          color: '#42dda9',
        },
        // type: 'category',
        data: xData,
        triggerEvent:true
      },
      yAxis: {
          // type: 'value',
          axisLabel: {
            fontSize: 10,
            color: '#42dda9',
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#222'],
            },
          },
          triggerEvent:true
      },
      series: [
        {
          name:'高危',
          data: yDataHigh,
          type: 'line',
        },
        {
          name:'中危',
          data: yDataMiddle,
          type: 'line',
        },
        // {
        //   name:'低危',
        //   data: yDataLow,
        //   type: 'line',
        // },
      ]
    };

    return (
    	<div onDoubleClick={this.onChangeChart} className={styles.card} style={{ padding: '0 10px 0 20px' }}>
        {/* <p style={{color:'#42DDA9',padding:'20px 0 0 10px',float:'left',fontSize:'16px'}}>威胁趋势</p> */}
      	<ReactEcharts onEvents={this.onClickByModelEvents} ref="create_day" option={option} className={styles.echarts} />
      </div>
    )
  }
}

export default LineChart
