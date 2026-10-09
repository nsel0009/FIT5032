<template>
   <pre>
    {{ jsondata }}
   </pre>
</template>

<script setup>

  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const jsondata = ref(null);

  const getBookCountAPI = async () => {
    try {
      const response = await axios.get('http://..../fit5032-66076/us-central1/countBooks');
      jsondata.value = JSON.stringify(response.data, null, 2);
      // error.value = null;
    } catch (err) {
      err.value = 'Error fetching book count';
      jsondata.value = null;
    }
  };

  onMounted(() => {
    getBookCountAPI();
  });
</script>
