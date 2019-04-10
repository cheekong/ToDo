import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';

import './Navigation.css';

const Navigation = ( {dataSource} ) => {
    let navigationItems = dataSource.map(data => 
        <NavigationItem displayLabel={data.displayLabel} path={data.path}/>
    )

    return(
        <nav>
            {navigationItems}
        </nav>
    )
}

export default Navigation;