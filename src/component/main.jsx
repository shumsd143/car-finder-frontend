import React from 'react'
import { Navbar,Button } from 'react-bootstrap'  
import './styles/main.css'
import { Link } from 'react-router-dom'
import AfterSearch from './user-component/after-search'

class Main extends React.Component{
    constructor(props){
        super(props)
        this.state={
            search_value:'',
            sent_value:''            
        }
    }
    changer=(e)=>{
        this.setState({
            search_value:e.target.value
        })
    }
    submitter=(e)=>{
        e.preventDefault()
        this.setState({
            sent_value:''
        })
        this.setState({
            sent_value:this.state.search_value
        })
    }
    render(){
        return (
            <div>
                <div className="outer-region">
                    <Navbar>
                        <Navbar.Brand style={{color:'white'}}>Car-Finder</Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="justify-content-end">
                            <Link to="/police/login"><Button variant="outline-success"> Login as a police officer </Button></Link>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="body">
                        <Link to="/user/post"><Button variant="outline-secondary">Report a Case</Button></Link>
                        <h1>Find Status of Car</h1>
                        <div className="input-outer">
                            <input className="input-inner" onChange={this.changer} placeholder="Type Car Number"/>
                        </div>  
                        <div className="search-button"><Button variant="outline-primary" onClick={this.submitter}>Search</Button></div>  
                    </div>
                </div>
                {(this.state.sent_value.length>0)?<AfterSearch value={this.state.sent_value} key={this.state.sent_value}/>:<div/>}
            </div>
        )
    }
}

export default Main