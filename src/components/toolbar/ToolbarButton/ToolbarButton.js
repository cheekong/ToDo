import React from 'react';
import Button from '../../UI/Button/Button';
import './ToolbarButton.css';

const ToolbarButton = ( {type, ...props} ) => (
    <Button primary buttonStyle='outline' width='auto' {...props} />
)

export default ToolbarButton;