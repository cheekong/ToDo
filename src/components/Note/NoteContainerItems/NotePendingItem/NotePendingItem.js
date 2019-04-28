import React from 'react';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import Checkbox from '../../../UI/Checkbox/Checkbox';
import './NotePendingItem.css';

const NotePendingItem = ({className='', ...props}) => {
    let componentClassName = ['note-container-item-pending', ...className];
    return (
        <div className={componentClassName.join()}>
            <div className='note-container-item-pending-left'>
                <Input 
                    data-lpignore='true'
                    type='checkbox' 
                    value='done'
                    checked={false} 
                    onChange={props.handleCheckBox}
                />
                {/*<Checkbox />*/}
            </div>
            <div className='note-container-item-pending-center'>
                <Input 
                    data-lpignore='true'
                    type='text'
                    fontSize='15'
                    underline
                    value={props.value} 
                    onChange={props.onChange}
                    onKeyPress={props.onKeyPress}
                    placeholder='List item'
                    ref={props.ref}
                />
            </div>
            <div className='note-container-item-pending-right'>
                <Button
                    variant='transparent'
                    color='default'
                    onClick={(e) => props.onDelete(e)}
                >
                    <i class="far fa-trash-alt"></i>
                </Button>
            </div>
        </div>
    )
}

export default NotePendingItem;