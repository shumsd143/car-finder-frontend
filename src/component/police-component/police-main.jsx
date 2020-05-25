import React from 'react'
import '../styles/police-main.css'
import Login from './login'
import Signup from './signup'
import { Tabs,PageHeader } from 'antd';

const { TabPane } = Tabs;


class PoliceMain extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loginform: true,
        }
    }
    tablogin = () => {
        this.setState({
            loginform: true
        })
    }
    tabsign = () => {
        this.setState({
            loginform: false
        })
    }
    render() {
        return (
            <div className="tabs-head">
                <PageHeader className="site-page-header" onBack={() => window.location.assign('/')} subTitle="Home-page"/>
                <Tabs type="card">
                    <TabPane tab="Login" key="1">
                        <Login/>
                    </TabPane>
                    <TabPane tab="Register" key="2">
                        <Signup/>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
export default PoliceMain