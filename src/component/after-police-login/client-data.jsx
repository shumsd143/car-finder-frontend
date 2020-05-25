import React from 'react'
import { Spin,Result,Button,Card } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import Axios from 'axios' 

class ClientData extends React.Component{
    constructor(props){
        super(props)
        this.state={
            load:false,
            nodata:false
        }
    }
    fetcher=()=>{
        fetch('https://car-finder-backend.herokuapp.com/car/detail/'+this.props.id)
        .then(res=>res.json())
        .then(res=>{
            console.log(res)
            if(res){
                this.setState({
                    ...res,
                    load:true,
                    nodata:false
                })
            }
            else{
                this.setState({
                    load:true,
                    nodata:true
                })
            }
        })
        .catch(err=>{
            this.setState({
                load:true,
                nodata:true
            })
        })
    }
    clicker=()=>{
        let body={
            car_id:this.state._id,
            police_id:this.state.police_info,
        }
        Axios.post('https://car-finder-backend.herokuapp.com/car/found',body).then(res=>{
            window.location.reload()
        })
    }
    componentDidMount=()=>{
        if(this.props.id===''){
            this.setState({
                load:true,
                nodata:true
            })
        }
        else{
            this.fetcher()
        }
    }
    render(){
        if (this.state.load === false) {
            return (
                <div style={{ marginTop: '20px' }}>
                    <Spin size="large" />
                </div>
            )
        }
        else if (this.state.load === true && this.state.nodata===true) {
            return (
                <Result
                    icon={<SmileOutlined />}
                    title="No task assigned"
                    extra={<Button type="primary" href="/" onClick={()=>{sessionStorage.removeItem('user_id_car_finder')}}>Log Out</Button>}
                />
            )
        }
        else{
            return (
                <div className="card-header-css">
                    <Card type="inner" title={<Button type="primary" onClick={this.clicker}>Found</Button>}>
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
}

export default ClientData