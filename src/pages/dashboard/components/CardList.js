import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Card, Spin, Row, Col } from 'antd'
import { Trans, withI18n } from '@lingui/react'
import ReactEcharts from 'echarts-for-react'
import { Progress } from 'components'
import styles from './CardList.less'

const fontSize = document.documentElement.clientWidth > 1280 ? 10 : 7

@withI18n()
class CardList extends PureComponent {

  getIpList = (value) => {
    const { onShowIpList } = this.props
    onShowIpList(value)
  }

  render() {
    const { source = [], target = [] } = this.props

    return (
      <Spin spinning={this.props.loading}>
        <Row gutter={10}>
          {/* <Col xl={8} md={6} sm={12}>
            <Card style={{ marginBottom: 30 }} bodyStyle={{ padding: 0 }}>
              <div className={styles.title} style={{ position: 'absolute', marginTop: 24, marginLeft: 20, borderWidth: 0 }}>最高流量<span className={styles.text}>TOP5</span></div>
              <ReactEcharts ref="histogram" option={histogram} className={styles.echarts} />
            </Card>
          </Col> */}
          <Col xl={12} md={12} sm={12}>
            <Card style={{ marginBottom: 30 }} bodyStyle={{ padding: '24px 0' }}>
              <div className={styles.wrap}>
                <div className={styles.item}>
                  <div className={styles.title}>事件源地址<span className={styles.text}>TOP5</span></div>
                  <div className={styles.body}>
                    {source.map((v, i) => {
                      return <Progress  showModal={true} ref="child" getIpList={this.getIpList} key={i} {...v} />
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xl={12} md={12} sm={12}>
            <Card style={{ marginBottom: 30 }} bodyStyle={{ padding: '24px 0' }}>
              <div className={styles.wrap}>
                <div className={styles.item}>
                  <div className={styles.title}>事件目标地址<span className={styles.text}>TOP5</span></div>
                  <div className={styles.body}>
                    {target.map((v, i) => {
                      return <Progress  showModal={true} ref="child" getIpList={this.getIpList} key={i} {...v} />
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    )
  }
}

CardList.propTypes = {
  location: PropTypes.object,
  onShowIpList: PropTypes.func,
}

export default CardList
