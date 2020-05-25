import React from 'react';
import 'antd/dist/antd.css'
import {Form,Input,Button,PageHeader,Divider, Spin,Alert} from 'antd';
import '../styles/car-post-main.css'
import Axios from 'axios';
const { TextArea } = Input;

class CarPostMain extends React.Component{
    constructor(props){
        super(props)
        this.state={
            imageload:false,
            imagevalue:'',
            posting_loader:false,
            post_error:false
        }
    }
    imager=(e)=>{
        this.setState({
            imageload:true,
            imagevalue:e.target.files,
            error:''
        })
    }
    submitted_data=(val,image)=>{
        let data={
            ...val,
            status:'not found',
            police_assigned:false,
            police_info:'',
            img_url:image
        }
        Axios.post('http://localhost:4000/info',data).then(res=>{
            this.setState({
                posting_loader:false
            })
            console.log('responded')
            if(res.status!==200){
                this.setState({post_error:true})
            }
            else{
                window.location.assign('/')
            }
        })
    }
    onFinish=(val)=>{
        if(this.state.posting_loader===true){
            return
        }
        this.setState({
            post_error:false,
            posting_loader:true
        })
        if(this.state.imageload===true){
            const data= new FormData();
            data.append('image',this.state.imagevalue[0])
            Axios.post('http://localhost:4000/upload',data,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }).then(res=>{
                if(res.data.status===false){
                    this.setState({post_error:true})
                }  
                else{
                    this.submitted_data(val,res.data.url)
                }
            })
        }
        else{
            this.submitted_data(val,'')
        }
    }
    render(){
        return (
            <div className="form-head">
                <h1>Fill in the Form</h1>
                <PageHeader className="site-page-header" onBack={() => window.location.assign('/')} subTitle="Go back"/>
                <Divider>Owner's Detail</Divider>
                <Form
                    name="register"
                    onFinish={this.onFinish}
                    scrollToFirstError
                >
                    <Form.Item name="name" label="Name" rules={[
                        {
                            required: true,
                            message: 'Please input your Name!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone Number"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your phone number!',
                        },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Divider>Car Detail</Divider>
                    <Form.Item name="Model-Name" label="Model-Name" rules={[{required: true,message: 'Please input your Car Model Name!',},]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Car-Registration" label="Car-Registration" rules={[{required: true,message: 'Please input your Car Registration Id!',},]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="Car-Number" label="Car-Number" rules={[{required: true,message: 'Please input your Car Number!',},]}>
                        <Input />
                    </Form.Item>
                    <Divider>General Detail</Divider>
                    <Form.Item name="Description" label="Description" rules={[{required: true,message: 'Please provide some description!',},]}>
                        <TextArea
                            /* value={value}
                            onChange={this.onChange} */
                            placeholder="Describe your Car e.g.-: color,appearance"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <div className="fileUpload btn btn-secondary">
                            <span>Upload a Car Image</span>
                            <input type="file" className="upload" onChange={this.imager} accept="image/*"/>
                        </div>
                        {(this.state.imageload===false)?<div></div>:<img className="imageresize" src={URL.createObjectURL(this.state.imagevalue[0])}/>}
                    </Form.Item>
                    {(this.state.posting_loader===true)?<Spin/>:<div></div>}
                    {(this.state.post_error===true)?<Alert style={{marginBottom:'10px'}} type="error" message="Error while posting data" banner />:<div></div>}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default CarPostMain