// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import classnames from 'classnames'
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts'
// import styles from './Completed.less'
// import stylesCard from './CardList.less'

// class CustomizedAxisTick extends PureComponent {
//   render() {
//     const {
//       x, y, stroke, payload,
//     } = this.props;
//     console.log(this.props);
//     return (
//       <g transform={`translate(${x},${y})`}>
//         {console.log(this.props)}
//         <text x={0} y={0} dy={8} textAnchor="end" fontSize={10} fill="#42dda9">{payload.value}</text>
//       </g>
//     );
//   }
// }

// function Completed({ data }) {
//   return (
//     <div className={classnames(styles.sales, stylesCard.card)} style={{ padding: '0 20px' }}>
//       <div className={stylesCard.echarts}>
//       <ResponsiveContainer>
//         <AreaChart data={data} margin={{ left: -24 }}>
//           <Legend
//             verticalAlign="top"
//             align="right"
//             wrapperStyle={{
//               paddingTop: 22,
//               paddingBottom: 12,
//               fontSize: 12,
//               color: '#c2c6c2',
//               transform: 'scale(.833333)',
//             }}
//           />
//           <XAxis
//             dataKey="name"
//             axisLine={{ stroke: '#222', strokeWidth: 1 }}
//             tickLine={false}
//             tick={<CustomizedAxisTick />}
//           />
//           <YAxis
//             axisLine={{ stroke: '#222', strokeWidth: 1 }}
//             tickLine={false}
//             tick={<CustomizedAxisTick />}
//           />
//           <CartesianGrid
//             horizontal={true}
//             vertical={true}
//             stroke={'#222'}
//             strokeWidth={1}
//             strokeDasharray="0 0"
//           />
//           <Tooltip
//             contentStyle={{
//               border: 'none',
//               borderRadius: 5,
//               color: '#fff',
//               backgroundColor: 'rgba(50, 50, 50, 0.5)',
//             }}
//           />
//           <Area
//             type="monotone"
//             dataKey="接口号1"
//             stroke={'#0da6a6'}
//             fill={'#0da6a6'}
//             strokeWidth={0}
//             dot={false}
//           />
//           <Area
//             type="monotone"
//             dataKey="接口号2"
//             stroke={'#04c65f'}
//             fill={'#04c65f'}
//             strokeWidth={0}
//             dot={false}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//       </div>
//     </div>
//   )
// }

// export default Completed



import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactEcharts from 'echarts-for-react'
import { Trans, withI18n } from '@lingui/react'
import styles from './CardList.less'
import Completed from './Completed'
// import styles from './Completed.less'

@withI18n()
class CustomizedAxisTick extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  onByModelClick = (e) => {
    // this.props.onFilterChange();
  }
  onClickByModelEvents = {
    'click': this.onByModelClick
  }

  onChangeChart = () => {
    this.props.onFilterChange();
  }

  render() {
    let xData = this.props.traffic_trend.list?this.props.traffic_trend.list.map(v=>v.day):[]
    let yData = this.props.traffic_trend.list?this.props.traffic_trend.list.map(v=>v.num):[]
    const option = {
      color: ['#0da6a6', '#04c65f'],
      tooltip: {
        trigger: 'axis',
        formatter: function (params) {
          return params[0].axisValue + '<br/>' + '流量：' + params[0].value + 'G';
        }
      },
      title: {
        text:'流量趋势',
        x: 'left',
        y: '20px',
        textStyle: {
            fontSize: 17,
            fontWeight: 'normal',
            color: '#42DDA9'          // 主标题文字颜色
        },
      },
      legend: {
        top: 10,
        left:10,
        textStyle: {
          fontSize: 11,
          color: '#0da6a6',
        },
        data:['流量趋势']
      },
      grid: {
        left: '2%',
        bottom: '4%',
        containLabel:true
      },
      xAxis: {
        boundaryGap: false,
        axisLabel: {
          rotate: -45,
          fontSize: 10,
          color: '#42dda9',
        },
        data: xData,
        triggerEvent:true
      },
      yAxis: {
        axisLabel: {
          fontSize: 10,
          color: '#42dda9',
          formatter: function (val) {
            return (val) + 'G';
          }
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
      series: [{
          // name:'流量趋势',
          data: yData,
          type: 'line',
          smooth:true, 
          lineStyle:{
            normal:{
              color:'#0da6a6',
              width:2
            }
          },
          areaStyle: {
            color:'#0da6a6'  
          },
      }]
    };

    return (
    	<div onClick={this.onChangeChart} className={styles.card} style={{ padding: '0 10px 0 20px' }}>
        {/* <p style={{color:'#42DDA9',padding:'20px 0 0 10px',float:'left',fontSize:'16px'}}>流量趋势</p> */}
      	<ReactEcharts onEvents={this.onClickByModelEvents} ref="create_day" option={option} className={styles.echarts} />
      </div>
    )
  }
}

export default CustomizedAxisTick
