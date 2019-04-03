import React from 'react';

import './NoteCompletedItem.css';

//Goes to its' own file. 
const NoteCompletedItem = ({className='', ...props}) => {
console.log('test');
    let componentClassName = ['note-container-item-completed', ...className];
    return (
        <div className={componentClassName.join()}>
            <input 
                type='checkbox' 
                value='undo' 
                checked={true} 
                onChange={props.handleOnClick}
            />
             <s>
                <p onClick={props.handleOnClick}>
                    {props.value}
                </p>
            </s>
        </div>
    )
}


export default NoteCompletedItem;