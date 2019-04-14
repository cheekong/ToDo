import React from 'react';
import Button from '../../../components/Button/Button';
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
                    <Button primary={true} label='view' onClick={() => handleView(id)}/>
                    <Button secondary={true} label='delete' onClick={(e) => handleDelete(e, id)}/>
                </section>
            </section>
        </div>
    )
}

export default NoteListItem;