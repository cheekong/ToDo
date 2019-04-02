import React from 'react';

//Goes to its' own file. 
const NoteCompletedItem = ({className='', ...props}) => {
    let componentClassName = ['note-container-item', ...className];
    return (
        <div className={componentClassName.join()}>
             <s>
                <p onClick={props.handleOnClick}>
                <input 
                    type='checkbox' 
                    value='undo' 
                    checked={true} 
                    onChange={props.handleOnClick}/>
                    {props.description}
                </p>
            </s>
        </div>
    )
}


export default NoteCompletedItem;