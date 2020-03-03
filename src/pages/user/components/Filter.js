import React, { Component } from 'react'
import { Form, Input, Button, Row, Col, Cascader, DatePicker } from 'antd'
import { FilterItem } from 'components'
import { Trans, withI18n } from '@lingui/react'
import city from 'utils/city'
import moment from 'moment'
import PropTypes from 'prop-types'

const { Search } = Input
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

@withI18n()
@Form.create()
class Filter extends Component {
  // 处理参数形式
  handleFields = fields => {
    const { createTime } = fields
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ]
    }
    return fields
  }

  handleSubmit = () => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    this.handleFields(fields)
    onFilterChange(fields)
  }

  handleChange = (key, value) => {
    const { form, onFilterChange } = this.props
    const { getFieldsValue } = form

    let fields = getFieldsValue()
    fields[key] = value
    this.handleFields(fields)
    onFilterChange(fields)
  }

  handleReset = () => {
    const { form } = this.props
    const { getFieldsValue, setFieldsValue } = form

    const fields = getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    setFieldsValue(fields)
    this.handleSubmit()
  }

  render() {
    const { form, i18n, onAdd, filter } = this.props
    const { getFieldDecorator } = form
    const { name, address } = filter

    let initialCreateTime = []
    if (filter.createTime && filter.createTime[0]) {
      initialCreateTime[0] = moment(filter.createTime[0])
    }
    if (filter.createTime && filter.createTime[1]) {
      initialCreateTime[1] = moment(filter.createTime[1])
    }

    return (
      <Row gutter={24}>
        <Col xl={4} md={8} {...ColProps}>
          {getFieldDecorator('name', {
            initialValue: name,
          })(
            <Search
              placeholder={i18n.t`Search Name`}
              onSearch={this.handleSubmit}
            />
          )}
        </Col>
        <Col xl={4} md={8} {...ColProps} id="addressCascader">
          {getFieldDecorator('address', {
            initialValue: address,
          })(
            <Cascader
              style={{ width: '100%' }}
              options={city}
              onChange={this.handleChange.bind(this, 'address')}
              placeholder={i18n.t`Please pick an address`}
              getPopupContainer={() =>
                document.getElementById('addressCascader')
              }
            />
          )}
        </Col>
        <Col xl={6} md={8} sm={12} {...ColProps} id="createTimeRangePicker">
          <FilterItem label={i18n.t`CreateTime`}>
            {getFieldDecorator('createTime', {
              initialValue: initialCreateTime,
            })(
              <RangePicker
                onChange={this.handleChange.bind(this, 'createTime')}
                getCalendarContainer={() =>
                  document.getElementById('createTimeRangePicker')
                }
              />
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={10} md={24} sm={24}>
          <Row type="flex" justify="space-between" align="middle">
            <div>
              <Button
                className="margin-right"
                type="primary"
                onClick={this.handleSubmit}
              >
                <Trans>Search</Trans>
              </Button>
              <Button onClick={this.handleReset}>
                <Trans>Reset</Trans>
              </Button>
            </div>
            <Button onClick={onAdd}>
              <Trans>Create</Trans>
            </Button>
          </Row>
        </Col>
      </Row>
    )
  }
}

Filter.propTypes = {
  filter: PropTypes.object,
  onAdd: PropTypes.func,
  onFilterChange: PropTypes.func,
}

export default Filter
