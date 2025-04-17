const wrapper = document.querySelector(".wrapper");
const weatherResult = document.querySelector("#weatherResult");

async function getWeather() {
    const apiKey = "905ab7068aa7414c800112023251402";
    const cityInput = document.getElementById("city");

    if (!cityInput || !cityInput.value.trim()) {
        alert("Shahar nomini kiriting");
        return;
    }

    const city = cityInput.value.trim();
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            alert(data.error.message);
            return;
        }

        wrapper.innerHTML = "";

        // Yangi div
        const div = document.createElement('div');
        let iconUrl = "";

        console.log(data.current.condition.text);

        // Holatga qarab icon tanlash

if (data.current.condition.text.includes("Rain")) {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // yomg'ir
} else if (data.current.condition.text.includes("Sunny")) {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/2108/2108730.png"; // quyoshli
} else if (data.current.condition.text.includes("Snow")) {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/642/642102.png"; // qor
} else if (data.current.condition.text.includes("Cloudy") || data.current.condition.text.includes("Overcast")) {
    iconUrl = "https://cdn-icons-png.flaticon.com/512/1163/1163622.png"; // bulutli
} else {
    iconUrl = data.current.condition.icon; 
}

        
        div.innerHTML = `
            <h2>${data.location.name}, ${data.location.country}</h2>
            <p>${data.current.temp_c}°C</p>
            <p>${data.current.condition.text}</p>
            <img class="icon" src="${iconUrl}" alt="Weather icon" width="100">
        `;
        wrapper.appendChild(div);

    } catch (error) {
        console.error("Xatolik:", error);
        alert("Ob-havo ma'lumotlarini olishda xatolik yuz berdi.");
    }
}
