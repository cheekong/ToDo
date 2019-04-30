import React from 'react';
import Button from '../../UI/Button/Button';
import './ToolbarButton.css';

const ToolbarButton = ( {type, ...props} ) => (
    <Button color='primary' variant='outline' width='auto' {...props}>{props.children}</Button>
)

export default ToolbarButton;