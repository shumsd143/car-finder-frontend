import React from 'react'
import { Card, Spin, Alert } from 'antd';
import '../styles/car-post-main.css'

class AfterSearch extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            load: false,
            data: true
        }
    }
    fetcher = () => {
        fetch('https://car-finder-backend.herokuapp.com/car/status/' + this.props.value)
            .then(res => res.json())
            .then(json => {
                if (json.status === 'not found') {
                    this.setState({
                        load: true,
                        data: false
                    })
                    return
                }
                else {
                    if (json.data.police_assigned === true) {
                        fetch('https://car-finder-backend.herokuapp.com/police/info/' + json.data.police_info).then(resp => resp.json()).then(response => {
                            this.setState({
                                ...json.data,
                                police_name: response.username,
                                police_phone: response['phone-number'],
                                load: true,
                                data: true
                            })
                        })
                    }
                    else {
                        this.setState({
                            ...json.data,
                            load: true,
                            data: true
                        })
                    }
                }
            }
        )
    }
    componentDidMount() {
        this.fetcher()
    }
    render() {
        if (this.state.load === false) {
            return (
                <Spin style={{ marginTop: '10px' }} size="large" />
            )
        }
        if (this.state.data === false && this.state.load === true) {
            return (
                <Alert message="Error" type="error" showIcon />
            )
        }
        return (
            <div className="card-header-css">
                <Card type="inner" title="Car Info">
                    <div className="manage-info">
                        {(this.state.img_url === '') ?
                            <img src="https://www.flinnsci.com/globalassets/flinn-scientific/all-product-images-rgb-jpegs/no_image_available.jpg?width=310" className="set-image" />
                            : <img src={this.state.img_url} className="set-image" />}
                        <div className="right-box">
                            <div className="inline-content" >
                                <span className="title">Model Name: </span>
                                <span>{this.state['Model-Name']}</span>
                            </div>
                            <div className="inline-content">
                                <span className="title">Owner Name: </span>
                                <span> {this.state.name}</span>
                            </div>
                            <div className="inline-content">
                                <span className="title">Owner Phone Number: </span>
                                <span>  {this.state.phone}</span>
                            </div>
                            <div className="inline-content">
                                <span className="title">Assigned Police Name: </span>
                                <span> {(this.state.police_name) ? (this.state.police_name) : 'Not Assigned'}</span>
                            </div>
                            <div className="inline-content">
                                <span className="title">Assigned Police Number: </span>
                                <span> {(this.state.police_phone) ? (this.state.police_phone) : 'Not Assigned'}</span>
                            </div>
                            <div className="inline-content">
                                <span className="title">Status: </span>
                                <span>  {this.state.status}</span>
                            </div>
                            <div className="inline-content">
                                <span className="title">Description: </span>
                                <span>  {this.state.Description}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
export default AfterSearch