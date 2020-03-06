import { PureComponent } from 'react'
import { Page } from 'components'
import { Radio } from 'antd'
import EChartsComponent from './EChartsComponenet'
import styles from './index.less'

const radioOptions = [
  {
    label: 'SimpleChart',
    value: 'simple',
  },
  {
    label: 'ChartShowLoading',
    value: 'showLoading',
  },
  {
    label: 'ChartAPI',
    value: 'api',
  },
  {
    label: 'ChartWithEvent',
    value: 'withEvent',
  },
  {
    label: 'ThemeChart',
    value: 'theme',
  },
  {
    label: 'DynamicChart',
    value: 'dynamic',
  },
  {
    label: 'MapChart',
    value: 'map',
  },
  {
    label: 'AirportCoord',
    value: 'airportCoord',
  },
  {
    label: 'Graph',
    value: 'graph',
  },
  {
    label: 'Calendar',
    value: 'calendar',
  },
  {
    label: 'Treemap',
    value: 'treemap',
  },
  {
    label: 'Gauge',
    value: 'gauge',
  },
  {
    label: 'GCalendar',
    value: 'gCalendar',
  },
  {
    label: 'LunarCalendar',
    value: 'lunarCalendar',
  },
  {
    label: 'Liquidfill',
    value: 'liquidfill',
  },
  {
    label: 'BubbleGradient',
    value: 'bubbleGradient',
  },
  {
    label: 'TransparentBar3D',
    value: 'transparentBar3D',
  },
]

class ECharts extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      type: null,
    }
  }

  onChange = e => {
    this.setState({
      type: e.target.value,
    })
  }

  render() {
    return (
      <Page inner>
        <Radio.Group
          onChange={this.onChange}
          defaultValue="dynamic"
          options={radioOptions}
        />
        <EChartsComponent type={this.state.type} />
      </Page>
    )
  }
}

export default ECharts
