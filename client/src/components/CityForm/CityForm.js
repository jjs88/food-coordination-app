import React, { Component } from 'react';

class CityForm extends Component {

  state = {
    city: null
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if(!this.props.auth && !this.state.city) return;
    // console.log('get places');
    e.target.reset();
    this.props.getPlaces(this.state.city);

  }



  render() {
    return (
      <form className="CityForm" onSubmit={this.onSubmit}>
        <input className="CityForm__input" type="text" placeholder="what city?" onChange={(e) => this.setState({city: e.target.value})}/>
        <button className="CityForm__btn" type="submit">go</button>
      </form>
    )
  }
}

export default CityForm;