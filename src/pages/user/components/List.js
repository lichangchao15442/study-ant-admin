import { PureComponent } from 'react'
import { Table } from 'antd'

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
    },
];


class List extends PureComponent {



    render() {
        const { rowSelection, data } = this.props

        return (
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        )
    }
}

export default List