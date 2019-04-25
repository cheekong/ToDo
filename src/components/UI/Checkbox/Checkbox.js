import React from 'react';
import './Checkbox.css';

const Checkbox = (props) => {

    return(
        <label class="container">One
            <input type="checkbox" checked="checked"/>
            <span class="checkmark"></span>
        </label>
    );
}

export default Checkbox;