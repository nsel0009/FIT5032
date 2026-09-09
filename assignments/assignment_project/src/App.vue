<script setup>
  import BHeader from './components/BHeader.vue';
</script>

<template>
  <div class="main-container">
    <header>
      <BHeader />
    </header>
  </div>

  <div class="main-box">
    <div class="wrapper">
      <section class="container-section">
        <div>
          <router-view></router-view>
        </div>
      </section>
    </div>
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
