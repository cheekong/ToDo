import React from 'react';
import { Link } from 'react-router-dom';
import './NavigationItem.css';

const NavigationItem = ({displayLabel, path}) => (
    <Link 
        className='navigation-item' 
        to={path}
    >
        {displayLabel}
    </Link>
)

export default NavigationItem;