import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Weather provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Weather {
  
  data: any;
  
  constructor(public http: Http) { }

  weatherForLocation(lat, long) {
    return new Promise(resolve => {
      this.http.get("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=metric&appid=d23d1a868bb3b2efb8baaaa72af613fa")
        .map(res => res.json()).subscribe(data => {
          this.data = data;
          resolve(this.data);
        })
    })
  }
}
