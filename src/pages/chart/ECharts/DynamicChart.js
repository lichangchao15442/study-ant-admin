import { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

class DynamicChart extends Component {
  constructor(props) {
    super(props)
    this.timer = null
    this.count = 11
    const option = {
      title: {
        text: '动态数据',
        subtext: '纯属虚构',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          label: {
            backgroundColor: '#283b56',
          },
        },
      },
      legend: {
        data: ['最新成交价', '预购队列'],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      grid: {
        top: 60,
        left: 30,
        right: 60,
        bottom: 30,
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100,
      },
      visualMap: {
        show: false,
        min: 0,
        max: 1000,
        color: [
          '#BE002F',
          '#F20C00',
          '#F00056',
          '#FF2D51',
          '#FF2121',
          '#FF4C00',
          '#FF7500',
          '#FF8936',
          '#FFA400',
          '#F0C239',
          '#FFF143',
          '#FAFF72',
          '#C9DD22',
          '#AFDD22',
          '#9ED900',
          '#00E500',
          '#0EB83A',
          '#0AA344',
          '#0C8918',
          '#057748',
          '#177CB0',
        ],
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: true,
          data: (function() {
            var now = new Date()
            var res = []
            var len = 50
            while (len--) {
              res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
              now = new Date(now - 2000)
            }
            return res
          })(),
        },
        {
          type: 'category',
          boundaryGap: true,
          data: (function() {
            var res = []
            var len = 50
            while (len--) {
              res.push(50 - len - 1)
            }
            return res
          })(),
        },
      ],
      yAxis: [
        {
          type: 'value',
          scale: true,
          name: '价格',
          max: 50,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
        {
          type: 'value',
          scale: true,
          name: '预购量',
          max: 1200,
          min: 0,
          boundaryGap: [0.2, 0.2],
        },
      ],
      series: [
        {
          name: '预购队列',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: (function() {
            var res = []
            var len = 50
            while (len--) {
              res.push(Math.round(Math.random() * 1000))
            }
            return res
          })(),
        },
        {
          name: '最新成交价',
          type: 'line',
          data: (function() {
            var res = []
            var len = 0
            while (len < 50) {
              res.push((Math.random() * 40 + 5).toFixed(1) - 0)
              len++
            }
            return res
          })(),
        },
      ],
    }
    this.state = {
      option,
    }
  }

  componentDidMount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(() => {
      const { option } = this.state
      var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')

      var data0 = option.series[0].data
      var data1 = option.series[1].data
      data0.shift()
      data0.push(Math.round(Math.random() * 1000))
      data1.shift()
      data1.push((Math.random() * 10 + 5).toFixed(1) - 0)

      option.xAxis[0].data.shift()
      option.xAxis[0].data.push(axisData)
      option.xAxis[1].data.shift()
      option.xAxis[1].data.push(this.count++)
      this.setState(
        {
          option,
        }
      )
    }, 2100)
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  render() {
    return (
      <div>
        <ReactEcharts
          option={this.state.option}
          notMerge={true}
          lazyUpdate={true}
          // onEvents={onEvents}
          style={{ width: '100%', height: '400px' }}
        />
      </div>
    )
  }
}

export default DynamicChart
