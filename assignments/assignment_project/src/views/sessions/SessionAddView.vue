<template>
    <div class="container-block">
      <section class="container-section">
        <div>
          <h1>Add A New Session</h1>
          <p>Add a new session for users to book into.</p>
        </div>
        <br />
        <div>
          <form @submit.prevent="submitForm">
            <div>
              <label for="date" class="form-label">Date:</label>
              <input id="date" class="form-control"
              v-model="formData.date" type="date"/>
            </div>
            <div>
              <label for="topic" class="form-label">Topic:</label>
              <input id="topic" class="form-control"
              @blur="() => validateTopic(true)"
              @input="() => validateTopic(false)"
              v-model="formData.topic" type="text" placeholder="Name of the Session Topic..."/>
              <div v-if="errors.topic" class="text-danger">{{ errors.topic }}</div>
            </div>
            <div>
              <label for="teacher" class="form-label">Teacher:</label>
              <input id="teacher" class="form-control"
                @blur="() => validateTeacher(true)"
                @input="() => validateTeacher(false)"
                v-model="formData.teacher" type="text" placeholder="Provide a teacher for this session..."/>
                <div v-if="errors.teacher" class="text-danger">{{ errors.teacher }}</div>
            </div>

            <div>
              <label for="description" class="form-label">Description:</label>
              <textarea id="description" class="form-control"
                @blur="() => validateDescription(true)"
                @input="() => validateDescription(false)"
                v-model="formData.description" placeholder="Write the description of this session here..."></textarea>
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
    topic: '',
    date: '',
    teacher: '',
    description: '',
});

const router = useRouter();
const db = getFirestore();


const submitForm = async () => {
  await validateTopic(true);
  await validateTeacher(true);
  await validateDescription(true);

  if (!errors.value.topic && !errors.value.teacher && !errors.value.description) {
    // Add new user to the database
    try {
      const dateConvert = new Date(formData.value.date)
      await addDoc(collection(db, "sessions"), {
        date: `${dateConvert.getFullYear()}-${String(dateConvert.getMonth() + 1).padStart(2, '0')}-${String(dateConvert.getDate()).padStart(2, '0')}`,
        description: formData.value.description,
        number_of_people_enrolled: 0,
        people_enrolled: [],
        teacher: formData.value.teacher,
        topic: formData.value.topic,
      });
      console.log('Session submitted successfully');
      router.push('/Sessions/Index'); // Redirect to the ratings page
    } catch (error) {
      console.error('Error submitting session:', error.code);
    }
  }
};


const errors = ref({
  topic: null,
  rating: null,
  teacher: null,
  description: null,
})

const validateTopic = (blur) => {
  if (!formData.value.topic) {
    if (blur) errors.value.topic = "Session topic is required";
  } else {
    errors.value.topic = null;
  }
}

const validateTeacher = (blur) => {
  const teacherMaxLimit = 100;
  const teacherMinLimit = 5;

  if (formData.value.teacher.length > teacherMaxLimit) {
    if (blur) errors.value.teacher = `Teacher must be no more than ${teacherMaxLimit} characters long.`;
  } else if (formData.value.teacher.length < teacherMinLimit) {
    if (blur) errors.value.teacher = `Teacher must be at least ${teacherMinLimit} characters long.`;
  } else {
    errors.value.teacher = null;
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
