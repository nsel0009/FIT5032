<template>
  <div>
    <h1>Add Book</h1>
    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required>
      </div>
      <br />
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required>
      </div>
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import db from '../firebase/init.js';
  import { collection, addDoc } from 'firebase/firestore';

  // 1. References for isbn and name
  const isbn = ref('');
  const name = ref('');

  // 2. Async function to add data to the "books" collection
  const addBook = async () => {
    try {
      const isbnNumber = Number(isbn.value);
      if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number');
      return;
      }

      // Add document to Firestore 'books' collection
      await addDoc(collection(db, 'books'), {
        isbn: isbnNumber,
        name: name.value
      });

      // Reset input fields after successful submission
      isbn.value = '';
      name.value = '';
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book: ', error);
    }
  };
</script>
