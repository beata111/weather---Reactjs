import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setViewMode} from '../actions';


class WeatherPanel extends Component {

  renderWeather() {
    if (this.props.weather.length) {
      return this.props.weather.map((weather)=>{
        return(
          <div className="weather-tile" key={weather.id}>
            <div className="row">
              <div className="col-sm-4 city-name">{weather.city}</div>
              <div className="col-sm-8">weather details</div>
            </div>
          </div>
        )
      })
    }
  }

  render() {
    return (
      <div className="container">
        {this.renderWeather()}
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
  }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(WeatherPanel);
