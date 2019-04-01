import React from 'react';

import './form.css';

const Form = (props) => {

    return(
        <form className='app-form'>
            <section className='app-form-heading app-form-component' >
                <h1>{props.title}</h1>
            </section>
            <section className='app-form-content app-form-component' >
                {props.children}
            </section>
            <section className='app-form-actions app-form-component'>
                {props.buttons}
            </section>  
        </form>
    )
}

export default Form;