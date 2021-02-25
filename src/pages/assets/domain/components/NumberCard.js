import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card } from 'antd'
import CountUp from 'react-countup'
import styles from './NumberCard.less'

function NumberCard({ icon, color, title, number, href, countUp }) {
  return (
    <Card
      className={styles.numberCard}
      bordered={true}
      bodyStyle={{ padding: '8px 16px' }}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.title}>{title || 'No Title'}</p>
          <p className={styles.number} style={{ color }}>
            <CountUp
              start={0}
              end={number}
              duration={2.75}
              useEasing
              useGrouping
              {...(countUp || {})}
            />
          </p>
        </div>
      </div>
    </Card>
  )
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  countUp: PropTypes.object,
}

export default NumberCard
