import { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu, Avatar, Popover, Badge, Icon, List } from 'antd'
import { Ellipsis } from 'ant-design-pro'
import classnames from 'classnames'
import { Icon as LegacyIcon } from '@ant-design/compatible'
import { Trans, withI18n } from '@lingui/react'
import config from 'config'
// import { BellOutlined } from '@ant-design/icons' // 此处引入总是报错（原因未知）
import moment from 'moment'
import { setLocale } from 'utils'
import styles from './Header.less'

const { SubMenu } = Menu

@withI18n()
class Header extends PureComponent {
  handleClickMenu = e => {
    e.key === 'SignOut' && this.props.onSignOut()
  }
  render() {
    const {
      i18n,
      collapsed,
      username,
      avatar,
      notifications,
      fixed,
      onAllNotificationsRead,
      onCollapseChange,
    } = this.props

    const rightContent = [
      <Menu key="user" mode="horizontal" onClick={this.handleClickMenu}>
        <SubMenu
          title={
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <Trans>Hi,</Trans>
              </span>
              <span>{username}</span>
              <Avatar style={{ marginLeft: 8 }} src={avatar} />
            </Fragment>
          }
        >
          <Menu.Item key="SignOut">
            <Trans>Sign out</Trans>
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ]

    if (config.i18n) {
      const { languages } = config.i18n
      const currentLanguage = languages.find(
        item => item.key === i18n._language
      )

      rightContent.unshift(
        <Menu
          key="language"
          mode="horizontal"
          onClick={data => {
            setLocale(data.key)
          }}
        >
          <SubMenu title={<Avatar size="small" src={currentLanguage.flag} />}>
            {languages.map(item => (
              <Menu.Item key={item.key}>
                <Avatar
                  size="small"
                  style={{ marginRight: 8 }}
                  src={item.flag}
                />
                {item.title}
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      )

      rightContent.unshift(
        <Popover
          placement="bottomRight"
          trigger="click"
          key="notifications"
          overlayClassName={styles.notificationPopover}
          getPopupContainer={() => document.querySelector('#primaryLayout')}
          content={
            <div className={styles.notification}>
              <List
                itemLayout="horizontal"
                dataSource={notifications}
                locale={{
                  emptyText: <Trans>You have viewed all notifications.</Trans>,
                }}
                renderItem={item => (
                  <List.Item className={styles.notificationItem}>
                    <List.Item.Meta
                      title={
                        <Ellipsis tooltip lines={1}>
                          {item.title}
                        </Ellipsis>
                      }
                      description={moment(item.date).fromNow()}
                    />
                    <Icon
                      type="right"
                      style={{ fontSize: 10, color: '#ccc' }}
                    />
                  </List.Item>
                )}
              >
                {notifications.length ? (
                  <div
                    className={styles.clearButton}
                    onClick={onAllNotificationsRead}
                  >
                    <Trans>Clear notifications</Trans>
                  </div>
                ) : null}
              </List>
            </div>
          }
        >
          <Badge
            count={notifications.length}
            dot
            offset={[-10, 10]}
            className={styles.iconButton}
          >
            <Icon type="bell" className={styles.iconFont} />
          </Badge>
        </Popover>
      )
    }


    return (
      <Layout.Header
        className={classnames(styles.header, {
          [styles.collapsed]: collapsed,
          [styles.fixed]: fixed,
        })}
      >
        <div
          className={styles.button}
          onClick={onCollapseChange.bind(this, !collapsed)}
        >
          <LegacyIcon
            type={classnames({
              'menu-unfold': collapsed,
              'menu-fold': !collapsed,
            })}
          />
        </div>
        <div className={styles.rightContainer}>{rightContent}</div>
      </Layout.Header>
    )
  }
}

Header.propTypes = {
  fixed: PropTypes.bool,
  user: PropTypes.object,
  menus: PropTypes.array,
  collapsed: PropTypes.bool,
  onSignOut: PropTypes.func,
  notifications: PropTypes.array,
  onAllNotificationsRead: PropTypes.func,
  onCollapseChange: PropTypes.func,
}

export default Header
