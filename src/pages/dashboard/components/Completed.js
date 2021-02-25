import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import styles from './Completed.less'

import echarts from 'echarts'

class CustomizedAxisTick extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  onByModelClick = (e) => {
    this.props.getChart();
  }
  onClickByModelEvents = {
    'click': this.onByModelClick
  }

  onChangeChart = () => {
    this.props.getChart();
  }

  render() {
    let xData = this.props.data?this.props.data.map(v=>v.name):[];
    let yLowData = this.props.data?this.props.data.map(v=>((v.低危/1000))):[];
    let yMiddleData = this.props.data?this.props.data.map(v=>v.中危):[];
    let yHighData = this.props.data?this.props.data.map(v=>v.高危):[];

    const option = {
      color: ['#13B495', '#F5BF5B', '#EE5465'],
      tooltip: {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
          let arr = []
          for(let i in params){
            arr.push('<span style="display: inline-block;width: 10px;height: 10px;background: ' +params[i].color +';margin-right: 5px;border-radius: 50%;}"></span>'+params[i].seriesName+'：' + ((params[i].value>0&&params[i].seriesName=='低危')?(params[i].value + 'K'):params[i].value) + '<br/>')
          }
          return params[0].axisValue + '<br/>' + arr.toString().replace(/,/g,'')
          // return params[0].axisValue + '<br/>' + '<i style="display: inline-block;width: 10px;height: 10px;background: ' +params[0].color +';margin-right: 5px;border-radius: 50%;}"></i>低危：' + (params[0].value>0?(params[0].value + 'K'):params[0].value) + '<br/><i style="display: inline-block;width: 10px;height: 10px;background: ' +params[1].color +';margin-right: 5px;border-radius: 50%;}"></i>中危：' + params[1].value + '<br/><i style="display: inline-block;width: 10px;height: 10px;background: ' +params[2].color +';margin-right: 5px;border-radius: 50%;}"></i>高危：' + params[2].value;
        },
      },
      legend: {
        top: 10,
        left:'center',
        // selectedMode:true,
        selected:{
          '低危':false,
          '中危':true,
          '高危':true,
        },
        textStyle: {
          fontSize: 11,
          color: '#aaa',
        },
        data:['低危','中危','高危']
      },
      xAxis: {
        // boundaryGap: false,
        axisLabel: {
          rotate: -45,
          fontSize: 10,
          color: '#aaa',
          interval:0
        },
        axisTick: {
          show: false
        },
        data: xData,
        triggerEvent:true
      },
      yAxis: {
        axisLabel: {
          fontSize: 10,
          color: '#aaa',
          formatter: function (val) {
            return (val);
          }
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#222'],
          },
        },
        triggerEvent:true
      },
      series: [
        {
          name:'低危',
          data: yLowData,
          type: 'line',
          smooth:true, 
          lineStyle:{
            normal:{
              color:'#13B495',
              width:0
            }
          },
          symbol:'circle',
          symbolSize:1,
          areaStyle: {normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0.4, color: '#13B495'},
                  {offset: 1, color: '#fff'}
              ]
            )
          }},
        },
        {
          name:'中危',
          data: yMiddleData,
          type: 'line',
          smooth:true, 
          lineStyle:{
            normal:{
              color:'#F5BF5B',
              width:0
            }
          },
          symbol:'circle',
          symbolSize:1,
          areaStyle: {normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0.4, color: '#F5BF5B'},
                  {offset: 1, color: '#fff'}
              ]
            )
          }},
        },
        {
          name:'高危',
          data: yHighData,
          type: 'line',
          smooth:true, 
          lineStyle:{
            normal:{
              color:'#EE5465',
              width:0
            }
          },
          symbol:'circle',
          symbolSize:1,
          areaStyle: {normal: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                  {offset: 0.4, color: '#EE5465'},
                  {offset: 1, color: '#fff'}
              ]
            )
          }},
        },
      ]
    };

    return (
    	<div onDoubleClick={this.onChangeChart} className={styles.card} style={{ padding: '0 10px 0 20px' }}>
        {/* <p style={{color:'#42DDA9',padding:'20px 0 0 10px',float:'left',fontSize:'16px'}}>流量趋势</p> */}
      	<ReactEcharts onEvents={this.onClickByModelEvents} ref="create_day" option={option} className={styles.echarts} />
      </div>
    )
  }
}
export default CustomizedAxisTick
