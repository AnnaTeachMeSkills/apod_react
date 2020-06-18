import React from 'react';
import './App.css';

// import NasaService from '../../services/NasaService'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class App extends React.Component {
  
 

  state = {
    photo: "",
    date: new Date()
  }

  componentDidMount() {
    this.getData()
  }

  async getData  () {
    console.log(this.state.date)

    const fuultear = this.state.date.getFullYear()
    const day = this.state.date.getDate()
    const month = this.state.date.getMonth()
  
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${fuultear}-${month}-${day}&hd=True&api_key=TmzKsJwGltpO9CFAxZbP4JFrG8QipD4IXChaMjmZ`);
    
      console.log(response)
    if(!response.ok){
        throw new Error(`we have a problem with fetch`);
    }

    
    return await response.json();


  }




getInfo () {
  this.getData()
  .then((body) => {
    console.log(body)
    this.setState({
      photo: body.url,
    })
  })
}

  onChange = (date) => {
    this.setState({ 
      date,
     })

     this.getInfo()
     console.log(this.state.photo)

     console.log(this.state)
  

  }

  

  render(){

    const {photo} = this.state;

    

    return (
      <div className="App">
          <img src={photo} alt="kj" className="imageApp"/>
          <Calendar 
              onChange={this.onChange}
              value={this.state.date}
              
          />
      </div>
    )
    }
      
}
