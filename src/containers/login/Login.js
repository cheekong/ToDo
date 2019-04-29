import React, { Component }  from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actionCreators from '../../store/actions/index';

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
        if(!prevProps.isLogin && this.props.isLogin){
            this.props.history.push('/list');
        }
    }

    render(){
        return(
            <div id='login'>
                <Form
                    title="Hi again!"
                    buttons={(<Button primary={true} type='button' label="Login" onClick={(event)=>this.handleSubmit(event)}>Login</Button>)}
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
                    <section>
                        <p>No account? <Link to='/'>Create one</Link></p>
                    </section>
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
