import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Tooltip } from 'antd'
import styles from './Operation.less'

const MAPS = {
  view: {
    icon: '/icons/view.svg',
    title: '详情',
  },
  filter: {
    icon: '/icons/filter.svg',
    title: '过滤',
  },
  ignore: {
    icon: '/icons/ignore.svg',
    title: '忽略',
  },
  edit: {
    icon: '/icons/edit.svg',
    title: '编辑',
  },
  del: {
    icon: '/icons/del.svg',
    title: '删除',
  },
  ['export']: {
    icon: '/icons/export2.png',
    title: '导出',
  },
  statement: {
    icon: '/icons/statement.svg',
    title: '报告',
  },
  generate: {
    icon: '/icons/generate.svg',
    title: '生成',
  },
  detection: {
    icon: '/icons/detection.svg',
    title: '漏洞检测'
  },
  start: {
    icon: '/icons/start.png',
    title: '开始'
  },
  stop: {
    icon: '/icons/stop.png',
    title: '暂停'
  },
  block: {
    icon: '/icons/detection.svg',
    title: '阻断'
  },
  copy: {
    icon: '/icons/copy.png',
    title: '复制'
  },
  identity: {
    icon: '/icons/identity.png',
    title: '身份设置'
  },
  interrupt: {
    icon: '/icons/interrupt2.svg',
    title: '中断'
  },
  changePwd: {
    icon: '/icons/changePwd2.svg',
    title: '修改密码'
  },
  termination: {
    icon: '/icons/termination.png',
    title: '终止'
  },
  again: {
    icon: '/icons/again.png',
    title: '再次扫描'
  },
}

class Index extends PureComponent {
  render() {
    const { data = [], onClick, wrapStyle } = this.props
    return (
      <div className={styles.wrap} style={wrapStyle}>
        {data.map((v) => {
          if (typeof v !== 'object') {
            return {
              ...MAPS[v],
              key: v,
            }
          }
          return {
            ...MAPS[v.key],
            ...v,
          }
        }).map((v) => {
          return (
            <Tooltip title={v.title} key={v.key}>
              <Avatar className="anticon" src={v.icon} onClick={_ => onClick(v.key)} />
            </Tooltip>
          )
        })}
      </div>
    )
  }
}

Index.defaultProps = {
  data: ['view', 'filter', 'ignore'],
  onClick(key) {},
  wrapStyle: {},
}

Index.propsTypes = {
  data: PropTypes.array,
  onClick: PropTypes.func,
  wrapStyle: PropTypes.object,
}

export default Index
