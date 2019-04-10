import React from 'react';
import './toolbar.css';

const toolbar = ({left = null, center = null, right = null}) => {
    return (
        <div id='toolbar'>
            <section className='toolbar_left'>
                {left}
            </section>
            <section className='toolbar_center'>
                {center}
            </section>
            <section className='toolbar_right'>
                {right}
            </section>
        </div>
    )
    
}

export default toolbar;