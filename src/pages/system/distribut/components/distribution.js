import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TableFinder, Operation } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Modal, Switch } from 'antd'
import styles from '../index.less'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
    render() {
        const { onDeleteItem, onEditItem, onChecked, i18n, ...probeProps } = this.props
        const style = {
            width: '122px',
            height: '42px',
            border: '1px solid #000',
            borderRadius: '4px',
            textAlign:'center',
            margin:'0 auto 4px auto',
            display:'flex',
            flexDirection:'row'
        }
        const childStyle = {
            width: '122px',
            height: '42px',
            border: '1px solid #000',
            borderRadius: '4px',
            textAlign:'center',
            margin:'0 auto 4px auto',
            flex:1
        }
        const data = [{value:'1.1.1.1',label:'本机',children:[{value:'2.2.2.2',label:'分机'},{value:'2.2.2.2',label:'分机'}]}]
        const list = data.map((item,index) => {
            return (
                <div style={style}>
                    <div style={{background:'#008000',color:'#fff',height:'50%'}}>{item.label}</div>
                    <div style={{height:'50%'}}>{item.value}</div>
                    {item.children.length>0?item.children.map((item,index) => {
                        return (
                            <div style={childStyle}>
                                <div style={{background:'#008000',color:'#fff',height:'50%'}}>{item.label}</div>
                                <div style={{height:'50%'}}>{item.value}</div>
                            </div>
                        )
                    }):null}
                </div>
            )
        })
        return (
            <div style={{height:'420px',border:'2px dashed #aaa',background:'#fff'}}>
                {list}
            </div>
        )
    }
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  onChecked: PropTypes.func,
  location: PropTypes.object,
}

export default List
