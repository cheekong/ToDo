import React from 'react';
import './ToolbarButton.css';

const ToolbarButton = ( {type, ...props} ) => (
    <input type='button' {...props} />
)

export default ToolbarButton;