/* other imports */
import React, { CSSProperties } from 'react'
import styles from './MainButton.module.scss'

const convertType = (type: ButtonVariant) => {
    switch (type) {
        case "primary-outline" :
            return styles['primary-outline']

        case "primary-flat" :
            return styles['primary-flat']

        case "secondary" :
            return styles.secondary

        case "secondary-outline" :
            return styles['secondary-outline']

        case "secondary-flat" :
            return styles['secondary-flat']
    
        case "danger":
            return styles.danger

        default :
            return styles.primary;
    }
}

const MainButton = ({
    children,
    variant = "primary",
    className,
    onClick,
    disabled,
    circle,
    round,
    style,
    type,
} : {
    children: React.ReactNode,
    variant?: ButtonVariant,
    className?: string | string[],
    onClick?: () => void,
    disabled?: boolean,
    circle?: boolean,
    round?: boolean,
    style?: CSSProperties
    type?: ButtonType,
}) => {
    const classes = `btn ${styles.button} ${convertType(variant)} ${Array.isArray(className) ? className.join(' ') : className} ${circle ? styles.circle : ""} ${round ? styles.round : ""}`
    
    const buttonClickHandler = () => {
        onClick !== undefined ? onClick!() : null
    }

    return <button type={type ? type : "button"} className={classes} disabled={disabled} onClick={buttonClickHandler} style={{...style}}>
        {children}
    </button>
}

export default MainButton;