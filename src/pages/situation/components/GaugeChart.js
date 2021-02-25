import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import classnames from 'classnames'
import { Trans, withI18n } from '@lingui/react'
import styles from './CardList.less'

@withI18n()
class GaugeChart extends PureComponent {
  componentWillMount() {
    if (document.getElementById('linear_pic')) return
    const image = document.createElement('img')
    image.id = 'linear_pic'
    image.style.display = 'none'
    image.src = 'linear_pic.svg'
    document.body.appendChild(image)
  }

  render() {
    const { score } = this.props;
    const option = {
    //   title: {
    //     textStyle:{
    //       color: '#42dda9',
    //       fontSize: 12,
    //     },
    //     left: 'right',
    //     text: '威胁评分',
    // },
    tooltip: {

      formatter: "威胁评分 : {c}"

  },
      series: [{
        type: 'gauge',
        min: 0,
        max: 100,
        splitNumber: 1,
        radius: '70%',
        axisLine: { // 坐标轴线
          show: false,
          lineStyle: {
            opacity: 0,
          },
        },
        axisLabel: { // 坐标轴小标记
          show: false,
        },
        axisTick: { // 坐标轴小标记
          show: true,
          length: 20,
          splitNumber: 17,
          lineStyle: {
            // color: '#2cb56d',
            color: {
              image: document.getElementById('linear_pic'),
              repeat: 'no-repeat'
            },
            width: 2,
          },
        },
        pointer: {
          length: '60%',
          width: 6,
        },
        itemStyle: {
          color: '#d8673a',
        },
        splitLine: { show: false },
        detail: {
          show: true,
          formatter: [
            '{a|0~33}{a|34~66}67~100',
            '{b|低危}{b|中危}{b|高危}'
          ].join('\n'),
          textStyle: {
            color: '#42dda9',
            fontSize: 12,
            lineHeight: 15,
            align: 'left',
          },
          rich: {
            a: {
              color: '#42dda9',
              fontSize: 12,
              lineHeight: 15,
              align: 'center',
              padding: [0, 10, 0, 0],
            },
            b: {
              color: '#42dda9',
              fontSize: 12,
              lineHeight: 15,
              align: 'center',
              padding: [0, 14, 0, 10],
            },
          },
          padding: [100, 0, 0, 0],
        },
        data: [{
          value: score || 0,
          name: ''
        }],
      }]
    }

    return (
    	<div className={styles.card} style={{ padding: '0 10px' }}>
        <p style={{color:'#42DDA9',padding:'20px 0 0 10px',float:'left',fontSize:'16px'}}>风险等级</p>
      	<ReactEcharts ref="alert" option={option} className={classnames(styles.echarts, styles.gaugeChart)} />
        <div className={styles.low}>低</div>
        <div className={styles.middle}>中</div>
        <div className={styles.high}>高</div>
      </div>
    )
  }
}

export default GaugeChart
