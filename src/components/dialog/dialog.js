import React, { Component} from 'react';

import './dialog.css';

class Dialog extends Component {
    state = {
        isOpen: true,
    }


    render(){
        let content = null; 
        
        if(this.state.isOpen){
            content = (
                <div id='backdrop'>
                    <form id='dialog'>
                        <section id='dialog__top'>
                            <input type='button' value='x' />
                        </section>
                        <section id='dialog__heading'>
                            <h1>{this.props.title}</h1>
                        </section>
                        <section id='dialog__body'>
                            <p>{this.props.message}</p>
                        </section>
                        <section id='dialog__actions'>
                            <input type='button' value={this.props.buttonLabel} />
                        </section>
                    </form>
                </div>
            )
        }
        
        return content
    }
}

export default Dialog;