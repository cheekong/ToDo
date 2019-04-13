import React from 'react';
import './Button.css';

const Button = ( {className='', onClick=null, ...props} ) => {

    let buttonClassName = ['app-button'];
    if(props.primary){
        buttonClassName.push('app-button-primary');
    }

    if(props.secondary){
        buttonClassName.push('app-button-secondary');
    }

    return (
        <input
            className={buttonClassName.join(' ')}
            type='button'
            value={props.value}
            onClick={(e) => onClick(e)}
        />
    )
}

export default Button;