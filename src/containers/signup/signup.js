import React, { Component } from 'react';

import Form from '../../components/form/form';
import Input from '../../components/input/Input';
import Button from '../../components/Button/Button';
import * as api from '../../utilities/api';

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

    handleRedirect(){
        this.props.history.push('/login');
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
        } else if (!isValidEmail){
            alert('invalid email');
        } else if (!isValidPassword){
            alert('invalid password');
        } else {
            alert('unknown error');
        }
    }

    render(){
        const buttons = [
            <Button primary={true} type='button' label="Sign me up" onClick={() => this.handleSubmit()}/>,
            <Button  primary={true} type='button' label="Login" onClick={() => this.handleRedirect()}/>
        ]
        return (
            <Form
                title="Don't have an account? Quick easy signup!"
                buttons={buttons}
            >
                <Input 
                    type='email' 
                    placeholder='Email' 
                    value={this.state.email} 
                    onChange={(event) => this.handleOnChange(event, 1)}
                />
                <Input
                    type='password' 
                    placeholder='Password' 
                    value={this.state.password} 
                    onChange={(event) => this.handleOnChange(event, 2)}
                />
                <Input 
                    type='password' 
                    placeholder='Confirm password' 
                    value={this.state.confirmPassword} 
                    onChange={(event) => this.handleOnChange(event, 3)}
                />
            </Form>
        )
    }

}

export default Signup;