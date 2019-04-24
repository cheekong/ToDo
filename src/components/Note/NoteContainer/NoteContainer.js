import React from 'react';

import PendingItems from '../NoteContainerItems/NotePendingItem/NotePendingItem';
import CompletedItems from '../NoteContainerItems/NoteCompletedItem/NoteCompletedItem';
import './NoteContainer.css';

const buildPendingItems = (pendingItems, pendingItemHandleCheckBox, pendingItemOnChange, pendingItemOnKeyPress, onDelete) => {
    let lastIndex = pendingItems.length ? pendingItems.length - 1: 0;
    let pendingItemsList = null;
    if(Array.isArray(pendingItems) && pendingItems.length){
        pendingItemsList = pendingItems.map((item, idx) => {
console.log('idx', idx);
            if(!item.checked){
                return (
                    <PendingItems
                        key={idx} 
                        value={item.description}
                        handleCheckBox={() => pendingItemHandleCheckBox(idx)}
                        onChange={(event) => pendingItemOnChange(idx, event)}
                        onKeyPress={event => pendingItemOnKeyPress(idx, event)}
                        onDelete={ e => onDelete(e, 'pending', idx)}
                    />
                )
            } else {
                return null;
            }
        });
    }
    
    return pendingItemsList;
}

const buildCompletedItems = (completedItems, completedHandleOnClick, onDelete) => {
    let completedItemsList = null;
    if(Array.isArray(completedItems) && completedItems.length){
        completedItemsList = completedItems.map((item, idx) => {
            return (
                <CompletedItems
                    key={idx + '__completed'} 
                    completed
                    value={item.description}
                    onChange={()=>{}}
                    handleOnClick={() => completedHandleOnClick(idx)}
                    onDelete={(e) => onDelete(e, 'completed', idx)}
                />
            )
        });
    }
    return completedItemsList;
}

const NoteContainer = (props) => {
    const pendingItems = buildPendingItems(
        props.data.pending, 
        props.pendingItemHandleCheckBox,
        props.pendingItemOnChange,
        props.pendingItemOnKeyPress,
        props.onDelete
    );

    let completedItems = null;
    if(props.data.completed.length){
        completedItems = (
            <section id='note-container-completed-items'>
                <h2>{props.data.completed.length} Completed Items</h2>
                {buildCompletedItems(props.data.completed, props.completedHandleOnClick, props.onDelete)}
            </section>
        );
    }

    return (
        <section id='note-container'>
            <section id='note-container-pending-items'>
                <h2>{props.data.pending.length} Pending Items</h2>
                {pendingItems}
            </section>
            {completedItems}
        </section>
    )
}

export default NoteContainer;