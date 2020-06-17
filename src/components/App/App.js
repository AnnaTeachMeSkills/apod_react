import React from 'react';
import './App.css';

import NasaService from '../../services/NasaService'
import MyCalendar from './MyCalendar';

export default class App extends React.Component {
  nasa = new NasaService();

  state = {
    image: "",
    data: "",
  }

  componentDidMount () {
    this.getInfo();
}

  getInfo () {
    this.nasa.getData()
    .then((body) => {
      this.setState({
        image: body.url,
        data: body.date
      })
    })
    
  ;}
  

  render(){
    return (
      <div className="App">
          <img src={this.state.image} alt="kj" className="imageApp"/>
          <div>
            <p>{this.state.data}</p>
          </div>
          <MyCalendar />
      </div>
    )
    }
      
}
