import React from 'react';
import './App.css';

// import NasaService from '../../services/NasaService'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class App extends React.Component {
  
 

  state = {
    image: "",
    data: "",
    date: new Date()
  }

  // componentDidUpdate () {
  //     const stateDate = this.state.date
  //     const kjh = String(stateDate)
  //     const year = kjh.match(/[0-9]{4}/);
    
  //   return year;
  // }
  
  
  async getData  () {
    const data = Math.round(Math.random()*30);
  
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${this.onChange(this.state.date)}-05-${data}&hd=True&api_key=TmzKsJwGltpO9CFAxZbP4JFrG8QipD4IXChaMjmZ`);

      console.log(response)
    if(!response.ok){
        throw new Error(`we have a problem with fetch`);
    }

    
    return await response.json();
    
  }


  componentDidMount () {
    this.getInfo();
}

  getInfo () {
    this.getData()
    .then((body) => {
      this.setState({
        image: body.url,
        data: body.date
      })
    })
    console.log(this.state.date)
    
  ;}

  onChange = (date) => {
    

    const stateDate = this.state.date
    const string = String(stateDate)
    const year = string.match(/[0-9]{4}/)[0];
    console.log(year)

    this.setState({ 
      date,
      image: this.getData.url
     })

     console.log(this.state.url)

    return year;
  }
  
  
  

  render(){

    

    
    
    return (
      <div className="App">
          <img src={this.state.image} alt="kj" className="imageApp"/>
          <div>
            <p>{this.state.data}</p>
          </div>
          <Calendar 
              onChange={this.onChange}
              value={this.state.date}
          />
      </div>
    )
    }
      
}
