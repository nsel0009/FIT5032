<template>
    <div class="container-block">
      <div class="logo-image">
        <img alt="Vue logo" class="logo" src="../../assets/logo.svg" width="125" height="125" />
      </div>
      <section class="container-section">
        <br />
        <div>
          <h1>Ratings Page</h1>
          <p>Leave Reviews and Ratings Here</p>
          <br />
          <router-link to="/Ratings/Add" class="nav-link" active-class="active">Add a Rating</router-link>
        </div>

      <div v-if="ratings.length === 0" class="no-results">
        No ratings found.
      </div>

      <div v-else class="ratings-list">
        <div v-for="rating in ratings" :key="rating.id" class="rating-card">
          <p class="score"><strong>Score:</strong> {{ rating.rating }}/10</p>
          <h3>{{ rating.title }}</h3>
          <p class="session-topic-tag"><strong>Topic:</strong> {{ rating.sessionTopic }}</p>
          <p class="desc">{{ rating.description }}</p>
        </div>
      </div>

      </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore();

const ratings = ref([]);

onMounted(async () => {

  try {

    const querySnapshot = await getDocs(collection(db, 'ratings'));

    ratings.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {
    console.error('Error fetching ratings:', error);
  }

});

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

</style>
