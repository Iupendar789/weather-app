window.addEventListener('DOMContentLoaded', () => lucide.createIcons());

/* Chart.js demo data */
const ctx = document.getElementById('tempChart').getContext('2d');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Temp °C',
      data: [12, 15, 14, 18, 16],
      borderColor: '#0ea5e9',
      backgroundColor: 'rgba(14,165,233,0.1)',
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 4,
      pointBackgroundColor: '#0ea5e9',
      fill: true,
    }],
  },
  options: {
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#64748b' } },
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
    },
  },
});

/* Weather API logic */
const weather = {
  apiKey: 'API KEY',
  fetchWeather(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
      .then(r => {
        if (!r.ok) throw new Error('No weather found');
        return r.json();
      })
      .then(d => this.displayWeather(d))
      .catch(() => alert('City not found.'));
  },
  displayWeather(data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;

    document.querySelector('.city').textContent = `Weather in ${name}`;
    document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    document.querySelector('.description').textContent = description;
    document.querySelector('.temp').textContent = `${Math.round(temp)}°C`;
    document.querySelector('.humidity').textContent = `Humidity: ${humidity}%`;
    document.querySelector('.wind').textContent = `Wind speed: ${speed} km/h`;
    document.querySelector('.weather').classList.remove('loading');
    document.body.style.backgroundImage = `url('https://source.unsplash.com/1920x1080/?${name}')`;
  },
  search() {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

/* Event Listeners */
document.querySelector('.search').addEventListener('click', () => weather.search());
document.querySelector('.search-bar').addEventListener('keyup', e => {
  if (e.key === 'Enter') weather.search();
});

/* Default Load */
weather.fetchWeather('Miami');
