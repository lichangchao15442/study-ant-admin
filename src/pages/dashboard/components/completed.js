import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
} from 'recharts'
import { Color } from 'utils'
import styles from './completed.less'

function Completed({ data }) {
  return (
    <div className={styles.completed}>
      <div className={styles.title}>TEAM TOTAL COMPLETED</div>
      <ResponsiveContainer minHeight={360}>
        <AreaChart data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <Legend
            verticalAlign="top"
            content={props => {
              const { payload } = props

              return (
                <ul className={styles.legend}>
                  {payload.map((entry, index) => (
                    <li key={`item-${index}`}>
                      <span
                        className={styles.dot}
                        style={{ backgroundColor: entry.color }}
                      ></span>
                      {entry.value}
                    </li>
                  ))}
                </ul>
              )
            }}
          />
          <Tooltip
            content={props => {
              const { payload } = props
              const list = payload.map((entry, index) => (
                <li key={`item-${index}`} className={styles.tipItem}>
                  <span
                    className={styles.dot}
                    style={{ backgroundColor: entry.color }}
                  ></span>
                  {entry.name}:{entry.value}
                </li>
              ))

              return (
                <div className={styles.tooltip}>
                  <p className={styles.tipTitle}>{props.label}</p>
                  {payload && <ul>{list}</ul>}
                </div>
              )
            }}
          />
          <Area
            type="monotone"
            dataKey="Task complete"
            stroke={Color.grass}
            strokeWidth={2}
            fill={Color.grass}
            dot={{ fill: '#fff' }}
            activeDot={{ r: 5, fill: '#fff', stroke: Color.green }}
          />
          <Area
            type="monotone"
            dataKey="Cards Complete"
            stroke={Color.sky}
            strokeWidth={2}
            fill={Color.sky}
            dot={{ fill: '#fff' }}
            activeDot={{ r: 5, fill: '#fff', stroke: Color.blue }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

Completed.propTypes = {
  data: PropTypes.array,
}

export default Completed
