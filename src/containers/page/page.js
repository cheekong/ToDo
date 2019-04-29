import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import * as actionCreators from '../../store/actions/index';
import ToDo from '../ToDo/ToDo';
import Login from '../Login/Login';
import Signup from '../Register/Register';
import TodoList from '../ToDo/ToDoList/ToDoList';
import NoticeBar from '../../components/UI/Noticebar/Noticebar';
import Dialog from '../../components/UI/Dialog/Dialog';
import Navigation from '../../components/Navigation/Navigation';
import Toolbar from '../../components/Toolbar/Toolbar';
import ToolbarButton from '../../components/Toolbar/ToolbarButton/ToolbarButton';
import NavigationItem from '../../components/Navigation/NavigationItem/NavigationItem';

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
    }

    handleSignup(event) {
        event.preventDefault();
    }

    handleLogin(event) {
        event.preventDefault();
    }

    toggleNoticeBar(success, message){
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
        let redirect = null,
            centerNavigationItems =  [
                {displayLabel: 'New ToDo', path: '/todo'},
                {displayLabel: 'List', path: '/list'}
            ],
            //leftNavigationItems = [{displayLabel: 'Logout', path: '/logout'}];
            rightNavigationItems = [<ToolbarButton onClick={(e) => this.handleLogout(e)}>Logout</ToolbarButton>];

        if(!this.props.isLogin){
            redirect = <Redirect to='/' />;
            centerNavigationItems =  [];
            rightNavigationItems = <Navigation 
                dataSource={
                    [
                        {displayLabel: 'Signup', path: '/'},
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
                            right={rightNavigationItems}
                        />
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
                                exact path="/todo"
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
