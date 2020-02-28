import React, { PureComponent } from 'react'
import { Page } from 'components'
import { Row, Col, Card } from 'antd'
import { connect } from 'dva'
import {
  NumberCard,
  Sales,
  Weather,
  Quote,
  RecentSales,
  Comments,
  Completed,
  Browser,
  Cpu,
  User,
} from './components'
import { ScrollBar } from 'components'
import { Color } from 'utils'
import store from 'store'
import styles from './index.less'

const bodyStyle = {
  bodyStyle: {
    height: 432,
    background: '#fff',
  },
}

@connect(({ app, dashboard, loading }) => ({ dashboard, loading }))
class Dashboard extends PureComponent {
  render() {
    const { dashboard, loading } = this.props
    const {
      numbers,
      sales,
      weather,
      quote,
      recentSales,
      comments,
      completed,
      browser,
      cpu,
      user,
    } = dashboard
    const userDetail = store.get('user')
    const { username, avatar } = userDetail

    const numberCards = numbers.map((item, key) => (
      <Col key={key} lg={6} md={12}>
        <NumberCard {...item} />
      </Col>
    ))
    return (
      <Page className={styles.dashboard}>
        <Row gutter={24}>
          {numberCards}
          <Col lg={18} md={24}>
            <Card
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              {sales.length !== 0 && <Sales data={sales} />}
            </Card>
          </Col>
          <Col lg={6} md={24}>
            <Row gutter={24}>
              <Col lg={24} md={12}>
                <Card
                  className={styles.weather}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.blue,
                  }}
                >
                  <Weather
                    {...weather}
                    loading={loading.effects['dashboard/queryWeather']}
                  />
                </Card>
              </Col>
              <Col lg={24} md={12}>
                <Card
                  className={styles.quote}
                  bodyStyle={{
                    padding: 0,
                    height: 204,
                    background: Color.peach,
                  }}
                >
                  <ScrollBar>
                    <Quote {...quote} />
                  </ScrollBar>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={24}>
            <Card {...bodyStyle}>
              <RecentSales data={recentSales} />
            </Card>
          </Col>
          <Col lg={12} md={24}>
            <Card {...bodyStyle}>
              <ScrollBar>
                <Comments data={comments} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={24} md={24}>
            <Card
              bodyStyle={{
                padding: '24px 36px 24px 0',
              }}
            >
              <Completed data={completed} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card {...bodyStyle}>
              <Browser data={browser} />
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card {...bodyStyle}>
              <ScrollBar>
                <Cpu {...cpu} />
              </ScrollBar>
            </Card>
          </Col>
          <Col lg={8} md={24}>
            <Card bodyStyle={{ ...bodyStyle, padding: 0 }}>
              <User {...user} username={username} avatar={avatar} />
            </Card>
          </Col>
        </Row>
      </Page>
    )
  }
}

export default Dashboard
