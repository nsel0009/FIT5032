<template>
  <div class="container-block">
    <section class="container-section">
      <button @click="getUserLocation" class="geo-btn">
        📍 Find My Location
      </button>

      <!-- The actual map element -->
      <div ref="mapElement" class="map-view"></div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Essential for proper map rendering

const mapElement = ref(null);
const mapInstance = ref(null);
const markerInstance = ref(null);
const errorMessage = ref('');

// Initialize a fallback map default centered (e.g., Sydney, Australia)
onMounted(() => {
  mapInstance.value = L.map(mapElement.value).setView([-33.8688, 151.2093], 13);

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cloudflare.com',
    iconUrl: 'https://cloudflare.com',
    shadowUrl: 'https://cloudflare.com',
  });

  // Add OpenStreetMap tile layers
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
  }).addTo(mapInstance.value);
});

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

.error {
  color: red;
  font-size: 14px;
}
</style>
