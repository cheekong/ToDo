import React from 'react';
import Button from '../../Button/Button';
import './ToolbarButton.css';

const ToolbarButton = ( {type, ...props} ) => (
    <Button primary {...props} />
)

export default ToolbarButton;