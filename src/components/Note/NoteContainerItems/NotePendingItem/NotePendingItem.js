import React from 'react';

import './NotePendingItem.css';

const NotePendingItem = ({className='', ...props}) => {
    let componentClassName = ['note-container-item-pending', ...className];
    return (
        <div className={componentClassName.join()}>
            <input 
                data-lpignore='true'
                type='checkbox' 
                value='done'
                checked={false} 
                onChange={props.handleCheckBox}
            />
            <input 
                data-lpignore='true'
                type='text' 
                value={props.value} 
                onChange={props.onChange}
                onKeyPress={props.onKeyPress}
                ref={props.ref}
            />
            <button onClick={(e) => props.onDelete(e)}>
                X
            </button>
        </div>
    )
}

export default NotePendingItem;