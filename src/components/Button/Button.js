import React from 'react';
import './Button.css';

const Button = ( {className='', onClick=null, ...props} ) => {

    let buttonClassName = [className];
    if(props.primary){
        buttonClassName.push('primary')
    }

    if(props.secondary){
        buttonClassName.push('secondary')
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