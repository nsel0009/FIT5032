<template>
  <div class="container-block">
    <h2>List of All Sessions</h2>

    <section class="container-section">
      <h3>Total Number of Sessions: {{ getTotalCount() }}</h3>
      <div class="w-full">
        <DataTable
        :value="sessionsTableData"
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

          <Column class="column-text" field="date" header ="Date" sortable/>
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

import sessions from "../../assets/json/sessions.json"

import { ref, onMounted } from "vue"
import axios from 'axios';

const showMessage = ref(false)

const sessionsTableData = ref(sessions);
const filters = ref({
  'global': { value: null, matchMode: 'contains' }
});

const totalCount = ref(null);
const error = ref(null);

const getTotalCount = async () => {
  try {
    const response = await axios.get('');
    totalCount.value = response.data.count;
    error.value = null;
    return totalCount.value
  } catch (err) {
    error.value = 'Error fetching total number of sessions: ' + err.message;
    totalCount.value = null;
  }
}

onMounted(async () => {

  try {

    // const querySnapshot = await getDocs(collection(db, 'ratings'));

    // ratings.value = querySnapshot.docs.map(doc => ({
    //   id: doc.id,
    //   ...doc.data()
    // }));

    getTotalCount();

  } catch (error) {
    console.error('Error fetching ratings:', error);
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
