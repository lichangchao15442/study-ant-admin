import { PureComponent } from 'react'
import { Page } from 'components'
import {
  Row,
  Col,
  List,
  Input,
  Select,
  Button,
  Tag,
  Form,
  Checkbox,
  Icon,
} from 'antd'
import api from '@/services/api'
import { apiPrefix } from 'utils/config'
import classnames from 'classnames'
import request from 'utils/request'
import { Trans } from '@lingui/react'
import styles from './index.less'

const InputGroup = Input.Group
const { Option } = Select

const methods = ['POST', 'GET', 'PUT', 'PATCH', 'DELETE']

const methodTagColor = {
  GET: 'green',
  POST: 'orange',
  DELETE: 'red',
  PUT: 'geekblue',
}

const requests = Object.values(api).map(item => {
  let method = 'GET'
  let url = apiPrefix + item
  let itemArray = item.split(' ')
  if (itemArray.length === 2) {
    method = itemArray[0]
    url = apiPrefix + itemArray[1]
  }
  return {
    method,
    url,
  }
})

let uuid = 2

@Form.create()
class RequestPage extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      method: 'GET',
      url: '/api/v1/routes',
      visible: true,
      result: null,
      keys: [1],
    }
  }
  handleListItemClick = record => {
    this.setState({
      method: record.method,
      url: record.url,
      result: null,
      keys: [uuid++], //用于切换接口时重新渲染params，若keys不变则切换接口时会出现params输入框中内容不变的现象
    })
  }

  handleSelectChange = method => {
    this.setState({
      method,
    })
  }

  handleInputChange = e => {
    this.setState({
      url: e.target.value,
    })
  }

  handleVisible = () => {
    const { visible } = this.state
    this.setState({
      visible: !visible,
    })
  }

  sendRequest = () => {
    const { method, url } = this.state

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const param = {}
        if (values.key) {
          values.key.map((item, index) => {
            if (item && values.check[index]) {
              param[item] = values.value[index]
            }
          })
        }

        request({
          method,
          url,
          data: param,
        }).then(data => {
          this.setState({
            result: JSON.stringify(data),
          })
        })
      }
    })
  }

  addParam = () => {
    const { keys } = this.state
    const nextKeys = keys.concat(uuid++)
    this.setState({
      keys: nextKeys,
    })
  }

  removeParam = key => {
    const { keys } = this.state
    this.setState({
      keys: keys.filter(item => item !== key),
    })
  }
  render() {
    const { method, url, visible, result, keys } = this.state
    const { form } = this.props
    const { getFieldDecorator } = form

    return (
      <Page inner>
        <Row gutter={24}>
          <Col lg={8} md={24}>
            <List
              size="large"
              bordered={false}
              dataSource={requests}
              className={styles.list}
              renderItem={item => (
                <List.Item
                  className={classnames(styles.listItem, {
                    [styles.isItemActive]:
                      item.method === method && item.url === url,
                  })}
                  onClick={this.handleListItemClick.bind(this, item)}
                >
                  <Tag color={methodTagColor[item.method]}>{item.method}</Tag>
                  <span>{item.url}</span>
                </List.Item>
              )}
            />
          </Col>
          <Col lg={16} md={24}>
            <Row
              type="flex"
              justify="space-between"
              style={{ marginBottom: 10 }}
            >
              <InputGroup compact size="large" style={{ flex: 1 }}>
                <Select
                  size="large"
                  value={method}
                  style={{ width: 100 }}
                  onChange={this.handleSelectChange}
                >
                  {methods.map(item => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
                <Input
                  style={{ width: 'calc(100% - 200px)' }}
                  value={url}
                  onChange={this.handleInputChange}
                />
                <Button size="large" onClick={this.handleVisible}>
                  <Trans>Params</Trans>
                </Button>
              </InputGroup>
              <Button
                type="primary"
                size="large"
                onClick={this.sendRequest}
                style={{ width: 100 }}
              >
                <Trans>Send</Trans>
              </Button>
            </Row>
            <div
              className={classnames(styles.paramsBlock, {
                [styles.hideParam]: !visible,
              })}
            >
              {keys.map(key => (
                <Row
                  gutter={8}
                  type="flex"
                  justify="start"
                  align="middle"
                  key={key}
                >
                  <Col style={{ marginTop: 8 }}>
                    {getFieldDecorator(`check[${key}]`, {
                      initialValue: true,
                    })(<Checkbox defaultChecked></Checkbox>)}
                  </Col>
                  <Col style={{ marginTop: 8 }}>
                    {getFieldDecorator(`key[${key}]`)(
                      <Input placeholder="key" />
                    )}
                  </Col>
                  <Col style={{ marginTop: 8 }}>
                    {getFieldDecorator(`value[${key}]`)(
                      <Input placeholder="value" />
                    )}
                  </Col>
                  <Col style={{ marginTop: 8 }}>
                    <Icon
                      type="close"
                      style={{ cursor: 'pointer' }}
                      onClick={this.removeParam.bind(this, key)}
                    />
                  </Col>
                </Row>
              ))}
              <Row style={{ marginTop: 8 }}>
                <Button onClick={this.addParam}>
                  <Trans>Add Param</Trans>
                </Button>
              </Row>
            </div>
            <div className={styles.result}>{result}</div>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default RequestPage
