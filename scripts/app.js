const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const forecast = new Forecast();

const updateUI = (data) => {

    // destructure properties
    const { cityDetails, weather } = data;

    // update details template
    const html = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>`;
    details.innerHTML = html;

    // update the night/day & icon images
    const iconSrc = `./img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);

    // remove the d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none');
    }
};

cityForm.addEventListener('submit', e => {
    // prevent default action
    e.preventDefault();

    // get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // update the ui with new city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // set local storage
    localStorage.setItem('city', city);
});

if (localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
const success = async (position) => {

    // get Latitude & Longitude
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // convert Latitude & Longitude to City
    const base = 'https://api.opencagedata.com/geocode/v1/json?';
    const query = `q=${latitude}+${longitude}&key=${forecast.locationKey}`;
    const response = await fetch(base + query);

    const data = await response.json();

    const theCity = data.results[0].components.city;

    // Update the city to your Location
    forecast.updateCity(theCity)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
};

// Ask for permission
const getSuccess = !navigator.geolocation ?
    console.log('Geolocation is not supported by your browser') :
    navigator.geolocation.getCurrentPosition(success);