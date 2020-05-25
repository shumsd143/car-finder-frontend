import React from 'react'
import { Spin, Result, Button } from 'antd';
import ClientData from './client-data';
import PoliceData from './police-data';

class AfterLogin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            load: false,
            show_error: false
        }
    }
    fetcher = (id) => {
        fetch('http://localhost:4000/police/info/' + id).then(res => res.json()).then(res => {
            this.setState({
                ...res,
                load: true,
                show_error: false
            })
        }).catch(err => {
            this.setState({
                load: true,
                show_error: true
            })
        })
    }
    componentDidMount = () => {
        let session_value = sessionStorage.getItem('user_id_car_finder')
        if (session_value) {
            this.fetcher(session_value)
        }
        else {
            this.setState({
                load: true,
                show_error: true
            })
        }
    }
    render() {
        if (this.state.load === false) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <Spin size="large" />
                </div>
            )
        }
        if (this.state.load === true && this.state.show_error === true) {
            return (
                <Result
                    status="403"
                    title="403"
                    subTitle="Something Went Wrong"
                    extra={<Button type="primary" href="/police/login" onClick={() => { sessionStorage.removeItem('user_id_car_finder') }}>Back Home</Button>}
                />
            )
        }
        return (
            <div style={{marginTop:'20px'}}>
                <Button type="dashed" href="/police/login" onClick={() => { sessionStorage.removeItem('user_id_car_finder') }}>Logout</Button>
                <PoliceData data={this.state} />
                <ClientData id={this.state.task_assigned} />
            </div>
        )
    }
}
export default AfterLogin