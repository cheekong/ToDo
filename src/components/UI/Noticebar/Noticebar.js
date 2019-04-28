import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';
import './Noticebar.css'

class NoticeBar extends Component {
    //success or error icon

    state = {
        show: false,
        message: '',

    }

    toggleNoticeBar(message){
console.log('3');
        this.setState({
            show: !this.state.show,
            message: message
        });
    }

    setNoticeBar(message){
        this.setState({
            message: message
        })
    }

    componentDidUpdate(prevProps){
console.log(this.props.show,prevProps.show);
        if(prevProps.show !== this.props.show ){
            this.toggleNoticeBar(this.props.message)
        }

    }

    componentDidMount(){
        
    }

    //message
    render(){

        let noticeBar = null;
        let icon = null;
        let className = [];
        
        if(this.props.success){
            icon = null;
            className.push('success');
        } else {
            icon = null;
            className.push('error');
        }

        if(this.state.show){
            noticeBar = (
                <div>
                    <div id='noticebar' className={className}>
                        <section id='notice-bar-content__section'>
                            <span id='left-pane'>{icon}</span>
                            <span id='center-pane'>{this.state.message}</span>
                            <span id='right-pane' onClick={()=> this.props.onClose()}>x</span>
                        </section>
                    </div>
                    <Backdrop />
                </div>
            )
        }


        return noticeBar
    }
}

export default NoticeBar;