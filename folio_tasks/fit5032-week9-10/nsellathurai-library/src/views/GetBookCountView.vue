<template>
  <div>
    <h1>Get Book Count</h1>
    <button @click="getBookCount">
      Get Book Count
    </button>
    <p v-if="bookCount !== null">Total Books: {{ bookCount }}</p>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const bookCount = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get(
      'https://us-central1-fit5032-50180.cloudfunctions.net/countBooks'
    )
    bookCount.value = response.data.count
  } catch (err) {
    console.error('Error fetching book count:', err)
    error.value = 'Could not fetch the book count.'
  }
};
</script>
