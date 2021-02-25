import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Card } from 'antd'
import CountUp from 'react-countup'
import styles from './NumberCard.less'
import { addLangPrefix } from 'utils'
import Link from 'umi/link'

function NumberCard({ icon, color, title, number, href, countUp }) {
  return (
    <Card
      className={styles.numberCard}
      bordered={true}
      bodyStyle={{ padding: '8px 16px' }}
    >
      <Link style={{color:'#4d4d4d'}} to={addLangPrefix(href)}>
        <div className={styles.inner}>
          <div className={styles.content}>
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
            <p className={styles.title}>{title || 'No Title'}</p>
          </div>
          <div className={styles.iconWarp}>
            <Avatar style={{ width: 48, height: 48 }} src={icon} />
          </div>
        </div>
      </Link>
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
