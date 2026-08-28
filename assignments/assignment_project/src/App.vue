<script setup>
import RegistrationForm from './components/RegistrationForm.vue';
import JSON from './components/JSON.vue';
</script>

<template>
  <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  <br />
  <div class="wrapper">
    <header>
      <h1>FIT5032 - NFP Environmental Education and Climate Literacy</h1>
    </header>
  </div>

  <br />
  <div class="wrapper">
    <section class="lab-section">
      <h2>Registration Form</h2>
      <p>Fill out the form below to register a new user.</p>
      <main>
        <RegistrationForm />
      </main>
    </section>
  </div>

  <br />
  <div class="wrapper">
    <section class="lab-section">
      <main>
        <JSON />
      </main>
    </section>
  </div>
</template>

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

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
