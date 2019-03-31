import React from 'react';

import './form.css';

const Form = (props) => {

    return(
        <form className='app-form'>
            <section className='app-form-heading app-form-component' >
                <h1>{props.title}</h1>
            </section>
            <section id='app-form-content app-form-component' >
                {props.children}
            </section>
            <section className='app-form-actions app-form-component'>
                {props.buttons}
                {/*
                <button className='todo-actions todo-actions__submit' onClick={(event) => this.handleSubmit(event)}>
                    <i className="fas fa-check todo-actions-icon" />
                </button>
                <button className='todo-actions todo-actions__cancel' onClick={(event) => this.handleCancel(event)}>
                    <i className="fas fa-times todo-actions-icon" />
                </button>
                */}
            </section>  
        </form>
    )
}

export default Form;