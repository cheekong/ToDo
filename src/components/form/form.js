import React from 'react';

import './form.css';

const Form = (props) => {
    let title = null;
    if(props.title){
        title = <h1>{props.title}</h1>;
    } else if (props.customTitle){
        title = props.customTitle;
    }

    return(
        <form className='app-form'>
            <section className='app-form-heading app-form-component' >
                {title}
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