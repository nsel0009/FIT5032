<template>
    <div class="logo-image">
      <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
    </div>
    <br />
    <div>
      <h1>FIT5032 - NFP Environmental Education and Climate Literacy</h1>
      <p>Welcome to the Landing Page</p>
    </div>
</template>

<script setup>
</script>

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

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  header {
    margin: 0;
    text-align: center;
  }

  .logo-image {
    display: flex;
    justify-content: center;
  }

  .container-section {
    width: 100%;
  }

}
</style>
