<template>
    <div class="container-block">
      <div class="logo-image">
        <img alt="Vue logo" class="logo" src="../../assets/sustainenvironLogo.svg" width="125" height="125" />
      </div>
      <section class="container-section">
        <br />
        <div>
          <h1>The Admin Dashboard</h1>
          <p>
            Welcome to The Admin Dashboard. Here, you can view and manage all users and sessions, as well as access our Map feature. You can access the table view for Users, Sessions and Bookings through the three buttons below, as well as the map.
            <br />
            Further below is the Ratings Distribution Graph to watch over user satisfaction with SustainEnvion Education's Classes.
            <br />
          </p>
        </div>

        <table>
          <tr>
            <td>
              <router-link to="/Users/Index" class="nav-link" active-class="active">All Users</router-link>
            </td>
            <td>
              <router-link to="/Map" class="nav-link" active-class="active">The Map</router-link>
            </td>
            <td>
              <router-link to="/Sessions/Index" class="nav-link" active-class="active">All Sessions</router-link>
            </td>
          </tr>
        </table>
      </section>
      <section class="container-section">
        <h3>Ratings Distribution</h3>
        <p>
          The x-axis represents the ratings that users have given on a scale of 0 - 10.
          <br />
          The y-axis represents the number of users that have given that rating.
          <br />
          Consider the bell-curve that can be seen with the graph to help get an idea of how SustainEnviron Education is going.
        </p>
        <br />
        <div>
          <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
          />
        </div>
      </section>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// import { useCollection } from 'vuefire';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

const db = getFirestore();

const ratingsData = ref([]);

const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const chartData = ref({
  labels: [],
  datasets: [
    {
      data: []
    }
  ]
})

const chartOptions = ref({
  responsive: true
})

onMounted(async () => {

  try {

    const querySnapshot = await getDocs(collection(db, 'ratings'));

    ratingsData.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    ratingsData.value.forEach(doc => {
    const index = labels.indexOf(doc.rating);
    if (index !== -1) {
      data[index]++;
    }

  });

  console.log('Ratings values:', labels, data);

  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: 'Rating Distribution',
        backgroundColor: '#42B883',
        borderColor: '#35495E',
        borderWidth: 1,
        data: data
      }
    ]
  };

  } catch (error) {
    console.error('Error fetching ratings:', error);
  }

});

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

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

  table, td, tr {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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

</style>
