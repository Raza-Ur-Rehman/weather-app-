let search = document.getElementById("search");
let btn = document.getElementById("btn");
let eror = document.getElementById("error");
let curntlocation = document.getElementById("location");
let loader = document.querySelector(".loading");
let notfound = document.querySelector(".notfound-box");
let section1 = document.querySelector(".section1");
let cityBox = document.querySelector(".city-box")
let API_KEY = "6a2cbb94ad82ec57712155442fb8198c";
let currentDate = new Date().toLocaleDateString();
function fetchData() {
  if (search.value.trim() === "") {
    eror.innerText = "Please Input a City name";
    setTimeout(() => {
      eror.innerText = "";
    }, 1500);
  } else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showData(data))
      .catch((err) => {
          if (404) {
            notfound.innerHTML = `<img class="notfound" src="assest/imges/not-found.png"/>`;
          section1.innerHTML = "";
          cityBox.innerHTML = "";
          }
      });
  }
  search.value = "";
}

function showData(data) {
  notfound.innerHTML = "";

  const { temp, feels_like,humidity } = data.main;
  const {speed} = data.wind;
  let updatedTemp = Math.floor(temp);
  let feelMax = Math.floor(feels_like);
  let { main, icon, id } = data.weather[0];
  let urlImg;

  if (id >= 200 && id <= 232) {
    urlImg = "assest/imges/storm.png";
  } else if (id >= 300 && id <= 321) {
    urlImg = "assest/imges/drizzle.png";
  } else if (id >= 500 && id <= 531) {
    urlImg = "assest/imges/heavy-rain.png";
  } else if (id >= 600 && id <= 622) {
    urlImg = "./assest/imges/snow.png";
  } else if (id >= 701 && id <= 781) {
    urlImg = "assest/imges/cloudy.png";
  } else if (id >= 801 && id <= 804) {
    urlImg = "assest/imges/clouds.png";
  } else {
    urlImg = "assest/imges/sun.png";

  }

  cityBox.innerHTML =`
                <h1 id="city">${data.name} <span id="country">${data.sys.country}</span></h1>
                    <span id="date">${currentDate}</span>`
  section1.innerHTML = `
                <div class="temp-area">
                    <h1 id="temp">${updatedTemp}</h1>
                    <div class="degree">
                        <span><sup>O</sup>C | <sup>O</sup>F</span>
                        <p id="description">${main}</p>
                    </div>
                </div>
                <div class="img-box">
                    <img id="condition-img" src="${urlImg}" alt="loading">
                    <div class="feel-temp-box">
                        <p><i class="fa-solid fa-temperature-quarter"></i>Feels Max : <span id="feeltemp">${feelMax}</span> <sup>o</sup>C</p>
                        <p><i class="fa-solid fa-water"></i> Humidity : <span id="humidity"></span>${humidity}</span>%</p>
                        <p><i class="fa-solid fa-wind"></i> Wind : <span id="wind">${speed}</span>km/h</p>
                    </div>
                </div>
`
// console.log(data);

}
search.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
});

btn.addEventListener('click', fetchData);


// location function 

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(
      (position) => {
          let lon = position.coords.longitude;
          let lat = position.coords.latitude;
          let Currenturl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
          fetch(Currenturl)
              .then((res) => res.json())
              .then((data) => showData(data))
              .catch((err) => {
                notfound.innerHTML = `<img class="notfound" src="assest/imges/not-found.png"/>`;
                section1.innerHTML = "";
                cityBox.innerHTML = "";
              });
      },
      (error) => {
          const { message } = error;
          eror.innerText = `${message}`;
          setTimeout(() => {
            eror.innerText = "";
          }, 1500);
      }
  );
}

curntlocation.addEventListener('click', getCurrentLocation);