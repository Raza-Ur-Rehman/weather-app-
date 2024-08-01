let search = document.getElementById("search");
let btn = document.getElementById("btn");
let error = document.getElementById("error");
let curntlocation = document.getElementById("location");
let loader = document.querySelector(".loading");
let notfound = document.querySelector(".notfound-box");
let box = document.querySelector(".box");
let API_KEY = "6a2cbb94ad82ec57712155442fb8198c";

// console.log(newdate);
function fetchData() {
    if(search.value.trim() === "") {
        error.innerText = "Please Input a City name";
        setTimeout(() => {
            error.innerText = "";
        }, 1500);
    }
    else {
        // box.innerHTML = `<p>loading.....</p>`;
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`;
        fetch(url)
            .then((res) => res.json())
            .then((data) => showData(data))
            .catch((err) => {
                // notfound.innerHTML = `<img class="notfound" src="assest/imges/not-found.png"/>`;
                // box.innerHTML = "";
            });
    }
    search.value = '';
}
let city = document.getElementById("city");
let date = document.getElementById("date");
let tempereture = document.getElementById("temp");
let discription = document.getElementById("description");
let feelTemp = document.getElementById("feeltemp");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");
let img = document.getElementById("condition-img");
// let newdate = new Date();
function showData(data) {
    console.log(data);
    const { country } = data.sys;
    const { temp } = data.main;
    let updatedTemp = Math.floor(temp);
    let { main, icon, id } = data.weather[0];
    let urlImg = img.src; 
    if (id >= 200 && id <= 232) {
        img.src = '/assets/imges/storm.png';
        // body.className += ' bg thunderstorms';
    } else if (id >= 300 && id <= 321) {
        img.src = '/assets/imges/drizzle.png';
        // body.className += ' bg drizzle';
    } else if (id >= 500 && id <= 531) {
        img.src = '/assets/imges/heavy-rain.png';
        // body.className += ' bg rain';
    } else if (id >= 600 && id <= 622) {
        img.src = '/assets/imges/snow.png';
        // body.className += ' bg snow';
    } else if (id >= 701 && id <= 781) {
        img.src = '/assets/imges/cloudy.png';
        // body.className += ' bg cloudy';
    } else if (id >= 801 && id <= 804) {
        img.src = '/assets/imges/clouds.png';
        // body.className += ' bg clouds';
    } else {
        img.src = '/assets/imges/sun.png';
        // body.className += ' bg sun';
    }
    city.innerText = data.name;
    tempereture.innerText = updatedTemp;

    // date.innertext = newdate();
}








