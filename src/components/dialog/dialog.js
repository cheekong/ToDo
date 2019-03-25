import React, { Component} from 'react';

import './dialog.css';

class Dialog extends Component {
    handleClose() {

    }

    handleButton1(){ 
        this.props.button1Function()
        this.props.onClose();
    }

    render(){
        let content = null; 
        
        if(this.props.showDialog){
            content = (
                <div id='backdrop'>
                    <form id='dialog'>
                        <section id='dialog__top'>
                            <input type='button' value='x' onClick={() => this.props.onClose()}/>
                        </section>
                        <section id='dialog__heading'>
                            <h1>{this.props.title}</h1>
                        </section>
                        <section id='dialog__body'>
                            <p>{this.props.message}</p>
                        </section>
                        <section id='dialog__actions'>
                            <input type='button' value='Ok' onClick={() => this.handleButton1()}/>
                            <input type='button' value='Close' onClick={() => this.props.onClose()}/>
                        </section>
                    </form>
                </div>
            )
        }
        
        return content
    }
}

export default Dialog;