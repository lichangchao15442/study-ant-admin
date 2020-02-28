import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'
import { Color } from 'utils'
import classnames from 'classnames'
import styles from './sales.less'

function Sales({ data }) {
  return (
    <div className={styles.sales}>
      <div className={styles.title}>Yearly Sales</div>
      <ResponsiveContainer minHeight={360}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke={Color.borderBase}
          />
          <XAxis
            dataKey="name"
            // axisLine={{ stroke: Color.borderBase, strokeWidth: 1 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip
            wrapperStyle={{
              border: 'none',
              boxShadow: '4px 4px 40px rgba(0,0,0,0.05)',
            }}
            content={props => {
              const { payload } = props
              const list = payload.map((item, key) => (
                <li key={key} className={styles.tipItem}>
                  <span
                    className={styles.radiusdot}
                    style={{ background: item.color }}
                  ></span>
                  {`${item.name}:${item.value}`}
                </li>
              ))

              return (
                <div className={styles.tooltip}>
                  <p className={styles.tiptitle}>{props.label}</p>
                  {payload && <ul>{list}</ul>}
                </div>
              )
            }}
          />
          <Legend
            verticalAlign="top"
            content={props => {
              const { payload } = props

              return (
                <ul
                  className={classnames({
                    [styles.legend]: true,
                    clearfix: true,
                  })}
                >
                  {payload.map((entry, index) => (
                    <li key={`item-${index}`}>
                      <span
                        className={styles.radiusdot}
                        style={{ background: entry.color }}
                      ></span>
                      {entry.value}
                    </li>
                  ))}
                </ul>
              )
            }}
          />
          <Line
            type="monotone"
            dataKey="Clothes"
            stroke={Color.red}
            dot={{ fill: Color.red }}
            strokeWidth={3}
            activeDot={{ strokeWidth: 0, r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Food"
            stroke={Color.purple}
            dot={{ fill: Color.purple }}
            strokeWidth={3}
            activeDot={{ strokeWidth: 0, r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="Electronics"
            stroke={Color.green}
            dot={{ fill: Color.green }}
            strokeWidth={3}
            activeDot={{ strokeWidth: 0, r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Sales
