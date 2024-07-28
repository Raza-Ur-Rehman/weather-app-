const search = document.getElementById("search");
const btn = document.getElementById("btn");
let API_KEY = "6a2cbb94ad82ec57712155442fb8198c";
const showbox = document.getElementById("show_box");

function fatchData() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&units=metric&appid=${API_KEY}`;
    fetch(url)
       .then((response) => response.json())
       .then((data) => {
            console.log(data);
            showbox.innerHTML = `
            <h1>${data.name}, ${data.sys.country}</h1>
            <h2>Temperature: ${data.main.temp}°C</h2>
            <h2>Humidity: ${data.main.humidity}%</h2>
            <h2>Description: ${data.weather[0].description}</h2>
            `;
        })
       .catch((error) => {
            console.error('Error:', error);
        });
}








