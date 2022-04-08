import React from 'react'
import './mensajeError.css'

const MensajeError = ({error}) =>
{
    if(error)
        return(
            <div className="mensaje-error">
                <label>{error}</label>
            </div>
        )
    return(
        <></>
    )
}

export default MensajeError