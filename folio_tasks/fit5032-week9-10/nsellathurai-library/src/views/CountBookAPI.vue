<template>
  <div>
    <h1>Get Book Count</h1>
   <pre>
    {{ jsondata }}
   </pre>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';

const error = ref(null)
const jsondata = ref(null);

const getBookCountAPI = async () => {
  try {
    const response = await axios.get('https://us-central1-fit5032-50180.cloudfunctions.net/countBooks');
    jsondata.value = JSON.stringify(response.data, null, 2);
    error.value = null;
  } catch (err) {
    error.value = 'Error fetching book count';
    jsondata.value = null;
    console.error('Error fetching book count:', err);
  }
};

onMounted(() => {
  getBookCountAPI();
});
</script>
