import React from 'react';

export const errorMessage = (props) => {
    if (props.weatherPanel.errorMessage){
        return(
            <h3 className="error-message text-danger text-center">{props.weatherPanel.errorMessage}</h3>
        )
    }
};