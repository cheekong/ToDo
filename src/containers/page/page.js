import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

import ToDo from '../todo/todo';
import NewNote from '../todo/NewNote/NewNote';
import Login from '../login/login';
import Signup from '../signup/signup';
import TodoList from '../todo/todoList/todoList';
import NoticeBar from '../../components/noticebar/noticebar';

import './page.css';

class Page extends Component {
    state = {
       currentPage: null,
       noticeBar: {
           show: false,
           message: '',
           success: false
       }
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
console.log('this.state.noticeBar.show',this.state.noticeBar.show);
        return(
            
            <div id='page'>
               <Router>
                    
                    <div>
                    <NoticeBar 
                        show={this.state.noticeBar.show} 
                        success={this.state.noticeBar.success} 
                        message={this.state.noticeBar.message}
                        onClose={()=>this.toggleNoticeBar(false,'')}/>
                        <nav>
                            <Link className='navItem' to="/">New List</Link>
                            <Link className='navItem' to="/list">List</Link>
                            <Link className='navItem' to="/about">Login</Link>
                            <Link className='navItem' to="/signup">Signup</Link>
                        </nav>

                        <hr />

                        <div id='page-content'>
                            <Route 
                                exact path="/"
                                render={(props) => <NewNote {...props} toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} />}
                            />
                            <Route 
                                path='/list'
                                render={(props) => <TodoList {...props} toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} />}
                            />
                            <Route 
                                path='/note'
                                render={(props) => <ToDo {...props} toggleNoticeBar={(success, message) => this.toggleNoticeBar(success, message)} />}
                            />
                            <Route path="/about" component={Login} />
                            <Route path="/signup" component={Signup} />
                        </div>
                    </div>
                    
                </Router>
            </div>
            
        )
    }
}

export default Page;