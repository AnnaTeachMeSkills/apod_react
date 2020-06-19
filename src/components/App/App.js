import React from 'react';
import './App.css';


import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default class App extends React.Component {
  
  state = {
    photo: 'https://apod.nasa.gov/apod/image/2005/PorpoiseGalaxy_HubbleFraile_1300.jpg',
    date: new Date(2019, 10,11) , 
  }

  componentDidMount = (date) => {
    const first = sessionStorage.getItem('firstdate')
    this.setState({
      date: new Date(first)
    })
    this.getData()
  }
  
  async getData  () {
    const fuultear = this.state.date.getFullYear()
    const day = this.state.date.getDate()
    const month = this.state.date.getMonth()
  
    const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${fuultear}-${month}-${day}&hd=True&api_key=TmzKsJwGltpO9CFAxZbP4JFrG8QipD4IXChaMjmZ`);
    
    if(!response.ok){
        // throw new Error(`we have a problem with fetch`)
        return (
          <div>
            <p>Выберите дату</p>
          <Calendar 
              onChange={this.onChange}
              value={this.state.date}
          />
          </div>
        )
    }

    return await response.json();
  }


  onChange = (date) => {
    this.setState ({
      date,
    })

    this.getData()
     .then((body) => {
       sessionStorage.setItem('firstdate', this.state.date)
       this.setState({
         photo: body.url,
       })
      })
  }


  render(){

    let {photo, date} = this.state;
    
    if (date > new Date()){
      return (
          <div className="App">
              <div className='AppUncoorectDate'>
                <p>Проверьте выбранную дату!</p>
            </div> 
              <Calendar 
                  onChange={this.onChange}
                  value={this.state.date}
              />
          </div>
      )
    }
    
    if ((photo === undefined)||(photo.indexOf("apod.nasa.gov") === -1)) {
      return (
      <div className="App">
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
              defaultActiveStartDate={new Date()} 
          />
      </div>
    )
    }
      
}

