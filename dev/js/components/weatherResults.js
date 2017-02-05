import React from 'react';

export const weatherResults = (props, context) => {
  if (props.weather.length) {
    return props.weather.map((weather)=>{
      return(
        <div className="weather-tile" key={weather.id}>
          <div className="row">
            <div className="col-sm-4 text-right">
              <div className="results-city-name mt20">{weather.city}</div>
              <div className="results-coordinates">{weather.coord}&nbsp;[{weather.country}]</div>
            </div>
            <div className="col-sm-7">
              <div className="row results-details">
                <div className="col-xs-3 text-center no-padding">
                  <div>temp.</div>
                  <div><span className="results-details-content">{weather.temp}</span> °C</div>
                </div>
                <div className="col-xs-3 text-center no-padding">
                  <div>wind</div>
                  <div><span className="results-details-content">{weather.wind}</span> km h</div>
                </div>
                <div className="col-xs-3 text-center no-padding">
                  <div>humid.</div>
                  <div><span className="results-details-content">{weather.humidity}</span> %</div>
                </div>
                <div className="col-xs-3 text-center no-padding">
                  <div>press.</div>
                  <div><span className="results-details-content">{weather.pressure}</span> hPa</div>
                </div>
              </div>
              <div className="text-center pt10"><strong className="results-description-main">{weather.main}:&nbsp;&nbsp;</strong><span className="results-description"> {weather.description}</span></div>
            </div>
            <div className="col-sm-1">
            </div>
          </div>
          <div className="div-glyphicon div-glyphicon-repeat">
            <span className="glyphicon glyphicon-repeat"
                  onClick={()=>context.getWeatherFromCityName(weather.city + ',' + weather.country)}></span>
          </div>
          <div className="div-glyphicon div-glyphicon-remove">
            <span className="glyphicon glyphicon-remove"
                  onClick={()=>props.removeWeather(weather)}></span>
          </div>
        </div>
      )
    })
  }
};
