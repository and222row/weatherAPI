//* HTML Elements
const home = document.querySelector(".home");
const max = document.querySelector(".max-temp");
const min = document.querySelector(".min-temp");
const city = document.querySelector(".location");
const date = document.querySelector(".date");
const row = document.querySelector(".my-row");
const inputName = document.querySelector("#name");
const searchBtn = document.querySelector("#search");
const photo = document.querySelector(".photo");
const current = document.querySelector(".current");
const condition = document.querySelector(".condition");
const icon = document.querySelector(".icon");
const localTime = document.querySelector(".local-time");
const content = document.querySelectorAll(".content");

//* App variable
let maxTemp;
let minTemp;
let cityApi;
let dateApi;
let allData;
let photoApi;
let rndInt;

//* Functions

//* get the weather from API
async function getWeather(name) {
  let response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=ed9691a39a254473b8404931241306&q=${name}&days=4`
  );
  let data = await response.json();

  allData = data;

  console.log(data);
}

//* get the Photo from API
async function getPhoto(name) {
  let response = await fetch(
    `https://api.unsplash.com/search/photos?query=${name}&client_id=vuVMSB3uqN8uxeF-4BpxYS9Qy16x-HHBaw0rYdnO_j0`
  );
  console.log(response);
  let photoData = await response.json();
  photoApi = photoData;
  console.log(photoData.results[rndInt].urls.small);
}
//* display the Photo in HTML
async function displayPhoto() {
  rndInt = Math.floor(Math.random() * 6) + 1;
  console.log(rndInt);
  photo.classList.remove(
    "animate__animated",
    "animate__bounceInUp",
    "animate__fast"
  );
  photo.removeAttribute("src");
  await getPhoto(inputName.value ? inputName.value : "berlin");
  photo.setAttribute("src", photoApi.results[rndInt].urls.small);
  photo.classList.add(
    "animate__animated",
    "animate__bounceInUp",
    "animate__fast"
  );
}
//* display the Weather in HTML
async function disblayWeather() {
  for (let i = 0; i < content.length; i++) {
    content[i].classList.remove(
      "animate__animated",
      "animate__zoomIn",
      "animate__fast"
    );
  }

  row.innerHTML = "";
  await getWeather(inputName.value ? inputName.value : "berlin");
  let date = new Date(allData.current.last_updated);
  let day = date.getDate();
  let month = date.toLocaleString("default", { month: "short" });
  let hours = date.getHours().toString();
  let minutes = date.getMinutes();
  let weekDay = date.toLocaleString("default", { weekday: "short" });
  console.log(hours);

  for (let i = 0; i < allData.forecast.forecastday.length; i++) {
    let newDate = new Date(allData.forecast.forecastday[i].date);
    let newDateDay = newDate.toLocaleString("default", { weekday: "long" });

    maxTemp = allData.forecast.forecastday[i].day.maxtemp_c;
    minTemp = allData.forecast.forecastday[i].day.mintemp_c;
    dateApi = allData.forecast.forecastday[i].date;
    cityApi = allData.location.name;
    current.innerHTML = allData.current.temp_c + ` &#x2103;`;
    condition.innerHTML = allData.current.condition.text;
    icon.setAttribute("src", `https:${allData.current.condition.icon}`);
    localTime.innerHTML = allData.location.localtime;
    inputName.value = "";
    if (allData.current.condition.text.toUpperCase().includes("CLOUD")) {
      console.log(allData.current.condition.text);
      home.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('./images/cloud.webp')";
    } else if (allData.current.condition.text.toUpperCase().includes("RAIN")) {
      home.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('./images/rain.jpg')";
    } else if (allData.current.condition.text.toUpperCase().includes("SNOW")) {
      home.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('./images/snow.jpg')";
    } else {
      home.style.backgroundImage =
        "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url('./images/sunny-weather.png')";
    }
    let weatherCard = `<div
          class="col-sm-6 col-md-4 col-lg-3 animate__animated animate__bounceInLeft animate__fast"
          id="test"
        >
    <div class="card text-center content">
            <img src="https:${allData.forecast.forecastday[i].day.condition.icon}" class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h3 class="card-title test-center">${cityApi}</h3>
                <p><span class="date fw-bold">${newDateDay}</span></p>
                <div class="temp d-flex align-items-center justify-content-between">
                    <span class="max-temp fw-bold">${maxTemp} &#x2103;</span>
                    <span class="min-temp fw-bold">${minTemp} &#x2103;</span>
                </div>
            </div>
            <div class="card-footer">
                <span class="text-body-secondary fs-6">Last updated:</span>
                <div class="d-flex justify-content-between">
                  <div>
                    <span>${weekDay}</span>:
                    <span>${day}</span>:
                    <span>${month}</span>
                  
                  </div>
                  <div>
                    <span>${hours}</span>:
                    <span>${minutes}</span>
                  </div>
                </div>
            </div>
  </div>
  </div>`;

    row.innerHTML += weatherCard;
  }
  for (let i = 0; i < content.length; i++) {
    content[i].classList.add(
      "animate__animated",
      "animate__zoomIn",
      "animate__fast"
    );
  }
}
displayPhoto();
disblayWeather();

//* Events

searchBtn.addEventListener("click", function () {
  disblayWeather();
  displayPhoto();
});
inputName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    console.log("enter");
    disblayWeather();
    displayPhoto();
    e.preventDefault();
  }
});
