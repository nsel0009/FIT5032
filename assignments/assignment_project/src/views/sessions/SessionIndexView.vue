<template>
  <div class="container-block">
    <h2>List of All Sessions</h2>

    <section class="container-section">

      <p>
        You can view all sessions both in a calendar or a table. Firstly, the calendar shows a visual represenation of the bookings. You can also add more sessions with the button below.
      </p>

      <br />
        <router-link to="/Sessions/Add" class="nav-link" active-class="active">Add a Session</router-link>
      <br />

      <div class="w-full">
        <FullCalendar :options="calendarOptions">
        </FullCalendar>
      </div>

    </section>

    <section class="container-section">
      <div class="w-full">

        <p>
          Here is the table representation for the sessions.
        </p>
        <br />

        <h3>Total Number of Sessions: {{ totalCount }}</h3>
        <button @click="pdfExport">Export The Table As A PDF</button>
        <DataTable
        :value="sessions"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        :globalFilterFields="['date', 'topic', 'teacher', 'number_of_people_enrolled']"
        tableStyle="min-width: 50rem"
        >

          <div class="datatable-header">
            <span class="p-input">
              <InputText v-model="filters['global'].value" placeholder="Search for Sessions..." />
            </span>
          </div>

          <div v-if="totalCount">
            <p>
              Testing this for v-if
            </p>
              <Column class="column-text" field="topic" header ="Topic" sortable/>
            <v-else>
              <Column class="column-text" field="date" header ="Date" sortable/>
            </v-else>
          </div>
          <Column class="column-text" field="topic" header ="Topic" sortable/>
          <Column class="column-text" field="teacher" header ="Teacher" sortable/>
          <Column class="column-text" field="number_of_people_enrolled" header ="Number of People Enrolled" sortable/>
        </DataTable>
      </div>
    </section>

  </div>

</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ref, onMounted, reactive } from "vue"
import axios from 'axios';
import FullCalendar from "@fullcalendar/vue3";
import themePlugin from "@fullcalendar/vue3/themes/monarch"; // YOUR THEME
import dayGridPlugin from "@fullcalendar/vue3/daygrid";
import interactionPlugin from "@fullcalendar/vue3/interaction";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

// stylesheets
import '@fullcalendar/vue3/skeleton.css'; // ALWAYS NEED SKELETON
import '@fullcalendar/vue3/themes/monarch/theme.css'; // YOUR THEME
import '@fullcalendar/vue3/themes/monarch/palettes/purple.css'; // YOUR THEME'S PALETTE


const sessionsCalendar = ref([])

const calendarOptions = reactive({
  plugins: [themePlugin, dayGridPlugin, interactionPlugin],
  initialView: "dayGridMonth",
  headerToolbar: {
    left: 'prev',
    center: 'title',
    right: 'next'
  },
  weekends: true,
  events: sessionsCalendar,
});

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

const showMessage = ref(false)

const sessions = ref([]);
const filters = ref({
  'global': { value: null, matchMode: 'contains' }
});

const db = getFirestore();
const totalCount = ref(null);
const error = ref(null);

const getTotalCount = async () => {
  try {
    const response = await axios.get('https://countsessions-rqvhgeks6a-uc.a.run.app');
    totalCount.value = response.data.count;
    error.value = null;
    return totalCount.value
  } catch (err) {
    error.value = 'Error fetching total number of sessions: ' + err.message;
    totalCount.value = null;
  }
}

const pdfExport = () => {
  const doc = new jsPDF();

  const columns = [
    { title: "Date", dataKey: "date" },
    { title: "Topic", dataKey: "topic" },
    { title: "Teacher", dataKey: "teacher" },
    { title: "Number of People Enrolled", dataKey: "number_of_people_enrolled"}
  ];
  const rows = sessions.value;

  doc.text("Sessions Data Table", 14, 15);

  autoTable(doc, {
    columns: columns,
    body: rows,
    startY: 20,
    theme: 'striped',
    styles: { fontSize: 10 }
  });

  doc.save('sustainenviron_sessions_table.pdf');
};

onMounted(async () => {

  try {

    const querySnapshot = await getDocs(collection(db, 'sessions'));

    sessions.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    getTotalCount();
    getSessions();

  } catch (error) {
    console.error('Error fetching sessions:', error);
  }

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
