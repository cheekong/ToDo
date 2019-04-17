import React from 'react';

import './Input.css';

const Input = ({className='', center=false, ...props}) => {
    let inputClass = ['app-input', className];
    if(center){
        inputClass.push('app-input-center')
    }
    return <input  data-lpignore='true' className={inputClass.join(' ')} {...props}/>
}

export default Input;