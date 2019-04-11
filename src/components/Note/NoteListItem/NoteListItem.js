import React from 'react';
import './NoteListItem.css';


const NoteListItem = ( {id, title, completedItemCount, pendingItemCount, handleView, handleDelete} ) => {

    return (
        <div className='note-list-item'>
            <h3>{title}</h3>
            <section className=''>
                <ul>
                    <li>Tasks Completed: {completedItemCount}</li>
                    <li>Tasks Pending: {pendingItemCount}</li>
                </ul>
                <section className='note-list-item-actions'>
                    <i  className="far fa-edit note-list-item-actions__button note-list-item-actions__button--edit" 
                        onClick={() => handleView(id)}/>
                    <i  className="far fa-trash-alt note-list-item-actions__button note-list-item-actions__button--delete" 
                        onClick={(event) => handleDelete(event, id)}/>
                </section>
            </section>
        </div>
    )
}

export default NoteListItem;