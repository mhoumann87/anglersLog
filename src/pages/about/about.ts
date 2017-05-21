import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Catch } from '../../models/catch';
import { Weather } from '../../providers/weather';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  
  weatherData: any = {};
  catch = new Catch();

  constructor(public navCtrl: NavController, private geololocation: Geolocation, public weather: Weather) {

    this.catch.datetime = new Date().toLocaleString();

    this.geololocation.getCurrentPosition().then((resp) => {
   
     this.getWeather(resp.coords.latitude, resp.coords.longitude);
     
     this.catch.latitude = resp.coords.latitude;
     this.catch.longitude = resp.coords.longitude;
        
    }).catch((error) => {
      console.log('Error getting location', error)
    });
}

  getWeather(latitude, longitude) {
    this.weather.weatherForLocation(latitude, longitude)
      .then(data => {
        this.weatherData = data;
        
        this.catch.location = this.weatherData.name;
        
        let temp = this.weatherData.main['temp'];

        for (let weather of this.weatherData.weather) {
          weather = weather.description;
          this.catch.weather = 'temp ' + temp + ' degrees ' + weather;
        }
      })
  }

  sendLog() {
    console.log(this.catch.length);
    let log = {
      "anglers_name" : this.catch.anglers_name,
      "datetime"      : this.catch.datetime,
      "fishing_method": this.catch.fishing_method,
      "breed"         : this.catch.breed,
      "lenght"        : this.catch.length,
      "weight"        : this.catch.weight,
      "weather"       : this.catch.weather,
      "location"      : this.catch.location,
      "latitude"      : this.catch.latitude,
      "longitude"     : this.catch.location
    };

    console.log(log);
  }
  

}
