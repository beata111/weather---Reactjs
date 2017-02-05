import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewWeather, removeWeather, changeInputType, setErrorMessage, removeErrorMessage} from '../actions';
import {errorMessage} from '../components/errorMessage';
import {weatherInput} from '../components/weatherInput';
import {weatherResults} from '../components/weatherResults';
import Request from 'superagent';


class WeatherPanel extends Component {

  generateRandomCoordinates(){
    $('#first-coordinate')[0].value = (Math.random()*90).toFixed(4);
    $('#second-coordinate')[0].value = (Math.random()*180).toFixed(4);
    $('#first-coordinate-sign')[0].value = Math.round(Math.random()*1000) % 2 ? "N" : "S";
    $('#second-coordinate-sign')[0].value = Math.round(Math.random()*1000) % 2 ? "E" : "W";
    this.resetError();
  }

  processData(data){
    this.resetError();
    var weatherData = {
      coord: (data.coord.lat > 0 ? data.coord.lat + '° N, ' : -data.coord.lat + '° S, ') + (data.coord.lon > 0 ? data.coord.lon + '° E' : -data.coord.lon + '° W'),
      city: data.name,
      main: data.weather[0].main,
      description: data.weather[0].description,
      country: data.sys.country,
      temp: data.main.temp,
      pressure: data.main.pressure,
      wind: data.wind.speed
    };
    this.props.addNewWeather(weatherData);
  }

  processError(error, message){
    if (error.status === 502) {
      this.props.setErrorMessage(message);
    }
  }

  resetError(){
    if (this.props.weatherPanel.errorMessage){
      this.props.removeErrorMessage();
    }
  }

  getWeatherFromCityName(inputField){
    if (inputField){
      let splits = inputField.split(',');
      let requestQuery = splits.length === 1 ? splits[0] : splits[splits.length-2] + ',' + splits[splits.length-1];
      Request.get('http://api.openweathermap.org/data/2.5/weather?q=' + requestQuery + '&APPID=e1ee566c1c83e3b04456992ef1caee5a')
        .then(result=>{
          this.processData(JSON.parse(result.text));
        })
        .catch(error=>{
          this.processError(error, 'not found any matching city, please insert city name correctly');
        });
    }
  }

  getWeatherFromCoordinates(firstCoordinate, firstCoordinateSign, secondCoordinate, secondCoordinateSign){
    if (!firstCoordinate || !secondCoordinate || isNaN(Number(firstCoordinate)) || isNaN(Number(secondCoordinate))
        || Number(firstCoordinate) < 0 || Number(firstCoordinate) > 90 || Number(secondCoordinate) < 0 || Number(secondCoordinate) > 180
        || (firstCoordinateSign.toUpperCase() !== "N" && firstCoordinateSign.toUpperCase() !== "S")
        || (secondCoordinateSign.toUpperCase() !== "E" && secondCoordinateSign.toUpperCase() !== "W")){
      this.props.setErrorMessage('no such coordinates, please insert coordinates correctly');
    } else {
      var first = firstCoordinateSign.toUpperCase() === "S" ? -firstCoordinate : firstCoordinate;
      var second = secondCoordinateSign.toUpperCase() === "W" ? -secondCoordinate : secondCoordinate;
      Request.get('http://api.openweathermap.org/data/2.5/weather?lat=' + first + '&lon=' + second + '&APPID=e1ee566c1c83e3b04456992ef1caee5a')
        .then(result=>{
          this.processData(JSON.parse(result.text));
        })
        .catch(error=>{
          this.processError(error, 'no such coordinates, please insert coordinates correctly');
        });
    }
  }

  render() {
    return (
      <div className="container">
        {errorMessage(this.props)}
        <div className="weather-panel">
          <div className="input-panel mb20">
            <div className="row">
              <div className="col-sm-6">
                <h1>Find your weather!</h1>
              </div>
              <div className="col-sm-6">
                <div className="row">
                  <div className="col-xs-6">
                    <button className="btn btn-success get-weather-btn" onClick={()=>this.props.changeInputType('city')}>by city</button>
                  </div>
                  <div className="col-xs-6">
                    <button className="btn btn-success get-weather-btn" onClick={()=>this.props.changeInputType('coordinates')}>by coordinates</button>
                  </div>
                </div>
              </div>
            </div>
            {weatherInput(this.props, this)}
          </div>
          {weatherResults(this.props)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    weather: state.weather,
    weatherPanel: state.weatherPanel,
  };
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    addNewWeather:addNewWeather,
    removeWeather:removeWeather,
    changeInputType:changeInputType,
    setErrorMessage: setErrorMessage,
    removeErrorMessage: removeErrorMessage
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WeatherPanel);
