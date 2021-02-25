import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import Usercenter from './components/Usercenter'
import md5 from 'md5'
@withI18n()
@connect(({ userCenter, loading }) => ({ userCenter, loading }))
class Index extends PureComponent {

  get userInfo() {
    const { dispatch,userCenter,loading,i18n } = this.props
    const { listUser } = userCenter
    return {
      loading: loading.effects['userCenter/query'],
      item: listUser,
      onUserInfoChange: value => {
        dispatch({
          type:'userCenter/update',
          payload:{
            userId:value.id,
            username:value.username,
            name:value.name,
            mobile:value.mobile,
            email:value.email,
            // province:value.province,
            // city:value.city,
            // district:value.district,
            // password:md5(value.password)
          }
        })
      },
    }
  }

  render() {
    return (
      <Page inner>
        <Usercenter {...this.userInfo} />
      </Page>
    )
  }
}

Index.propTypes = {
  Usercenter: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default Index
