import React, { Component } from 'react';
import './Dashboard.css';
import { callApi, getSession, setSession } from './Api'
import Menubar from './Menubar';
import FeedbackList from './FeedbackList';
import JobSearch from './Job Search';
import Profile from './Profile';

class Dashboard extends Component {
    constructor(props)
    {
        super(props);
        this.state = {fullName : "", activeComponents : ""};
        this.showFullName = this.showFullName.bind(this);
        this.logOut = this.logOut.bind(this);
        this.loadComponents = this.loadComponents.bind(this);
    }

    componentDidMount()
    {
        let csr = getSession("csrid");
        if(csr === "")
            {
              this.logOut;
            }
        
        var data = JSON.stringify({csrid : csr});
        callApi("POST", "http://localhost:8080/user/getfullname", data, this.showFullName);
    }
    showFullName(response)
    {
        this.setState({fullName : response});
    }
    logOut()
    {
       setSession("csrid", "", -1);
       window.location.replace("/");
    }

    loadComponents(mid){
        let component = {
            "1" : <FeedbackList></FeedbackList>,
            "2" : <JobSearch></JobSearch>,
            "3" : <Profile></Profile>
        };
        this.setState({activeComponents : component[mid]});
    }
    

    render() {
        const {fullName, activeComponents} = this.state;
          return (
            <div className='dashboard'>
                <div className='header'>
                    <img className='headerLogo' src="/logo.png" alt="" />
                    <div className='headerTitle'><span>FeedBack</span>Management</div>
                    <img className='signOutLogo' src='/logout.png' alt='' onClick={this.logOut} ></img>
                    <label className='userFullName'>{fullName}</label>
                </div>
                <div className='menu'><Menubar onMenuClick={this.loadComponents}></Menubar> </div>
                <div className='outlet'>{activeComponents}</div>

                
                
            </div>
        );
    }
}

export default Dashboard;