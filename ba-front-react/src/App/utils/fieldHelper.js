import React from 'react';

const renderField = ({ input,
                         type,
                         inputProps,
                         meta: { touched, error, warning, invalid },
                     }) => {

        return <input {...input} {...inputProps} type={type} />

}

const required = value => (value ? undefined : 'Required')

export {renderField, required};