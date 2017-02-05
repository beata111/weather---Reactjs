import React from 'react';

export const weatherInput = (props, context) => {
  if (props.weatherPanel.inputType === 'city') {
    return(
      <div className="row">
        <div className="col-sm-2">
          <button className="btn btn-success get-weather-btn" onClick={()=>context.getWeatherFromCityName($('#weather-input-city')[0].value)}>go!</button>
        </div>
        <div className="col-sm-10">
          <input id="weather-input-city" type="text" placeholder="enter city name" onChange={()=>$('#weather-input-city').geocomplete()}/>
        </div>
      </div>
    )
  } else if (props.weatherPanel.inputType === 'coordinates') {
    return(
      <div>
        <div className="row">
          <div className="col-sm-2">
            <button className="btn btn-success get-weather-btn"
                    onClick={()=>context.getWeatherFromCoordinates($('#first-coordinate')[0].value, $('#first-coordinate-sign')[0].value, $('#second-coordinate')[0].value, $('#second-coordinate-sign')[0].value)}>go!</button>
          </div>
        <div className="col-sm-10">
          <div className="row">
            <div className="col-xs-4">
              <input id="first-coordinate" placeholder="00.0000°"/>
            </div>
            <div className="col-xs-2">
              <select id="first-coordinate-sign">
                <option value="N">N</option>
                <option value="S">S</option>
            </select>
          </div>
          <div className="col-xs-4">
            <input id="second-coordinate" placeholder="000.0000°"/>
              </div>
                <div className="col-xs-2">
                  <select id="second-coordinate-sign">
                    <option value="E">E</option>
                    <option value="W">W</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-success get-weather-btn mt10"
                    onClick={()=>context.generateRandomCoordinates()}>random coordinates</button>
          </div>
        </div>
      </div>
    )
  }
};