<template>
    <div class="container-block">
      <section class="container-section">
        <div>
          <h1>Add A New Booking</h1>
          <p>View the calendar to see the available sessions, then select a session to book.</p>
        </div>
      </section>
      <section class="container-section">
        <div class="w-full">
          <FullCalendar :options="calendarOptions">
          </FullCalendar>
        </div>
      </section>
      <section class="container-section">
        <div>
          <form @submit.prevent="submitForm">
            <div>
              <label for="sessionTopic" class="form-label">Session Topic:</label>
              <input id="sessionTopic" class="form-control"
              readonly
              @blur="() => validateSessionTopic(true)"
              @input="() => validateSessionTopic(false)"
              v-model="formData.sessionTopic" type="text" placeholder="Name of the Session Topic that you want to book..."/>
              <div v-if="errors.sessionTopic" class="text-danger">{{ errors.sessionTopic }}</div>

              <label for="date" class="form-label">Date:</label>
              <input id="date" class="form-control"
              readonly
              @blur="() => validateSessionTopic(true)"
              @input="() => validateSessionTopic(false)"
              v-model="formData.date" type="text" placeholder="Date of the Session Topic that you want to book..."/>

            <button type="submit" :disabled="isSubmitting">
              {{ isSubmitting ? 'Submitting...' : 'Submit' }}
            </button>
            </div>
          </form>
        </div>
      </section>
    </div>
</template>

<script setup>

import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import InputText from 'primevue/inputtext';
import axios from 'axios';
import FullCalendar from "@fullcalendar/vue3";
import themePlugin from "@fullcalendar/vue3/themes/monarch"; // YOUR THEME
import dayGridPlugin from "@fullcalendar/vue3/daygrid";
import interactionPlugin from "@fullcalendar/vue3/interaction";

// stylesheets
import '@fullcalendar/vue3/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/vue3/themes/monarch/theme.css'; // YOUR THEME
import '@fullcalendar/vue3/themes/monarch/palettes/purple.css'; // YOUR THEME'S PALETTE

const formData = ref({
    email: '',
    sessionTopic: '',
    date: ''
});

const router = useRouter();
const db = getFirestore();

const totalCount = ref(null);
const error = ref(null);


const currentUser = ref(null);
const auth = getAuth();

const submitForm = async () => {
  await validateSessionTopic(true);

  if (!currentUser.value) {
    alert('You must be logged in to submit this form.');
    return;
  }

  if (!errors.value.sessionTopic) {
    // Add new user to the database
    try {

      await addDoc(collection(db, "bookings"), {
        email: currentUser.value.email,
        sessionTopic: formData.value.sessionTopic,
        date: formData.value.date
      });
      console.log('Rating submitted successfully');
      router.push('/'); // Redirect to the dashboard
    } catch (error) {
      console.error('Error submitting rating:', error.code);
    }
  }
};


const errors = ref({
  sessionTopic: null,
})

const validateSessionTopic = (blur) => {
  const sessionMaxLimit = 100;
  const sessionMinLimit = 5;

  if (formData.value.sessionTopic.length > sessionMaxLimit) {
    if (blur) errors.value.sessionTopic = `Session topic must be no more than ${sessionMaxLimit} characters long.`;
  } else if (formData.value.sessionTopic.length < sessionMinLimit) {
    if (blur) errors.value.sessionTopic = `Session topic must be at least ${sessionMinLimit} characters long.`;
  } else {
    errors.value.sessionTopic = null;
  }
}

const sessionsCalendar = ref([])

const handleEventClick = (info) => {

  // Convert the date into YYYY-MM-DD
  const dateConvert = new Date(info.event.start)
  const dateConverted = `${dateConvert.getFullYear()}-${String(dateConvert.getMonth() + 1).padStart(2, '0')}-${String(dateConvert.getDate()).padStart(2, '0')}`

  // Add the values to the input
  formData.value.sessionTopic = info.event.title;
  formData.value.date = dateConverted;
  info.jsEvent.preventDefault();
}

const getSessions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'sessions'));
    sessionsCalendar.value = querySnapshot.docs.map(doc => ({
      title: doc.data().topic,
      date: doc.data().date
    }));
  } catch (error) {
    console.error('Error fetching calendar events:', error);
  }
};

const calendarOptions = reactive({
  plugins: [themePlugin, dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: 'prev',
    center: 'title',
    right: 'next'
  },
  weekends: true,
  eventClick: handleEventClick,
  events: sessionsCalendar
});

const showMessage = ref(false)

const sessions = ref([]);
const filters = ref({
  'global': { value: null, matchMode: 'contains' }
});

onMounted(async () => {

  try {

    const querySnapshot = await getDocs(collection(db, 'sessions'));

    sessions.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    getSessions();

  } catch (error) {
    console.error('Error fetching sessions:', error);
  }

  // Listen for the active logged-in user
  onAuthStateChanged(auth, (user) => {
    if (user) {
      currentUser.value = user;
    } else {
      currentUser.value = null;
    }
  });

});

</script>

<style scoped>
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

:deep(.p-paginator) {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

:deep(.p-paginator .p-paginator-page),
:deep(.p-paginator .p-paginator-icon) {
  color: black;
}

:deep(.p-inputtext) {
  background-color: #f0f0f0;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  color: black;
}

</style>

