let weather = {
  apiKey: "de73054e60b0ad88668715aeb57d2d63",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { country } = data.sys;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Clima em " + name + ", " + country;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = traduzClima(description);
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Umidade: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Velocidade do vento: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Denver");

function traduzClima(clima){
    clima = clima.toLowerCase()

    if(clima === "clear sky"){
        return "Céu Limpo";
    }
    else if(clima === "broken clouds"){
        return "Nuvens Fragmentadas"
    }
    else if(clima === "few clouds"){
        return "Poucas Nuvens"
    }
    else if(clima === "scattered clouds"){
        return "Nuvens Dispersas"
    }
    else if(clima === "overcast clouds"){
        return "Nublado"
    }
    else if (clima === "light snow"){
        return "Neve Fraca"
    }
    else if(clima === "moderate rain"){
        return "Chuva Moderada"
    }
    else if(clima === "light rain"){
        return "Chuva Leve"
    }

    return clima
}