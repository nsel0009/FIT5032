<!-- JSONLab.vue -->

<template>
  <div class="json-lab">
    <h2>List of All Users</h2>
    <section class="lab-section">
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.firstname }} {{ user.lastname }} ({{ user.username }}) - {{ user.email }}
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <div class="w-full">
        <DataTable :value="usersTableData" tableStyle="min-width: 50rem">
          <Column class="column-text" field="firstname" header ="First Name" />
          <Column class="column-text" field="lastname" header ="Last Name" />
          <Column class="column-text" field="email" header ="Email" />
          <Column class="column-text" field="status" header ="Status" />
        </DataTable>
      </div>
    </section>

  </div>

  <div class="json-lab">
    <h2>List of All Sessions</h2>
    <section class="lab-section">
      <ul>
        <li v-for="session in sessions" :key="session.id">
          {{ session.topic }} ({{ session.date }}) - {{ session.teacher }}
          <br />
          Number of People Enrolled: {{ session.number_of_people_enrolled }}
          <br /><br />
          {{ session.description }}
        </li>
      </ul>
    </section>

    <section class="lab-section">
      <div class="w-full">
        <DataTable :value="sessionsTableData" tableStyle="min-width: 50rem">
          <Column class="column-text" field="date" header ="Date" />
          <Column class="column-text" field="topic" header ="Topic" />
          <Column class="column-text" field="teacher" header ="Teacher" />
          <Column class="column-text" field="number_of_people_enrolled" header ="Number of People Enrolled" />
        </DataTable>
      </div>
    </section>

  </div>

</template>

<script setup>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import users from "../assets/json/users.json"
import sessions from "../assets/json/sessions.json"

import { ref, computed } from "vue"

const showMessage = ref(false)

const usersTableData = ref(users);
const sessionsTableData = ref(sessions);

</script>

<style scoped>
.json-lab {
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

.lab-section {
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
