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
      cityWeather: null,            // Pour les données météo actuelles
      cityForecast: null,           // Pour les prévisions horaires
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
        return this.cityList.some(item =>
          item.name.toUpperCase() === _cityName.toUpperCase()
        );
      },
      meteo: function (_city) {
        this.cityWeatherLoading = true;

        // Appel de l'API OpenWeatherMap pour obtenir les données météo actuelles
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + _city.name + '&units=metric&lang=fr&appid=eb3860cbfc7492f75d59029d99f49fcf')
          .then(response => response.json())
          .then(json => {
            if (json.cod === 200) {
              // Sauvegarder les données météo actuelles
              this.cityWeather = json;
              this.message = null;

              // Maintenant, appel de l'API pour obtenir les prévisions horaires
              this.getForecast(json.coord.lat, json.coord.lon);

            } else {
              this.cityWeather = null;
              this.message = 'Météo introuvable pour ' + _city.name + ' (' + json.message + ')';
              this.cityWeatherLoading = false;
            }
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des données : ', error);
            this.cityWeatherLoading = false;
            this.message = 'Erreur lors de la récupération des données.';
          });
      },
      // Nouvelle méthode pour appeler l'API des prévisions horaires
      getForecast: function (latitude, longitude) {
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=eb3860cbfc7492f75d59029d99f49fcf&units=metric&lang=fr`)
          .then(response => response.json())
          .then(json => {
            this.cityWeatherLoading = false;
            if (json.cod !== "200") {
              this.message = 'Erreur lors de la récupération des prévisions horaires';
              return;
            }
            // Sauvegarder les prévisions horaires
            this.cityForecast = json.list; // Récupérer les prévisions horaires
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des prévisions horaires : ', error);
            this.cityWeatherLoading = false;
            this.message = 'Erreur lors de la récupération des prévisions horaires.';
          });
      },
      // Méthode pour générer l'URL de la carte avec les coordonnées
      getMapUrl: function (latitude, longitude) {
        return `https://maps.googleapis.com/maps/api/staticmap?markers=${latitude},${longitude}&zoom=10&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg`;
      },
    },
  });
};
