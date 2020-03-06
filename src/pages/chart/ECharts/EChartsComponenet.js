import React from 'react'
import DynamicChart from './DynamicChart'
import SimpleChart from './SimpleChart'
import ChartShowLoading from './ChartShowLoading'
import ChartAPI from './ChartAPI'
import ChartWithEvent from './ChartWithEvent'
import ThemeChart from './ThemeChart'
import MapChart from './MapChart'
import AirportCoord from './AirportCoord'
import Graph from './Graph'
import Calendar from './Calendar'
import Treemap from './Treemap'
import Gauge from './Gauge'
import GCalendar from './GCalendar'
import LunarCalendar from './LunarCalendar'
import Liquidfill from './Liquidfill'
import BubbleGradient from './BubbleGradient'
import TransparentBar3D from './TransparentBar3D'



const EChartsComponent = ({ type }) => {
    if (type === 'simple') return <SimpleChart />
    if (type === 'showLoading') return <ChartShowLoading />
    if (type === 'api') return <ChartAPI />
    if (type === 'withEvent') return <ChartWithEvent />
    if (type === 'theme') return <ThemeChart />
    if (type === 'map') return <MapChart />
    if (type === 'airportCoord') return <AirportCoord />
    if (type === 'graph') return <Graph />
    if (type === 'calendar') return <Calendar />
    if (type === 'treemap') return <Treemap />
    if (type === 'gauge') return <Gauge />
    if (type === 'gCalendar') return <GCalendar />
    if (type === 'lunarCalendar') return <LunarCalendar />
    if (type === 'liquidfill') return <Liquidfill />
    if (type === 'bubbleGradient') return <BubbleGradient />
    if (type === 'transparentBar3D') return <TransparentBar3D />
    return <DynamicChart />
}

export default EChartsComponent