import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions/index';
import ToDo from '../todo/todo';
import Login from '../login/login';
import Signup from '../signup/signup';
import TodoList from '../todo/todoList/todoList';
import NoticeBar from '../../components/noticebar/noticebar';
import Dialog from '../../components/dialog/dialog';
import Navigation from '../../components/Navigation/Navigation';
import Toolbar from '../../components/toolbar/toolbar';
import ToolbarButton from '../../components/toolbar/ToolbarButton/ToolbarButton';

import './page.css';

class Page extends Component {
    state = {
       currentPage: null,
       noticeBar: {
           show: false,
           message: '',
           success: false
       },
       dialog: {
           show: false,
           title: '',
           message: '',
           onClose: null,
           button1Function: null,
           button2Function: null
       }
    }

    toggleDialog(showDialog, message, button1Function, button2Function){
        let newDialogState = {...this.state.dialog, 
            show: showDialog,
            message: message,
            button1Function: button1Function,
            button2Function: button2Function
        };
    console.log('test2');
        this.setState({dialog: newDialogState})
    }

    handleCloseDialog(){
        let newDialogState = {...this.state.dialog, 
            show: false,
            message: '',
            button1Function: null,
            button2Function: null
        };
        this.setState({dialog: newDialogState})
    }

    handleLogout(event) {
        event.preventDefault();
        this.props.logout();
        console.log('this.props.history', this.props.history)
    }

    handleSignup(event) {
        event.preventDefault();
    }

    handleLogin(event) {
        event.preventDefault();
    }

    toggleNoticeBar(success, message){
        console.log('args', arguments);
        console.log('test', this.state);
        console.log(' !this.state.show', !this.state.show);
        JSON.parse(JSON.stringify(this.state.noticeBar))
        let newState = JSON.parse(JSON.stringify(this.state));
        newState.noticeBar = {
            show: !newState.noticeBar.show,
            message: message,
            success: success
        }
        this.setState(newState,()=>console.log(this.state.noticeBar));
    }

    componentDidUpdate(prevProps, prevState){

    }

    render(){
console.log('test', this.props.history);
        let redirect = null,
            centerNavigationItems =  [
                {displayLabel: 'New Note', path: '/note'},
                {displayLabel: 'List', path: '/list'}
            ],
            //leftNavigationItems = [{displayLabel: 'Logout', path: '/logout'}];
            leftNavigationItems = [<ToolbarButton value='Logout' onClick={(e) => this.handleLogout(e)} />];

        if(!this.props.isLogin){
            redirect = <Redirect to='/' />;
            centerNavigationItems =  [];
            leftNavigationItems = <Navigation 
                dataSource={
                    [
                        {displayLabel: 'Signup', path: '/signup'},
                        {displayLabel: 'Login', path: '/login'}
                    ]
                }
            />
        }

        return(
            <div id='page'>
                <Router>
                    <div>
                        {redirect}
                        <NoticeBar 
                            show={this.state.noticeBar.show} 
                            success={this.state.noticeBar.success} 
                            message={this.state.noticeBar.message}
                            onClose={()=>this.toggleNoticeBar(false,'')}
                        />
                        <Dialog
                            showDialog={this.state.dialog.show} 
                            title='test title' 
                            message={this.state.dialog.message} 
                            buttonLabel='test label'
                            button1Function={this.state.dialog.button1Function}
                            button2Function={this.state.dialog.button2Function}
                            onClose={()=>this.handleCloseDialog()}
                        />
                        <Toolbar
                            center={<Navigation dataSource={centerNavigationItems}/>}
                            right={leftNavigationItems}
                        />
                        
                        <hr />

                        <div id='page-content'>
                            <Route 
                                exact path="/"
                                render={(props) => <Signup {...props} 
                                    toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} 
                                    toggleDialog={(showDialog, message, button1Function, button2Function)=> this.toggleDialog(showDialog, message, button1Function, button2Function)}
                                />}
                            />
                            <Route 
                                exact path="/login"
                                render={(props) => <Login {...props} 
                                    toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} 
                                    toggleDialog={(showDialog, message, button1Function, button2Function)=> this.toggleDialog(showDialog, message, button1Function, button2Function)}
                                />}
                            />
                            <Route 
                                exact path="/list"
                                render={(props) => <TodoList {...props} 
                                    toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} 
                                    toggleDialog={(showDialog, message, button1Function, button2Function)=> this.toggleDialog(showDialog, message, button1Function, button2Function)}
                                />}
                            />
                            <Route 
                                exact path="/note"
                                render={(props) => <ToDo {...props} 
                                    toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} 
                                    toggleDialog={(showDialog, message, button1Function, button2Function)=> this.toggleDialog(showDialog, message, button1Function, button2Function)}
                                />}
                            />
                        </div>
                    </div>
                    
                </Router>
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
    logout: () => dispatch(actionCreators.logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
