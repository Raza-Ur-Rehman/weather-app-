let search = document.getElementById("search");
let btn = document.getElementById("btn");
let error = document.getElementById("error");
let curntlocation = document.getElementById("location");
let loader = document.querySelector(".loading");
let notfound = document.querySelector(".notfound-box");
let section1 = document.querySelector(".section1");
let cityBox = document.querySelector(".city-box")
let section2 = document.querySelector(".section2");
let API_KEY = "6a2cbb94ad82ec57712155442fb8198c";

// console.log(newdate);
function fetchData() {
  if (search.value.trim() === "") {
    error.innerText = "Please Input a City name";
    setTimeout(() => {
      error.innerText = "";
    }, 1500);
  } else {
    // box.innerHTML = `<p>loading.....</p>`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showData(data))
      .catch((err) => {
          notfound.innerHTML = `<img class="notfound" src="assest/imges/not-found.png"/>`;
          section1.innerHTML = "";
          cityBox.innerHTML = "";
          section2.style.display = "none";
      });
  }
  search.value = "";
}
let currentDate = new Date();
function showData(data) {
  notfound.innerHTML = "";

  const { temp, feels_like } = data.main;
  const {speed} = data.wind;
  let updatedTemp = Math.floor(temp);
  let feelMax = Math.floor(feels_like);
  let { main, icon, id } = data.weather[0];
  let urlImg;

  if (id >= 200 && id <= 232) {
    urlImg = "/assest/imges/storm.png";
    // body.className += ' bg thunderstorms';
  } else if (id >= 300 && id <= 321) {
    urlImg = "/assest/imges/drizzle.png";
    // body.className += ' bg drizzle';
  } else if (id >= 500 && id <= 531) {
    urlImg = "/assest/imges/heavy-rain.png";
    // body.className += ' bg rain';
  } else if (id >= 600 && id <= 622) {
    urlImg = "/assest/imges/snow.png";
    // body.className += ' bg snow';
  } else if (id >= 701 && id <= 781) {
    urlImg = "/assest/imges/cloudy.png";
    // body.className += ' bg cloudy';
  } else if (id >= 801 && id <= 804) {
    urlImg = "/assest/imges/clouds.png";
    // body.className += ' bg clouds';
  } else {
    urlImg = "/assest/imges/sun.png";
    // body.className += ' bg sun';
  }

  cityBox.innerHTML =`
                <h1 id="city">${data.name} <span id="country">${data.sys.country}</span></h1>
                    <span id="date">${data.timezone}</span>`
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
                        <p><i class="fa-solid fa-water"></i> Humidity : <span id="humidity"></span></span>%</p>
                        <p><i class="fa-solid fa-wind"></i> Wind : <span id="wind">${speed}</span>km/h</p>
                    </div>
                </div>
`
console.log(data);


















}
search.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        fetchData();
    }
});


btn.addEventListener('click', fetchData);
