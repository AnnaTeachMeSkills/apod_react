import React from 'react';
import './App.css';

// import NasaService from '../../services/NasaService'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class App extends React.Component {
  
 

  state = {
    photo: 'https://apod.nasa.gov/apod/image/2005/PorpoiseGalaxy_HubbleFraile_1300.jpg',
    date: new Date() , 
    dateFirst: null
  }


 
  

  componentDidMount() {
    this.getData()

  
    console.log(this.state)

  }

  async getData  () {
    console.log(this.state.date)


    const fuultear = this.state.date.getFullYear()
    const day = this.state.date.getDate()
    const month = this.state.date.getMonth()
  
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${fuultear}-${month}-${day}&hd=True&api_key=TmzKsJwGltpO9CFAxZbP4JFrG8QipD4IXChaMjmZ`);
    
    if(!response.ok){
        throw new Error(`we have a problem with fetch`);
    }

    
    return await response.json();


  }



  onChange = (date) => {
   
    console.log(this.state.date)

    
  
    this.setState({ 
      date,
    })
    
    console.log(this.state.date)

    this.getData(date)
     .then((body) => {
       console.log(body)
       console.log(this.state)
      //  sessionStorage.setItem('firstdate', this.state.date)
       this.setState({
         photo: body.url,
         dateFirst: sessionStorage.getItem('firstdate')
       })
      })
      
  
      sessionStorage.setItem('firstdate', this.state.date)
  }

  

  render(){

    let {photo} = this.state;

    console.log(photo)
    
    if (photo.indexOf("apod.nasa.gov") === -1) {
      return (
      <div className="App">
          {/* <img src='https://apod.nasa.gov/apod/image/1403/m78_sharp_960.jpg' alt="photo_of_day"/> */}
          <div className="AppImage">
            <p>Не удалось открыть фото.</p> 
            <p>Возможно указанный источник не существует.</p>
            <p>Пожалуйста, выберите другую дату.</p>
            </div>
          <Calendar 
              onChange={this.onChange}
              value={this.state.date}
              
          />
      </div>
      )
    }

    return (
      <div className="App">
          <img src={photo} alt="photo_of_day"/>
          <Calendar 
              onChange={this.onChange}
              value={this.state.date}
              
          />
      </div>
    )
    }
      
}
