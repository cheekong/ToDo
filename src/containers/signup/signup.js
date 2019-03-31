import React, { Component } from 'react';

import Form from '../../components/form/form';
import * as api from '../../utilities/api';
import './signup.css';

class Signup extends Component {

    state = {
        email: '',
        password: '',
        confirmPassword: '',
        loading: false
    }

    validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    validatePassword(password, confirmPassword){
        if(password === confirmPassword){
            return true;
        }
        return false;
    }

    handleOnChange(event, field){
        let targetField = null;
        if(field === 1) {
            targetField = 'email';
        } else if (field === 2 ){
            targetField = 'password';
        } else if (field === 3) {
            targetField = 'confirmPassword';
        }
        
        let newState = {...this.state};
        newState[targetField] = event.target.value;
        this.setState(newState);
    }

    handleSubmit(){
        let isValidEmail = this.validateEmail(this.state.email);
        let isValidPassword = this.validatePassword(this.state.password, this.state.confirmPassword);

        if(isValidEmail && isValidPassword){
            api.checkExists(this.state.email)
            .then(res => {
console.log('res',res);
            })
            .catch(err => {
console.log('err',err);
            });
            /*
            api.createAccount(this.state.email, this.state.password)
            .then(res => {
                console.log('res',res);
            })
            .catch(err => {
                console.log('err',err);
            })
            */
        } else if (!isValidEmail){
            alert('invalid email');
        } else if (!isValidPassword){
            alert('invalid password');
        } else {
            alert('unknown error');
        }
    }

    render(){
        console.log('this.props', this.props);
        console.log('this.state', this.state);

        const buttons = [
            <input className='cta--forward' type='button' value="Sign me up" onClick={() => this.handleSubmit()}/>,
            <input className='cta--forward' type='button' value="Already have an account" onClick={() => this.handleSubmit()}/>
        ]
        return (
            <div id='signup'>
                <Form
                    title="Don't have an account? Quick easy signup!"
                    buttons={buttons}
                >
                    <ul>
                        <li><input type='email' placeholder='Email' value={this.state.email} onChange={(event) => this.handleOnChange(event, 1)}/></li>
                        <li><input type='password' placeholder='Password' value={this.state.password} onChange={(event) => this.handleOnChange(event, 2)}/></li>
                        <li><input type='password' placeholder='Confirm password' value={this.state.confirmPassword} onChange={(event) => this.handleOnChange(event, 3)}/></li>
                    </ul>
                </Form>
            </div>
        )
    }

}

export default Signup;