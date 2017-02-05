import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewWeather, removeWeather, changeInputType, setErrorMessage, removeErrorMessage} from '../actions';
import Request  from 'superagent';


class WeatherPanel extends Component {


  processData(data){
    var weatherData = {
      coord: (data.coord.lat > 0 ? data.coord.lat + ' N, ' : -data.coord.lat + ' S, ') + (data.coord.lon > 0 ? data.coord.lon + ' E' : -data.coord.lon + ' W'),
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


  getWeatherFromCityName(inputField) {
    if (inputField){
      var splits = inputField.split(',');
      if (splits.length === 1) {
        Request.get('http://api.openweathermap.org/data/2.5/weather?q=' + splits[0] + '&APPID=e1ee566c1c83e3b04456992ef1caee5a')
            .then(result=>{
              if (this.props.weatherPanel.errorMessage){
                this.props.removeErrorMessage();
              }
              this.processData(JSON.parse(result.text));
            })
            .catch(error=> {
             if (error.status === "502") {
               this.props.setErrorMessage('Your city name is wrong');
             }
            })
      } else {
        console.log(splits[splits.length-2], splits[splits.length-1]);
        Request.get('http://api.openweathermap.org/data/2.5/weather?q=' + splits[splits.length-2] + ',' + splits[splits.length-1] + '&APPID=e1ee566c1c83e3b04456992ef1caee5a')
            .then(result=>{
              if (this.props.weatherPanel.errorMessage){
                this.props.removeErrorMessage();
              }
              this.processData(JSON.parse(result.text));
            })
            .catch(error=> {
              if (error.status === "502"){
                this.props.setErrorMessage('Your city name is wrong');
              }
            })
      }
    }
  }

  getWeatherFromCoordinates(firstCoordinate, firstCoordinateSign, secondCoordinate, secondCoordinateSign) {
    if (!firstCoordinate || !secondCoordinate || isNaN(Number(firstCoordinate)) || isNaN(Number(secondCoordinate))
        || Number(firstCoordinate) < 0 || Number(firstCoordinate) > 90 || Number(secondCoordinate) < 0 || Number(secondCoordinate) > 180
        || (firstCoordinateSign.toUpperCase() !== "N" && firstCoordinateSign.toUpperCase() !== "S")
        || (secondCoordinateSign.toUpperCase() !== "E" && secondCoordinateSign.toUpperCase() !== "W")){
      console.log('wrong');
      this.props.setErrorMessage('Your coordinates are wrong');
    } else {
      if (this.props.weatherPanel.errorMessage){
        this.props.removeErrorMessage();
      }
      if (firstCoordinateSign.toUpperCase() === "S"){
        firstCoordinate = -firstCoordinate;
      }
      if (secondCoordinateSign.toUpperCase() === "W"){
        secondCoordinate = -secondCoordinate;
      }
      Request.get('http://api.openweathermap.org/data/2.5/weather?lat=' + firstCoordinate + '&lon=' + secondCoordinate + '&APPID=e1ee566c1c83e3b04456992ef1caee5a')
          .then(result=>{
            this.processData(JSON.parse(result.text));
          })
          .catch(error=> {
            if (error.status === "502"){
              this.props.setErrorMessage('Your coordinates are wrong');
            }
          });
    }
    console.log('aaa', arguments);
  }

  renderWeather() {
    if (this.props.weather.length) {
      return this.props.weather.map((weather)=>{
        return(
          <div className="weather-tile" key={weather.id}>
            <div className="row">
              <div className="col-sm-4 city-name">{weather.city}</div>
              <div className="col-sm-8">weather details</div>
              <button className="btn btn-success" onClick={()=>this.props.removeWeather(weather)}>remove</button>
            </div>
          </div>
        )
      })
    }
  }
  renderWeatherInput(){
    if (this.props.weatherPanel.inputType === 'city') {
      return(
        <div className="row">
          <div className="col-sm-2">
            <button className="btn btn-success get-weather-btn" onClick={()=>this.getWeatherFromCityName($('#weather-input-city')[0].value)}>go!</button>
          </div>
          <div className="col-sm-10">
            <input id="weather-input-city" type="text" placeholder="enter city name" onChange={()=>$('#weather-input-city').geocomplete()}/>
          </div>
        </div>
  )
    } else if (this.props.weatherPanel.inputType === 'coordinates') {
      return(
        <div className="row">
          <div className="col-sm-2">
            <button className="btn btn-success get-weather-btn"
                    onClick={()=>this.getWeatherFromCoordinates($('#first-coordinate')[0].value, $('#first-coordinate-sign')[0].value, $('#second-coordinate')[0].value, $('#second-coordinate-sign')[0].value)}>go!</button>
          </div>
          <div className="col-sm-10">
            <div className="row">
              <div className="col-xs-4">
                <input id="first-coordinate" placeholder="00.0000" onFocus={()=>this.type='number'}/>
              </div>
              <div className="col-xs-2">
                <select id="first-coordinate-sign">
                  <option value="N">N</option>
                  <option value="S">S</option>
                </select>
              </div>
              <div className="col-xs-4">
                <input id="second-coordinate" placeholder="000.0000" onFocus={()=>this.type='number'}/>
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
      )
    }
  }

  renderErrorMessage(){
    console.log('rr');
    if (this.props.weatherPanel.errorMessage){
      return(
            <div className="error-message">{this.props.weatherPanel.errorMessage}</div>
      )
    }
  }


  render() {
    return (
      <div className="container">
        {this.renderErrorMessage()}
        <div className="weather-panel">
          <div className="input-panel">
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
            {this.renderWeatherInput()}
          </div>
          {this.renderWeather()}
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
