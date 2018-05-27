import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout/Layout';
import Header from '../components/Header/Header';
import CityForm from '../components/CityForm/CityForm';
import Places from '../containers/Places/Places';

class App extends Component {
  state = {
    places: [],
    auth: false
  }

  async componentDidMount() {
    const {data:user} = await axios('/api/current_user');
    if(user) {
      this.setState({auth: true});
    }
  }

  getPlaces = async (city) => {
    const { data } = await axios.post('/api/getPlaces', {city});
    this.setState({places: data});
  }

  clickGoing = async (name) => {
    if(!this.state.auth) return;
    // console.log('toggle going or not going', name);
    const {data: places} = await axios.post('/api/going', {name});
    // console.log(places);
    this.setState({places})
  }


  render() {
    return (
      <Layout>
        <Header auth={this.state.auth}/>
        <CityForm getPlaces={this.getPlaces} auth={this.state.auth}/>
        <Places places={this.state.places} clickGoing={this.clickGoing}/>
      </Layout>
    );
  }
}

export default App;
