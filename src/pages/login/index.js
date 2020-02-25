import React, { PureComponent, Fragment } from 'react'
import config from 'config'
import styles from './index.less'
import { Form } from '@ant-design/compatible'
import '@ant-design/compatible/assets/index.css'
import { Input, Row, Button } from 'antd'
import { withI18n, Trans } from '@lingui/react'
import { GlobalFooter } from 'ant-design-pro'
import { setLocale } from 'utils'
import { connect } from 'dva'
import PropTypes from 'prop-types'

const FormItem = Form.Item

@withI18n()
@Form.create()
@connect(({ loading }) => ({ loading }))
class Login extends PureComponent {
  handleOk = () => {
    const { form, dispatch } = this.props
    const { validateFieldsAndScroll } = form
    validateFieldsAndScroll((errors, values) => {
      if (errors) return
      dispatch({ type: 'login/login', payload: values })
    })
  }
  render() {
    const { form, i18n } = this.props
    const { getFieldDecorator } = form

    let footerLinks = []
    if (config.i18n) {
      footerLinks = footerLinks.concat(
        config.i18n.languages.map(item => ({
          key: item.key,
          title: (
            <span onClick={setLocale.bind(null, item.key)}>{item.title}</span>
          ),
        }))
      )
    }
    return (
      <Fragment>
        <div className={styles.form}>
          <div className={styles.logo}>
            <img src={config.logoPath} alt="logo" />
            <span>{config.siteName}</span>
          </div>
          <form>
            <FormItem hasFeedback>
              {getFieldDecorator('username', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder={i18n.t`Username`}
                  onPressEnter={this.handleOk}
                />
              )}
            </FormItem>
            <FormItem hasFeedback>
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(
                <Input
                  type="password"
                  placeholder={i18n.t`Password`}
                  onPressEnter={this.handleOk}
                />
              )}
            </FormItem>
            <Row>
              <Button type="primary" onClick={this.handleOk}>
                <Trans>Sign in</Trans>
              </Button>
            </Row>
          </form>
        </div>
        <div className={styles.footer}>
          <GlobalFooter links={footerLinks} copyright={config.copyright} />
        </div>
      </Fragment>
    )
  }
}

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Login
