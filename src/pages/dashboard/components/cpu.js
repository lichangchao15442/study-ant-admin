import React from 'react'
import PropTypes from 'prop-types'
import CountUp from 'react-countup'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  YAxis,
  Line,
} from 'recharts'
import { Color } from 'utils'
import styles from './cpu.less'

const countUpProp = {
  start: 0,
  duration: 2.75,
  useEasing: true,
  useGrouping: true,
  separator: ', ',
}

function Cpu({ usage = 0, space = 0, cpu = 0, data }) {
  return (
    <div className={styles.cpu}>
      <div className={styles.number}>
        <div className={styles.item}>
          <p>usage</p>
          <p>
            <CountUp end={usage} suffix="GB" {...countUpProp} />
          </p>
        </div>
        <div className={styles.item}>
          <p>space</p>
          <p>
            <CountUp end={space} suffix="GB" {...countUpProp} />
          </p>
        </div>
        <div className={styles.item}>
          <p>cpu</p>
          <p>
            <CountUp end={cpu} suffix="%" {...countUpProp} />
          </p>
        </div>
      </div>
      <ResponsiveContainer minHeight={300}>
        <LineChart data={data} margin={{ left: -38 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <YAxis axisLine={false} tickLine={false} />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke={Color.blue}
            fill={Color.blue}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

Cpu.propTypes = {
  usage: PropTypes.number,
  space: PropTypes.number,
  cpu: PropTypes.number,
  data: PropTypes.array,
}

export default Cpu
