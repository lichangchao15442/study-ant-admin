import React from 'react'
import { Dropdown, Menu, Icon, Button } from 'antd'
import PropTypes from 'prop-types'

const DropOption = ({ menuOptions = [], onMenuClick }) => {
  const menu = menuOptions.map(item => (
    <Menu.Item key={item.key}>{item.name}</Menu.Item>
  ))
  return (
    <Dropdown overlay={<Menu onClick={onMenuClick}>{menu}</Menu>}>
      <Button style={{ border: 'none' }}>
        <Icon type="unordered-list" style={{ marginRight: 4 }} />
        <Icon type="down" />
      </Button>
    </Dropdown>
  )
}

DropOption.propTypes = {
  menuOptions: PropTypes.array,
  onMenuClick: PropTypes.func,
}

export default DropOption
