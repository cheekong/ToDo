import React from 'react';

const NotePendingItem = ({className='', ...props}) => {
    let componentClassName = ['note-container-item', ...className];
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