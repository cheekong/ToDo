import React from 'react';

import './Input.css';

const Input = ({className='' ,...props}) => {
    let newClassName = ['app-input', className];
    return <input className={newClassName.join(' ')} {...props}/>
}

export default Input;