import React from 'react';


const Wrapper = ({children, className}) => {
    return (
        <div className={`px-6 py-6 box-border w-full ${className}`}>
            {children}
        </div>
    )
}

Wrapper.defaultProps = {
    className: ''
}

export default Wrapper;