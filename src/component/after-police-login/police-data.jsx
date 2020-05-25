import React from 'react'
import { Descriptions } from 'antd';
import '../styles/after-login.css'

class PoliceData extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="arrange-user-data">
                <Descriptions title="User Info">
                    <Descriptions.Item label="UserName">{this.props.data.username}</Descriptions.Item>
                    <Descriptions.Item label="Telephone">{this.props.data['phone-number']}</Descriptions.Item>
                    <Descriptions.Item label="Police-id">{this.props.data.policeid}</Descriptions.Item>
                </Descriptions>
            </div>
        )
    }
}

export default PoliceData