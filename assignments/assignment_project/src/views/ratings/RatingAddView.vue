<template>
    <div class="container-block">
      <section class="container-section">
        <div>
          <h1>Add A New Rating</h1>
          <p>Leave Your Rating (Out of 10) and Review Here. It will be anonymous.</p>
        </div>
        <br />
        <div>
          <form @submit.prevent="submitForm">
            <div>
              <label for="sessionTopic" class="form-label">Session Topic:</label>
              <input id="sessionTopic" class="form-control"
              @blur="() => validateSessionTopic(true)"
              @input="() => validateSessionTopic(false)"
              v-model="formData.sessionTopic" type="text" placeholder="Name of the Session Topic that your review is for..."/>
              <div v-if="errors.sessionTopic" class="text-danger">{{ errors.sessionTopic }}</div>
            </div>

            <div>
              <label for="rating" class="form-label">Rating (/10):</label>
              <input id="rating" class="form-control"
              @blur="() => validateRating(true)"
              @input="() => validateRating(false)"
              v-model.number="formData.rating" type="number"/>
              <div v-if="errors.rating" class="text-danger">{{ errors.rating }}</div>
            </div>

            <div>
              <label for="title" class="form-label">Review Title:</label>
              <input id="title" class="form-control"
                @blur="() => validateTitle(true)"
                @input="() => validateTitle(false)"
                v-model="formData.title" type="text" placeholder="Provide a title for your review..."/>
                <div v-if="errors.title" class="text-danger">{{ errors.title }}</div>
            </div>

            <div>
              <label for="description" class="form-label">Review Description:</label>
              <textarea id="description" class="form-control"
                @blur="() => validateDescription(true)"
                @input="() => validateDescription(false)"
                v-model="formData.description" placeholder="Write your review here..."></textarea>
                <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
            </div>

            <button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </button>
          </form>
        </div>
      </section>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const formData = ref({
    sessionTopic: '',
    rating: '',
    title: '',
    description: '',
});

const router = useRouter();
const db = getFirestore();


const submitForm = async () => {
  await validateSessionTopic(true);
  await validateRating(true);
  await validateTitle(true);
  await validateDescription(true);

  if (!errors.value.sessionTopic && !errors.value.rating && !errors.value.title && !errors.value.description) {
    // Add new user to the database
    try {
      await addDoc(collection(db, "ratings"), {
        sessionTopic: formData.value.sessionTopic,
        rating: formData.value.rating,
        title: formData.value.title,
        description: formData.value.description
      });
      console.log('Rating submitted successfully');
      router.push('/Ratings/Index'); // Redirect to the ratings page
    } catch (error) {
      console.error('Error submitting rating:', error.code);
    }
  }
};


const errors = ref({
  sessionTopic: null,
  rating: null,
  title: null,
  description: null,
})

const validateSessionTopic = (blur) => {
  if (!formData.value.sessionTopic) {
    if (blur) errors.value.sessionTopic = "Session topic is required";
  } else {
    errors.value.sessionTopic = null;
  }
}

const validateRating = (blur) => {
  const ratingMaxLimit = 10;
  const ratingMinLimit = 1;
  if (!formData.value.rating) {
    if (blur) errors.value.rating = "Rating is required";
  } else if (formData.value.rating < ratingMinLimit || formData.value.rating > ratingMaxLimit) {
    if (blur) errors.value.rating = `Rating must be between ${ratingMinLimit} and ${ratingMaxLimit}`;
  } else {
    errors.value.rating = null;
  }
}

const validateTitle = (blur) => {
  const titleMaxLimit = 100;
  const titleMinLimit = 5;

  if (formData.value.title.length > titleMaxLimit) {
    if (blur) errors.value.title = `Title must be no more than ${titleMaxLimit} characters long.`;
  } else if (formData.value.title.length < titleMinLimit) {
    if (blur) errors.value.title = `Title must be at least ${titleMinLimit} characters long.`;
  } else {
    errors.value.title = null;
  }
}

const validateDescription = (blur) => {
  const descriptionMaxLimit = 256;
  const descriptionMinLimit = 20;

  if (formData.value.description.length > descriptionMaxLimit) {
    if (blur) errors.value.description = `Description must be no more than ${descriptionMaxLimit} characters long.`;
  } else if (formData.value.description.length < descriptionMinLimit) {
    if (blur) errors.value.description = `Description must be at least ${descriptionMinLimit} characters long.`;
  } else {
    errors.value.description = null;
  }
}

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

.form-control, .form-select, .error-message, .text-danger {
  padding: 10px 10px;
  margin: 5px 0;
  border-radius: 5px;
  width: 100%;
  box-sizing:
  border-box;
  color: black;
  background-color: #f4f4f4;
}

.form-label{
  padding: 10px 10px;
  margin: 5px 0;
  border-radius: 5px;
  width: 100%;
  color: black;
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
