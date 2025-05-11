import React, { Component } from 'react';
import './Menubar.css';
import { callApi, getSession } from './Api';
class Menubar extends Component {
    constructor()
    {
        super();
        this.state = {menuItems : []};
        this.loadMenus = this.loadMenus.bind(this);
    }
    componentDidMount()
    {
        let csr = getSession("csrid");
        var data = JSON.stringify({csrid : csr});
        callApi("POST", "http://localhost:8080/menus/getmenusbyrole", data, this.loadMenus); 
    }
    loadMenus(response)
    {
        var data = JSON.parse(response);
        this.setState({menuItems : data});
    } 
    render() {
        const {menuItems} = this.state;
        return (
            <div className='menubar'>
                <div className='menuheader'>MENU  <img src="menu.png" alt="" /> </div>
                <div className='menulist'>
                    <ul>
                    {menuItems.map((row)=>(
                        <li onClick={()=>this.props.onMenuClick(row.mid)}>{row.menu} <img src={row.icon} alt="" /></li>
                    ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Menubar;
