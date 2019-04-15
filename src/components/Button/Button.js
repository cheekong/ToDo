import React from 'react';
import './Button.css';

const getClasses = (className, primary, secondary, buttonStyle) => {
    const defaultClass = 'app-button';
    const defaultStyle = 'app-button-default-style';
    const outlineStyle = 'app-button-outline-style';
    const primaryStyle = 'app-button-primary';
    const secondaryStyle = 'app-button-secondary';

    let buttonClass = [
        className, 
        defaultClass
    ];

    if(buttonStyle === 'default'){
        buttonClass.push(defaultStyle);
    } else if(buttonStyle === 'outline'){
        buttonClass.push(outlineStyle);
    }

    if(primary) {
        buttonClass.push(primaryStyle);
    } else if(secondary) {
        buttonClass.push(secondaryStyle);
    }

    return buttonClass;
}

const getWidth = (width) => width;

const Button = ({
    className='', 
    onClick = null, 
    primary, 
    secondary,
    buttonStyle = 'default',
    width = null,
    ...props
}) => {

    let buttonClassName = getClasses(className, primary, secondary, buttonStyle)
    let widthInlineStyle = getWidth(width);

    return (
        <button
            className={buttonClassName.join(' ')}
            style={{width: widthInlineStyle}}
            onClick={(e) => {
                e.preventDefault();
                onClick(e)}}
        >
            {props.label}
        </button>
    )
}

export default Button;