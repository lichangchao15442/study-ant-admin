import { PureComponent } from 'react'
import { Page } from 'components'
import { connect } from 'dva'
import styles from './index.less'

@connect(({ userDetail }) => ({ userDetail }))
class UserDetail extends PureComponent {
    render() {
        const { userDetail } = this.props
        const { data } = userDetail

        const content = []
        for (let key in data) {
            if ({}.hasOwnProperty.call(data, key)) {
                content.push(
                    <div key={key} className={styles.item}>
                        <div>{key}</div>
                        <div>{String(data[key])}</div>
                    </div>
                )
            }
        }
        return (
            <Page inner>
                <div className={styles.content}>{content}</div>
            </Page>
        )
    }
}

export default UserDetail