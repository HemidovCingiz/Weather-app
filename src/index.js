const apiKey = "31560b7365c4e877202d19329e64ac5f"; // 🔹 Buraya öz API açarını yaz
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", e => { if(e.key==="Enter") searchBtn.click(); });

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city name!");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=en`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found!");
    const data = await res.json();

    document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("temp").textContent = `🌡️ Temperature: ${data.main.temp}°C`;
    document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
    document.getElementById("condition").textContent = `🌥️ Condition: ${data.weather[0].description}`;

    const iconCode = data.weather[0].icon;
    const iconImg = document.getElementById("iconImg");
    iconImg.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconImg.alt = data.weather[0].description;
    iconImg.style.display = "block";

  } catch(err) {
    alert(err.message);
  }
}
