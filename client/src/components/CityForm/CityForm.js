import React, { Component } from 'react';

class CityForm extends Component {

  state = {
    city: null
  }

  onSubmit = async (e) => {
    e.preventDefault();
    if(!this.props.auth && !this.state.city) return;
    // console.log('get places');
    this.props.getPlaces(this.state.city);

  }



  render() {
    return (
      <form className="CityForm" onSubmit={this.onSubmit}>
        <input type="text" placeholder="what city?" onChange={(e) => this.setState({city: e.target.value})}/>
        <button type="submit">go</button>
      </form>
    )
  }
}

export default CityForm;