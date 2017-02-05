import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addNewWeather, removeWeather, moveWeatherUp, changeInputType} from '../actions';
import Request  from 'superagent';


class WeatherPanel extends Component {


  getWeatherFromCityName(inputField) {
    var splits = inputField.split(',');
    if (splits.length === 1) {
      console.log('message1');
    } else {
      console.log(splits[splits.length-2], splits[splits.length-1]);
    }
    Request.get('http://api.openweathermap.org/data/2.5/weather?q=' + splits[splits.length-2] + ',' + splits[splits.length-1] + '&APPID=e1ee566c1c83e3b04456992ef1caee5a')
    .then(result=>{
      console.log('eee', result.text);
    })
  }

  getWeatherFromCoordinates(inputField) {

  }

  renderWeather() {
    if (this.props.weather.length) {
      return this.props.weather.map((weather)=>{
        return(
          <div className="weather-tile" key={weather.id}>
            <div className="row">
              <div className="col-sm-4 city-name">{weather.city}</div>
              <div className="col-sm-8">weather details</div>
              <button className="btn btn-success" onClick={()=>this.props.addNewWeather()}>addnew</button>
              <button className="btn btn-success" onClick={()=>this.props.removeWeather(weather.id)}>remove</button>
              <button className="btn btn-success" onClick={()=>this.props.moveWeatherUp(weather.id)}>move up</button>
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
            <button className="btn btn-success get-weather-btn" onClick={()=>this.getWeatherFromCityName($('#weather-input')[0].value)}>go!</button>
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
            <button className="btn btn-success get-weather-btn" onClick={()=>this.getWeatherFromCoordinates($('#weather-input')[0].value)}>go!</button>
          </div>
          <div className="col-sm-10">
            <div className="row">
              <div className="col-xs-4">
                <input placeholder="00.0000" onfocus="this.type='number';" max="90"/>
              </div>
              <div className="col-xs-2">
                <select>
                  <option value="N">N</option>
                  <option value="S">S</option>
                </select>
              </div>
              <div className="col-xs-4">
                <input placeholder="000.0000" onfocus="this.type='number';"/>
              </div>
              <div className="col-xs-2">
                <select>
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


  render() {
    return (
      <div className="container">
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
    moveWeatherUp:moveWeatherUp,
    changeInputType:changeInputType
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WeatherPanel);
