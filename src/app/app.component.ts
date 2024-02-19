import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  serviceData: number = 1000;
  weatherData: any = {};
  searchQuery: string = '';
  dateString: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getWeather();
    this.updateDateTime();
  }

  getWeather() {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.searchQuery}&appid=5b4bee0ba241d092159faf007e166080`)
      .subscribe(
        (data: any) => this.weatherData = data,
        error => console.error('Error fetching weather data', error)
      );
  }

  kelvinToCelsius(tempInKelvin: number): string {
    return (tempInKelvin - 273.15).toFixed(2);
  }

  getWeatherType(): string {
    return this.weatherData.weather?.[0]?.main || '';
  }

  getHumidity(): string {
    return this.weatherData.main?.humidity?.toFixed(2) || '';
  }

  kelvinToCelsiusFeelsLike(tempInKelvin: number): string {
    return (tempInKelvin - 273.15).toFixed(2);
  }

  getSeaLevel(): string {
    return this.weatherData.main?.sea_level ;
  }

  getGroundLevel(): string {
    return this.weatherData.main?.grnd_level;
  }

  updateDateTime() {
    const currentDate = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };

    const datePart = currentDate.toLocaleDateString('en-US', dateOptions);
    const timePart = currentDate.toLocaleTimeString('en-US', timeOptions);

    this.dateString = `${datePart} <br> ${timePart}`;
  }
}
