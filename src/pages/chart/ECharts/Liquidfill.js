import React from 'react'
import ReactEchart from 'echarts-for-react'
require('echarts-liquidfill')

const Liquidfill = () => {
    const option = {
        series: [{
            type: 'liquidFill',
            data: [0.6, 0.5, 0.4, 0.3]
        }]
    };
    return (
        <div>
            <ReactEchart option={option} />
        </div>
    )
}

export default Liquidfill