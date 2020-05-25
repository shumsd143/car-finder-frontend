import React from 'react'
import { Form, Input, Button,Alert,Spin } from 'antd';
import { PhoneOutlined, LockOutlined,UserOutlined,IdcardOutlined } from '@ant-design/icons';
import '../styles/police-main.css'
import Axios from 'axios'

class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            show_error:false,
            load:false
        }
    }
    onFinish=(val)=>{
        let data={
            ...val,
            task_assigned:'',
        }
        if(this.state.load===true){
            return
        }
        this.setState({load:true})
        Axios.post('http://localhost:4000/police/signup',data).then(res=>{
            if(res.status!==200){
                this.setState({show_error:true,load:false})
            }
            else{
                this.setState({load:false})
                window.location.reload()
            }
        })
    }
    render() {
        return (
            <div className="signup-adjust">
                <Form name="normal_login" className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item  name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Name!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="username" />
                    </Form.Item>
                    <Form.Item  name="policeid"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Police Id!',
                            },
                        ]}
                    >
                        <Input prefix={<IdcardOutlined className="site-form-item-icon" />} placeholder="Police Id" />
                    </Form.Item>
                    <Form.Item  name="phone-number" type="number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Number!',
                            },
                        ]}
                    >
                        <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    {(this.state.load===true)?<Spin/>:<div></div>}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
                {(this.state.show_error===true)?<Alert type="error" message="Error while posting data" banner />:<div/>}
            </div>
        )
    }
}
export default Signup