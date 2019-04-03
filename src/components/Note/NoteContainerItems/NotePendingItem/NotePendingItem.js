import React from 'react';

import './NotePendingItem.css';

const NotePendingItem = ({className='', ...props}) => {
    let componentClassName = ['note-container-item-pending', ...className];
    return (
        <div className={componentClassName.join()}>
            <input 
                type='checkbox' 
                value='done'
                checked={false} 
                onChange={props.handleCheckBox}
            />
            <input 
                type='text' 
                value={props.value} 
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                ref={props.ref}
            />
        </div>
    )
}

export default NotePendingItem;