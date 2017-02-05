import React from 'react';

export const errorMessage = (props) => {
  if (props.weatherPanel.errorMessage){
    return(
      <h2 className="error-message text-danger text-center">{props.weatherPanel.errorMessage}</h2>
    )
  }
};