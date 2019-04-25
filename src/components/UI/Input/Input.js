import React from 'react';

import './Input.css';

const Input = ({className='', center=false, fontSize=0, underline=false, ...props}) => {
    let inputClass = ['app-input', className];
    if(center){
        inputClass.push('app-input-center')
    }

    let styles = {};
    if(!isNaN(parseFloat(fontSize)) && isFinite(fontSize) && fontSize){
        styles.fontSize = fontSize + 'px';
    }

    if(underline){
        styles.border = '0';
        styles.borderBottom = '1px solid black';
    }

    
    return (
        <input 
            data-lpignore='true'
            style={styles}
            className={inputClass.join(' ')} 
            {...props}
        />
    )
}

export default Input;