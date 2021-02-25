import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'

class ModalTable extends PureComponent {
  state = {
    clientWidth: document.body.clientWidth,
  }

  componentDidMount(){
    window.addEventListener('resize', this.resizeListener)
    this.resizeListener()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener)
  }

  resizeListener = () => {
    this.setState({ clientWidth: document.body.clientWidth })
  }


  render() {
    const { style, maxWidth, ...modalTableProps } = this.props
    
    const divStyle = {
      maxWidth: maxWidth || '1.28125rem',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      margin: '0 auto',
    }

    let columns = modalTableProps.columns.map((v) => ({ ...v, fixed: false, width: v.width }))
    columns = columns.map((v) => {
      return {
        ...v,
        render(text, record, index) {
          return <div style={{ ...divStyle, maxWidth: v.maxWidth || divStyle.maxWidth }}>{v.render ? v.render(text, record, index) : text}</div>
        },
      }
    })

    return (
        <Table
          style={style}
          simple
          bordered
          size="middle"
          rowKey={record => record.id}
          {...modalTableProps}
          columns={columns}
          // scroll={{ x: scrollX }}
        />
    )
  }
}

export default ModalTable
