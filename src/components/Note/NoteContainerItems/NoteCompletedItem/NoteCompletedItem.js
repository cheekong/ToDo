import React from 'react';

import IconButton from '../../../UI/Button/IconButton/IconButton';
import './NoteCompletedItem.css';

//Goes to its' own file. 
const NoteCompletedItem = ({className='', ...props}) => {
console.log('test');
    let componentClassName = ['note-container-item-completed', ...className];
    return (
        <div className={componentClassName.join()}>
            <section className='note-container-item-completed-left'>
                <input 
                    type='checkbox' 
                    value='undo' 
                    checked={true} 
                    onChange={props.handleOnClick}
                />
            </section>
            <section className='note-container-item-completed-center'>
                <s>
                    <p onClick={props.handleOnClick}>
                        {props.value}
                    </p>
                </s>
            </section>
            <section className='note-container-item-completed-right'>
            <IconButton 
                icon='trash'
                onClick={(e) => props.onDelete(e)}
            />
            </section>
            
             
        </div>
    )
}


export default NoteCompletedItem;