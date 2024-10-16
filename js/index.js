//* HTML Variables
let searchInput=document.querySelector('form input');
let weatherContainer =document.querySelector('.row');
console.log(weatherContainer)
let days=["Monday","Tuesday","Wednesday","Thursday","Friday",'Saturday',"Sunday"];
let months=["Januanry" ,"Febraury","March","April","May","June","July","August","September","October","November","December"];

async function getWeather(country){
    let response= await fetch(`https://api.weatherapi.com/v1/forecast.json?key=335e4af68a0f4f3b847192106241510&q=${country}&days=3`);

    if(response.status===200){
        let weatherData= await response.json();
        console.log(weatherData)
        await displayToday(weatherData.current,weatherData.location);
        await displayDayAfter(weatherData.forecast.forecastday);
    }
}

searchInput.addEventListener('keyup',(e)=>{
    let country= e.target.value
    getWeather(country);
});

//^ Display Today's weather

function displayToday(data,location){
    todayDate=new Date(data.last_updated);
    let todayName=days[todayDate.getDay()-1];
    let month=months[todayDate.getMonth()];
    let todayNum=todayDate.getDate();
    console.log(todayName)
    let today=`
    <div class="item col-lg-4 col-md-12 p-0">
        <div class="today d-flex justify-content-between">
                    <span>${todayName}</span>
                    <span>${todayNum} ${month}</span>
                    </div>
                    <div class="weather-info">
                    <h6 class="fw-normal mb-0">${location.name} / ${location.country}</h6>
                    <div class="temp">
                        <p class="text-white degree mb-0 fw-bolder">${data.temp_c}<span>o</span>c</p>
                        <img src=${data.condition.icon} alt="partly cloudy">
                        <p class="weather-desc">${data.condition.text}</p>
                    </div>
                    <div class="data d-flex ">
                        <p class="me-3">
                        <span class="me-1"><i class="fa-solid fa-umbrella"></i></span> 20%
                        </p>
                        <p class="me-3">
                        <span class="me-1"><i class="fa-solid fa-wind"></i></span> 18km/h
                        </p>
                        <p class="me-3">
                        <span class="me-1"><i class="fa-regular fa-compass"></i></span> East
                        </p>
                    </div>
                    </div>
    </div>
    `
    weatherContainer.innerHTML=today;
}


function displayDayAfter(data){
    let day='';
    for(let i=1;i<data.length;i++){
        let dayName=days[new Date(data[i].date).getDay()-1];
        console.log(dayName)
            day=`
            <div class="item col-lg-4 col-md-12 p-0">
              <div class="after-tomorrow">
                   <span class="d-flex justify-content-center">${dayName}</span>
                 </div>
                 <div class="weather-after-tomorrow">
                   <div class="image d-flex justify-content-center mb-3 pt-3">
                     <img src=${data[i].day.condition.icon} alt="sunny">
                   </div>
                   <div class="temp d-flex flex-column text-center mt-2 ">
                     <p class="text-white fw-bolder mb-0">${data[i].day.maxtemp_c}<span>o</span>C</p>
                     <p>${data[i].day.mintemp_c}<span>o</span></p>
                     <p>${data[i].day.condition.text}</p>
                   </div>
                 </div>
            </div>
           `
           weatherContainer.innerHTML+=day;
        }
       
}

// & Get user Geolocation
function getUserLocation(){
    let userLocation=navigator.geolocation.getCurrentPosition((location)=>{
        let longitude=location.coords.longitude;
        let latitude=location.coords.latitude;
        let address=longitude+','+latitude;
        getWeather(address);
        console.log(address,location)
    });
}
getUserLocation()