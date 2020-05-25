import React from 'react'
import { Form, Input, Button,Alert } from 'antd';
import { PhoneOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/police-main.css'
import Axios from 'axios'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            show_error:false
        }
    }
    onFinish=(val)=>{
        this.setState({
            show_error:false
        })
        Axios.post('https://car-finder-backend.herokuapp.com/police/login',val).then(res=>{
            sessionStorage.setItem('user_id_car_finder',res.data.data)
            window.location.assign('/police/after_login')
        }).catch((err)=>{
            this.setState({
                show_error:true
            })
        })
    }
    render() {
        return (
            <div className="login-adjust">
                <Form name="normal_login" className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                >
                    <Form.Item  name="phone" type="number"
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
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                {(this.state.show_error===true)?<Alert type="error" message="Wrong number or password" banner />:<div/>}
            </div>
        )
    }
}
export default Login