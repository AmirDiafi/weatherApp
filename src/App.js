import React from 'react';


class App extends React.Component {

  state = {
    tempareature : "",
    city : "",
    country : "",
    humidity : "",
    description : "",
    error : ""
  }

  
  dateBuilder = (d) =>{
    let months = ['January', 'February', "March", "April", "May", " June", "July",
    "August", "September", "October", "November", "December"]
    let days = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", " Friday", "Saturday"]

    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
    }

  getWeather = async (e) => {
      e.preventDefault()
      const city = e.target.elements.city.value
      const country = e.target.elements.country.value
      const API_KEY = "31607cb616d24d692b0da2526c7beb27"
      const Url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      const api = await fetch(Url)
      const data = await api.json()
      console.log(data)
      if(city && country) {
        this.setState({
          tempareature :(Math.round(data.main.temp - 273.15)),
          city :data.name,
          country :data.sys.country,
          humidity :data.main.humidity,
          description: data.weather[0].description,
          error : ""
        })
      } else {
        this.setState({
          tempareature :'',
          city :'',
          country :'',
          humidity :'',
          description: '',
          error : "Please Enter Correct Data"
        })
      }
    }

    render() {
      return (
        <div className={(this.state.city !== '') ? (this.state.tempareature > 16)?'App hot': 'App':'App'}>
          <main>
            <div className='search-bar'>
            <form onSubmit={this.getWeather} >
                  <input
                  type="text"
                  name='city'
                  placeholder='City...'
                  className='input-search'
                  />
                  <input
                  type="text"
                  name='country'
                  placeholder='Country...'
                  className='input-search'
                  />
                <button type='submit'>Get Weather</button>
            </form>
            </div>
            <div className="search-location">
              {this.state.country && <h3>{this.state.city}, {this.state.country}</h3>}
              {this.state.country && <p className='date'>{this.dateBuilder(new Date())} </p>}
            </div>
            <div className='weather-details'>
              {this.state.tempareature && <p className='temp'>{this.state.tempareature}&#x2103; </p>}
              {this.state.humidity && <p className='weather'>Humidity {this.state.humidity}</p>}
              {this.state.description && <p className='description'>{this.state.description}</p>}
            </div>
            <div className='err-message'>
              {!this.state.country && <h3>{this.state.error}</h3>}
            </div>
            <div className='err-message'>
              {!this.state.city && <h3>{this.state.error}</h3>}
            </div>
          </main>
        </div>
      )
    }

}

export default App;
