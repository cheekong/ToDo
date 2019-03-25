import React, { Component }  from 'react';
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions/index';
import * as api from '../../utilities/api';
import './login.css';

class Login extends Component {

    handleSubmit(email, password){
        this.props.toggleLoading();
        this.props.login(email, password);
        /*
        .then(res => {
console.log('getAccount',res);
        })
        .catch(err => {

        });
        */
    }

    componentDidUpdate(prevProps){
        console.log(prevProps);
        if(!prevProps.isLogin && this.props.isLogin){
            this.props.history.push('/');
        }
    }

    render(){
        return(
            <div id='login'> 
                <form>
                    <h1>Welcome back :)</h1>
                    <ul>
                        <li>
                            <input className='user' type='text' placeholder='Username'/>
                        </li>
                        <li>
                            <input className='pass' type='password' placeholder='Password'/>
                        </li>
                        <li>
                            <input className='cta--forward'type='button' value="Let's Go!" onClick={(event)=>this.handleSubmit(event)}/>
                        </li>
                    </ul>
                    
                </form>
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
    saveNotes: (notes) => dispatch(actionCreators.saveNotes(notes)),
    toggleLoading: () => dispatch(actionCreators.toggleLoading()),
    login: (email, password) => dispatch(actionCreators.login(email, password))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
