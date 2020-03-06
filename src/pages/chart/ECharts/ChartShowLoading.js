import { PureComponent } from 'react'
import ReactEchart from 'echarts-for-react'

const option = {
  title: {
    text: '基础雷达图',
  },
  tooltip: {},
  legend: {
    data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'],
  },
  grid: {
    top: 40,
  },
  radar: {
    // shape: 'circle',
    name: {
      textStyle: {
        color: '#fff',
        backgroundColor: '#999',
        borderRadius: 3,
        padding: [3, 5],
      },
    },
    indicator: [
      { name: '销售（sales）', max: 6500 },
      { name: '管理（Administration）', max: 16000 },
      { name: '信息技术（Information Techology）', max: 30000 },
      { name: '客服（Customer Support）', max: 38000 },
      { name: '研发（Development）', max: 52000 },
      { name: '市场（Marketing）', max: 25000 },
    ],
  },
  series: [
    {
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: '预算分配（Allocated Budget）',
        },
        {
          value: [5000, 14000, 28000, 31000, 42000, 21000],
          name: '实际开销（Actual Spending）',
        },
      ],
    },
  ],
}

const getLoadingOption = {
  text: '加载中...',
  color: '#4413c2',
  textColor: '#270240',
  maskColor: 'rgba(194, 88, 86, 0.3)',
  zlevel: 0,
}
class ChartShowLoading extends PureComponent {
  constructor(props) {
    super(props)
    this.timer = null
  }

  onChartReady = chart => {
    this.timer = setTimeout(() => {
      chart.hideLoading()
    }, 3000)
  }
  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer)
  }
  render() {
    return (
      <div>
        <ReactEchart
          option={option}
          notMerge={true}
          lazyUpdate={true}
          style={{ width: '100%', height: 400 }}
          loadingOption={getLoadingOption}
          showLoading
          onChartReady={this.onChartReady}
        />
      </div>
    )
  }
}

export default ChartShowLoading
