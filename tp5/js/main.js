var app;
window.onload = function () {
  app = new Vue({
    el: "#weatherApp",
    data: {
      loaded: false,
      formCityName: "",
      message: "WebApp Loaded.",
      messageForm: "",
      cityList: [{ name: "Paris" }],
      cityWeather: null,
      cityWeatherLoading: false,
    },
    mounted: function () {
      this.loaded = true;
      this.readData();
    },
    methods: {
      readData: function () {
        console.log("JSON.stringify(this.cityList)", JSON.stringify(this.cityList));
        console.log("this.loaded:", this.loaded);
      },
      addCity: function (event) {
        event.preventDefault();
        if (this.isCityExist(this.formCityName)) {
          this.messageForm = 'La ville existe déjà';
        } else {
          this.cityList.push({ name: this.formCityName });
          this.messageForm = "";
          this.formCityName = "";
        }
      },
      remove: function (_city) {
        this.cityList = this.cityList.filter(item => item.name !== _city.name);
      },
      isCityExist: function (_cityName) {
        return this.cityList.filter(item =>
          item.name.toUpperCase() === _cityName.toUpperCase()
        ).length > 0;
      },
      meteo: function (_city) {
        this.cityWeatherLoading = true;

        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + _city.name + '&units=metric&lang=fr&apikey=eb3860cbfc7492f75d59029d99f49fcf')
          .then(response => response.json())
          .then(json => {
            this.cityWeatherLoading = false;

            if (json.cod === 200) {
              this.cityWeather = json;
              this.message = null;
            } else {
              this.cityWeather = null;
              this.message = 'Météo introuvable pour ' + _city.name + ' (' + json.message + ')';
            }
          });
      },
      getMapUrl: function (latitude, longitude) {
        return `https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=10&size=600x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;
      },
    },
  });
};
