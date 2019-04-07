import React, { Component }  from 'react';
import { connect } from 'react-redux'

import Form from '../../components/form/form';
import Input from '../../components/input/Input';
import * as actionCreators from '../../store/actions/index';
import * as api from '../../utilities/api';
import './login.css';

class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    handleOnChange(field, value){
        this.setState({[field]: value})
    }

    handleSubmit(email, password){
        this.props.toggleLoading();
        this.props.login(email, password);
    }

    componentDidUpdate(prevProps){
        console.log(prevProps);
        if(!prevProps.isLogin && this.props.isLogin){
            this.props.history.push('/note');
        }
    }

    render(){
        return(
            <div id='login'>
                <Form
                    title="Hi again!"
                    buttons={(<input className='cta--forward'type='button' value="Signin" onClick={(event)=>this.handleSubmit(event)}/>)}
                >
                    <Input 
                        type='Username' 
                        placeholder='Username' 
                        value={this.state.username} 
                        onChange={(event) => this.handleOnChange('username', event.target.value)}
                    />
                    <Input
                        type='password' 
                        placeholder='Password' 
                        value={this.state.password} 
                        onChange={(event) => this.handleOnChange('password', event.target.value)}
                    />
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      notes: state.user.notes,
      isLogin: state.user.login,
      loading: state.user.loading
    }
  }

const mapDispatchToProps = dispatch => ({
    toggleLoading: () => dispatch(actionCreators.toggleLoading()),
    login: (email, password) => dispatch(actionCreators.login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
