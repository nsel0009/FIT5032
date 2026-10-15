<template>
  <div class="container-block">
    <section class="container-section">

      <h1>The World Map</h1>

      <button @click="getUserLocation" class="geo-btn">
        📍 Find My Location
      </button>
      <br />

      <!-- The actual map element -->
      <div ref="mapElement" class="map-view"></div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </section>

    <!-- Saved Points Sidebar -->
    <div class="sidebar">
      <h4>📍 Saved Points of Interest</h4>
      <p v-if="savedPoints.length === 0" class="empty-msg">
        Use the search bar inside the map or click anywhere to save a location!
      </p>

      <ul class="saved-list">
        <li v-for="(point, index) in savedPoints" :key="index" class="point-card">
          <div class="point-info">
            <strong>{{ point.name }}</strong>
            <span class="coords">{{ point.lat.toFixed(4) }}, {{ point.lon.toFixed(4) }}</span>
          </div>

          <div v-if="point.weather" class="weather-info">
            <h2>
              {{ point.weather.name }}, {{ point.weather.sys.country }}
            </h2>
            <div>
              <img :src="point.weather.icon" alt="Weather Icon" />
              <p>{{ point.weather.temperature }} °C</p>
            </div>
            <span>{{ point.weather.weather[0].description }}</span>
          </div>
          <p v-else-if="point.weatherError" class="error">
            Weather unavailable: {{ point.weatherError }}
          </p>
          <p v-else>Loading weather...</p>

          <!-- Delete a Point of Interest -->
           <br />
          <button @click="removePoint(index)" class="delete-btn" title="Delete Point">
            Delete Point of Interest
          </button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Essential for proper map rendering
import axios from "axios";
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

const mapElement = ref(null);
const mapInstance = ref(null);
const markerInstance = ref(null);
const errorMessage = ref('');
const savedPoints = ref([]);

const apikey = "a2e34cd9324ca5a9f0d5833b475576c2";

// Initialize a fallback map default centered (e.g., Sydney, Australia)
onMounted(() => {
  mapInstance.value = L.map(mapElement.value, {zoomControl: false}).setView([-33.8688, 151.2093], 13);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cloudflare.com',
    iconUrl: 'https://cloudflare.com',
    shadowUrl: 'https://cloudflare.com',
  });

  L.control.zoom({
    position: 'topright'
  }).addTo(mapInstance.value);

  // Add OpenStreetMap tile layers
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(mapInstance.value);

  // 2. Initialize the OpenStreetMap search data provider
  const provider = new OpenStreetMapProvider();

  // 3. Create the UI search bar control
  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',                // Displays as a clean horizontal text bar
    showMarker: true,            // Automatically drops a pin on the found location
    showPopup: true,             // Opens a description popup over the new pin
    marker: {
      draggable: false,          // Keeps the dropped search pin locked in place
    },
    maxMarkers: 1,               // Clears the previous search pin when a new search happens
    retainZoomLevel: false,      // Allows the map to zoom in closer to precise address results
    animateZoom: true,           // Smoothly transitions the map fly-to effect
    autoClose: true,             // Collapses the search input panel after selecting a result
    searchLabel: 'Enter The Name For Your Point of Interest (City or Address)...' // Custom placeholder text inside the input field
  });

  mapInstance.value.addControl(searchControl);

  mapInstance.value.on('geosearch/showlocation', (result) => {
    const lat = result.location.y;
    const lon = result.location.x;

    const placeName = result.location.label.split(',')[0];

    saveNewPoint(placeName, lat, lon);
  });

  mapInstance.value.on('click', (event) => {
    const { lat, lng } = event.latlng;
    saveNewPoint('Dropped Pin', lat, lng);
  });

  mapInstance.value.on('geosearch/showlocation', (result) => {
    console.log('Location Found:', result.location);
  });
});

// Appends location data structures straight into the Vue reactivity sidebar loops
const saveNewPoint = async (name, lat, lon) => {
  const pointIndex = savedPoints.value.length;
  const newPoint = reactive({
    name: name || `Point of Interest #${pointIndex + 1}`,
    lat,
    lon,
    weather: null,
    weatherError: null
  });
  savedPoints.value.push(newPoint);

  L.marker([lat, lon])
    .addTo(mapInstance.value)
    .bindPopup(`<b>${newPoint.name}</b><br>Saved to points tracking dashboard.`)
    .openPopup();

  try {
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params: {
          lat,
          lon,
          appid: apikey,
          units: 'metric'
        }
      }
    );
    const weatherValues = response.data;
    const iconCode = weatherValues.weather[0].icon;

    newPoint.weather = {
      ...weatherValues,
      temperature: weatherValues.main.temp,
      icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    newPoint.weatherError =
      error.response?.data?.message || error.message || 'Unknown error';
  }
};

// Function to fetch browser geolocation
const getUserLocation = () => {
  if (!navigator.geolocation) {
    errorMessage.value = "Geolocation is not supported by your browser.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;

      // Update map view to user's location
      if (mapInstance.value) {
        mapInstance.value.setView([latitude, longitude], 16);

        // Remove old marker if it exists, then add a new one
        if (markerInstance.value) {
          mapInstance.value.removeLayer(markerInstance.value);
        }

        markerInstance.value = L.marker([latitude, longitude])
          .addTo(mapInstance.value)
          .bindPopup("You are here!")
          .openPopup();
      }
    },
    (error) => {
      errorMessage.value = `Error getting location: ${error.message}`;
    },
    { enableHighAccuracy: true } // Requests precise GPS coordinates
  );
};

// Removes a saved point from the array and deletes its corresponding marker
const removePoint = (index) => {
  savedPoints.value.splice(index, 1);

  mapInstance.value.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      mapInstance.value.removeLayer(layer);
    }
  });

  savedPoints.value.forEach((point) => {
    L.marker([point.lat, point.lon])
      .addTo(mapInstance.value)
      .bindPopup(`<b>${point.name}</b><br>Retrieved from browser memory storage.`);
  });
};


</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  header {
    margin: 0;
    text-align: center;
  }

  .logo-image {
    display: flex;
    justify-content: center;
  }

  .container-section {
    width: 100%;
  }

}

.container-block {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1,
h2, h3, p {
  color: #333;
}
h1 {
  text-align: center;
}

.container-section {
  background-color: white;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

.highlight {
  background-color: #42b883;
}

code {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: "Courier New", Courier, monospace;
}

ul {
  list-style-type: none;
  padding: 0;
  color: black;
}
li {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

:deep(.column-text) {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

/* Map must have explicit width and height to render properly */
.map-view {
  width: 100%;
  height: 500px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.geo-btn {
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.geo-btn:hover {
  background-color: #35495e;
}

.sidebar {
  flex: 1;
  background-color: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  overflow-y: auto;
}

.sidebar h4 {
  margin-top: 0;
  margin-bottom: 15px;
}

.empty-msg {
  color: #666;
  font-size: 14px;
}

.saved-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.point-card {
  background: white;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  text-align: left;
}

.point-info strong {
  display: block;
}

.coords {
  font-size: 11px;
  color: #888;
}
/* Ensure the internal search dropdown overrides Leaflet's standard component clip constraints */
:deep(.leaflet-control-geosearch) {
  z-index: 1000;
  margin-top: 12px;
  margin-left: 12px;
}
:deep(.leaflet-control-geosearch form) {
  max-width: 320px;
  background-color: #ffffff !important;
  border: 1px solid #cccccc !important;
  border-radius: 4px !important;
  box-shadow: 0 1px 5px rgba(0,0,0,0.2) !important;
}

:deep(.leaflet-control-geosearch form input) {
  background-color: #ffffff !important;
  color: #000000 !important;      /* Forces text input to be black */
  font-family: inherit !important;
}

:deep(.leaflet-control-geosearch form input::placeholder) {
  color: #666666 !important;
}

:deep(.leaflet-control-geosearch .results) {
  background-color: #ffffff !important;
  border: 1px solid #cccccc !important;
  border-top: none !important;
}

:deep(.leaflet-control-geosearch .results > div) {
  background-color: #ffffff !important;
  color: #000000 !important;      /* Forces dropdown list item text to be black */
  border-bottom: 1px solid #f0f0f0 !important;
}

:deep(.leaflet-control-geosearch .results > div.active),
:deep(.leaflet-control-geosearch .results > div:hover) {
  background-color: #f5f5f5 !important;
  color: #000000 !important;
}

:deep(.leaflet-control-geosearch a.reset) {
  background-color: #ffffff !important;
  color: #000000 !important;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
