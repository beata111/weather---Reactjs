import React from 'react';

export const weatherResults = (props) => {
  if (props.weather.length) {
    return props.weather.map((weather)=>{
      return(
        <div className="weather-tile" key={weather.id}>
          <div className="row">
            <div className="col-sm-4 city-name">{weather.city}</div>
            <div className="col-sm-8">weather details</div>
            <button className="btn btn-success" onClick={()=>props.removeWeather(weather)}>remove</button>
          </div>
        </div>
      )
    })
  }
};
