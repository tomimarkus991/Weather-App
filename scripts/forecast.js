class Forecast {
  constructor() {
    // this.key = 'Your Key https://developer.accuweather.com/';
    this.key = "mTcTbhqEDYhGeWtcEGpACrNJlZ4mfP61";
    // this.locationKey = 'Your Key https://opencagedata.com/ ';
    this.locationKey = "a1b3fb7dc9e34bfba097f0a5bfa6bd2e";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
  }
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }
  async getWeather(locationID) {
    const query = `${locationID}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}
