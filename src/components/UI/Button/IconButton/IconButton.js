import React from 'react';

import './IconButton.css';

const getIcon = (type) => {
    switch(type){
        case 'trash': return <i class="far fa-trash-alt"></i>;
        default: return null;
    }
} 

const IconButton = ({icon='', round=false, square=false, ...props}) => {
    let componentClassName = ['icon-button'];
    
    if(round){
        componentClassName.push('round')
    } else if (square){
        componentClassName.push('square')
    }
    
    return (
        <button 
            className={componentClassName.join(' ')}
            onClick={props.onClick}
        >
            {getIcon(icon)}
        </button>
    )
}

export default IconButton;