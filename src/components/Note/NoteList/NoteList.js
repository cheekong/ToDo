import React from 'react';
import NoteListItem from '../NoteListItem/NoteListItem';
import './NoteList.css';

const NoteList = ({data, handleView, handleDelete, isLogin}) => {
    const keys = Object.keys(data);
    let noteListItems = [];

    for(let key of keys){
        let item = data[key];
        const completedItemCount = item.items.completed ? item.items.completed.length : 0;
        const pendingItemCount = item.items.pending ? item.items.pending.length : 0;

        noteListItems.push(
            <NoteListItem 
                id={key} 
                title={item.title} 
                completedItemCount={completedItemCount}
                pendingItemCount={pendingItemCount} 
                handleView={handleView}
                handleDelete={handleDelete}
                isLogin={isLogin}
            />
        )
    }

    return(
        <form className='note-list-container'>
            {noteListItems}
        </form>
    )
}

export default NoteList;