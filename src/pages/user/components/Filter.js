import React, { Component } from 'react'
import { Form, Input, Icon, Button, Row, Col, Cascader, DatePicker } from 'antd'
import { FilterItem } from 'components'
import { Trans, withI18n } from '@lingui/react'

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
  onAddressChange(value) {
    console.log(value)
  }

  onDateChange(date, dateString) {
    console.log(date, dateString)
  }

  render() {
    const { form, i18n } = this.props
    const { getFieldDecorator } = form
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            children: [
              {
                value: 'xihu',
                label: 'West Lake',
              },
            ],
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
            children: [
              {
                value: 'zhonghuamen',
                label: 'Zhong Hua Men',
              },
            ],
          },
        ],
      },
    ]

    return (
      <Row gutter={24}>
        <Col xl={4} md={8} {...ColProps}>
          {getFieldDecorator('username')(
            <Search
              placeholder={i18n.t`Search Name`}
              onSearch={value => console.log(value)}
            />
          )}
        </Col>
        <Col xl={4} md={8} {...ColProps}>
          {getFieldDecorator('address')(
            <Cascader
              options={options}
              onChange={this.onAddressChange}
              placeholder={i18n.t`Please pick an address`}
            />
          )}
        </Col>
        <Col xl={6} md={8} sm={12} {...ColProps}>
          <FilterItem label={i18n.t`CreateTime`}>
            {getFieldDecorator('date')(
              <RangePicker onChange={this.onDateChange} />
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={10} md={24} sm={24}>
          <Row type="flex" justify="space-between" align="middle">
            <div>
              <Button className="margin-right" type="primary" htmlType="submit">
                <Trans>Search</Trans>
              </Button>
              <Button>
                <Trans>Reset</Trans>
              </Button>
            </div>
            <Button>
              <Trans>Create</Trans>
            </Button>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default Filter
