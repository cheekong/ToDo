import React from 'react';
import Button from '../../../../components/UI/Button/Button';
import './NoteListItem.css';


const NoteListItem = ( {id, title, completedItemCount, pendingItemCount, handleView, handleDelete} ) => {

    return (
        <>
            <div className='note-list-item'>
                <div className='new-note-list-item-details'>
                    <h3>{title}</h3>
                    <p>{completedItemCount} / {completedItemCount + pendingItemCount} completed</p>
                </div>
                <div className='note-list-item-actions'>
                    <Button 
                        className='note-list-actions-button' 
                        color='primary'
                        variant='transparent'
                        width='50%' 
                        onClick={() => handleView(id)}
                    >
                        <i class="far fa-edit"></i>
                    </Button>
                    <Button 
                        className='note-list-actions-button' 
                        color='secondary'
                        variant='transparent'
                        width='50%' 
                        onClick={(e) => handleDelete(e, id)}
                    >
                        <i class="far fa-trash-alt"></i>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NoteListItem;