import React, { Component } from 'react';
import './App.css';
import { callApi, setSession } from './Api.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            captcha: '',
            captchaInput: ''
        };
        this.userRegistration = this.userRegistration.bind(this);
        this.signIn = this.signIn.bind(this);
        this.handleCaptchaChange = this.handleCaptchaChange.bind(this);
    }

    componentDidMount() {
        this.generateCaptcha();
    }

    generateCaptcha() {
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let captcha = "";
        for (let i = 0; i < 5; i++) {
            captcha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.setState({ captcha });
    }

    handleCaptchaChange(e) {
        this.setState({ captchaInput: e.target.value });
    }

    showSignin = () => {
        document.getElementById("popup").style.display = "block";
        document.getElementById("signup").style.display = "none";
        document.getElementById("signin").style.display = "block";
        document.getElementById("popupHeader").innerHTML = "Log In";
        this.generateCaptcha();
    }

    closeSignin = (event) => {
        if (event.target.id === "popup") {
            document.getElementById("popup").style.display = "none";
        }
    }

    showSignup = () => {
        document.getElementById("signin").style.display = "none";
        document.getElementById("signup").style.display = "block";
        document.getElementById("popupHeader").innerHTML = "Create New Account";
    }

    userRegistration() {
        let fullName = document.getElementById("fullName");
        let email = document.getElementById("email");
        let role = document.getElementById("role");
        let signuppassword = document.getElementById("signUppassword");
        let conformPassword = document.getElementById("confirmPassword");

        if (fullName.value === "") { fullName.focus(); return; }
        if (email.value === "") { email.focus(); return; }
        if (role.value == 0) { role.focus(); return; }
        if (signuppassword.value === "") { signuppassword.focus(); return; }

        if (signuppassword.value !== conformPassword.value) {
            signuppassword.style.border = "1px solid red";
            signuppassword.focus();
            alert("Password and conform password should be same");
            return;
        }

        const data = JSON.stringify({
            fullname: fullName.value,
            email: email.value,
            role: role.value,
            password: signuppassword.value
        });

        callApi("POST", "http://localhost:8080/user/insert", data, this.getResponse);
    }

    getResponse(res) {
        alert(res);
    }

    signIn() {
        const username = document.getElementById("username");
        const password = document.getElementById("password");
        const div1 = document.getElementById("div1");

        username.style.border = "";
        password.style.border = "";
        div1.innerHTML = "";

        if (username.value === "") {
            username.style.border = "1px solid red";
            username.focus();
            return;
        }
        if (password.value === "") {
            password.style.border = "1px solid red";
            password.focus();
            return;
        }

        if (this.state.captchaInput.toUpperCase() !== this.state.captcha) {
            div1.innerHTML = "Invalid CAPTCHA";
            this.generateCaptcha();
            this.setState({ captchaInput: '' });
            return;
        }

        const data = JSON.stringify({
            email: username.value,
            password: password.value
        });

        callApi("POST", "http://localhost:8080/user/signin", data, this.getSigninRes);
    }

    getSigninRes(res) {
        const resData = res.split("::");
        if (resData[0] === "200") {
            setSession("csrid", resData[1], 1);
            window.location.replace("/dashboard");
        } else {
            document.getElementById("div1").innerHTML = resData[1];
        }
    }

    render() {
        return (
            <div id='container'>
                <div id='popup' onClick={this.closeSignin}>
                    <div id='popupWindow'>
                        <div id='popupHeader'>Log In</div>
                        <div id='signin'>
                            <label className='usernameLabel'>User Name*</label>
                            <input id='username' type='text' />
                            <label className='passwordLabel'>Password*</label>
                            <input id='password' type='password' />
                            <label className='captchaLabel'>Enter CAPTCHA*</label>
                            <div id='captchaBox'>{this.state.captcha}</div>
                            <input id='captchaInput' type='text' value={this.state.captchaInput} onChange={this.handleCaptchaChange} />
                            <div id='forgotPassword'>Forgot <span>Password?</span></div>
                            <button id='signinButton' onClick={this.signIn}>Sign In</button>
                            <div id='div1'></div>
                            <div id='div2'>Don't have an account? <span onClick={this.showSignup}>SIGN UP NOW</span></div>
                        </div>

                        <div id='signup'>
                            <label id='fullNameLabel'>Full Name</label>
                            <input id='fullName' type='text' />
                            <label id='emailLabel'>Email</label>
                            <input id='email' type='text' />
                            <label id='roleLabel'>Select Role</label>
                            <select id='role'>
                                <option value="0"></option>
                                <option value="1">Admin</option>
                                <option value="2">Customer</option>
                            </select>
                            <label id='passwordLabel'>Password</label>
                            <input id='signUppassword' type='password' />
                            <label id='confirmLabel'>Conform Password</label>
                            <input id='confirmPassword' type='password' />
                            <button id='signupButton' onClick={this.userRegistration}>Register</button>
                            <div id='div3'>Already have an account? <span onClick={this.showSignin}>Login In</span></div>
                        </div>
                    </div>
                </div>

                <div id='header'>
                    <img className='headerLogo' src="/logo.png" alt="" />
                    <div className='headerTitle'><span>FeedBack</span> Management</div>
                    <img className='signinLogo' src='/user.png' onClick={this.showSignin} alt="" />
                    <div className='signinText' onClick={this.showSignin}>Sign In</div>
                </div>

                <div id='content'>
                    <div className='text1'>INDIA'S BEST FEEDBACK SERVICES</div>
                    <div className='text2'>Your Voice Matters. Help us grow by Sharing your Experiences</div>
                    <div className='text3'>Every comment is reviewed and appreciated</div>
                    <div id='searchBar'>
                        <input id='searchText' type='text' placeholder='Search by Rating' />
                        <input id='searchLocation' type='text' placeholder='Search by Location' />
                        <button id='searchButton'>Search categories</button>
                    </div>
                </div>

                <div id='footer'>
                    <div className='copyrightText'>Copyright @2025 All rights reserved</div>
                    <img className='socialmediaIcon' src="facebook.png" alt="" />
                    <img className='socialmediaIcon' src="twitter.png" alt="" />
                    <img className='socialmediaIcon' src="linkedin.png" alt="" />
                </div>
            </div>
        );
    }
}

export default App;
