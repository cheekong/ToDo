import React from 'react';
import './Button.css';

const getClasses = (className, variant, color) => {
    const defaultClass = 'app-button';
    const defaultStyle = 'app-button-default-style';
    const outlineStyle = 'app-button-outline-style';
    const transparentStyle = 'app-button-transparent-style';
    const primaryStyle = 'app-button-primary';
    const secondaryStyle = 'app-button-secondary';

    let buttonClass = [
        className, 
        defaultClass
    ];

    if(variant === 'default'){
        buttonClass.push(defaultStyle);
    } else if(variant === 'outline'){
        buttonClass.push(outlineStyle);
    } else if (variant === 'transparent'){
        buttonClass.push(transparentStyle);
    }

    if(color === 'primary') {
        buttonClass.push(primaryStyle);
    } else if(color === 'secondary') {
        buttonClass.push(secondaryStyle);
    }

    return buttonClass;
}

const getWidth = (width) => width;

const Button = ({
    className='', 
    onClick = null, 
    width = null,
    variant='default',
    color='primary',
    ...props
}) => {

    let buttonClassName = getClasses(className, variant, color)
    let widthInlineStyle = getWidth(width);

    return (
        <button
            className={buttonClassName.join(' ')}
            style={{width: widthInlineStyle}}
            onClick={(e) => {
                e.preventDefault();
                onClick(e)}}
        >
            {props.children}
        </button>
    )
}

export default Button;