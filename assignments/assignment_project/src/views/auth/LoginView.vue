<template>

    <div class="container-block mt-5">

      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center">Login</h1>
          <p>Sign into your account.</p>
          <br />
          <p><input type="email" placeholder="Email" v-model="email" /></p>
          <p><input type="password" placeholder="Password" v-model="password" /></p>
          <p><button @click="login" class="custom-btn-primary">Login</button></p>
        </div>
      </div>

    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';

const email = ref('');
const password = ref('');
const router = useRouter();
const auth = getAuth();

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Login successful');
    router.push('/'); // Redirect to the landing page after successful login
  } catch (error) {
    console.error('Login failed:', error.code);
  }
};

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

  td {
    width: 50%;
  }

  .form-control, .form-select, .form-label, .error-message, .text-danger {
    padding: 10px 10px;
    margin: 5px 0;
    border-radius: 5px;
    width: 100%;
    box-sizing:
    border-box;
    color: black;
  }

  .container-section {
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

   .card {
   border: 1px solid #ccc;
   border-radius: 10px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
   }
   .card-header {
   background-color: #275FDA;
   color: white;
   padding: 10px;
   border-radius: 10px 10px 0 0;
   }
   .list-group-item {
   padding: 10px;
   }

   :deep(.column-text) {
    background-color: #f0f0f0;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    color: black;
  }

  .custom-btn-primary {
    background-color: #5dfff2;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  .custom-btn-primary:hover {
    background-color: #22514d;
    color: white;
  }

    .custom-btn-secondary {
    background-color: #acacac;
    color: black;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;
  }
  .custom-btn-secondary:hover {
    background-color: #3d3d3d;
    color: white;
  }

  .btn-container {
    display: flex;
  }

</style>
