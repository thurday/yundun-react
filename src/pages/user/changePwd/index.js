import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import PwdCenter from './components/PwdCenter'
import md5 from 'md5'
import store from 'store'
@withI18n()
@connect(({ pwdCenter, loading }) => ({ pwdCenter, loading }))
class Index extends PureComponent {

  get userInfo() {
    const { dispatch,pwdCenter,loading,i18n } = this.props
    const { listUser } = pwdCenter

    return {
      loading: loading.effects['pwdCenter/query'],
      item: listUser,
      onUserInfoChange: value => {
        const username = store.get('user').username
        const userId = store.get('user').userId
        dispatch({
          type:'pwdCenter/update',
          payload:{
            userId:userId,
            username:username,
            oldPassword:md5(value.oldPassword),
            password:md5(value.password),

          }
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <PwdCenter {...this.userInfo} />
      </Page>
    )
  }
}

Index.propTypes = {
  PwdCenter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
