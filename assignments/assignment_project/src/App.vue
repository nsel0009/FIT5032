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
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
</style>
