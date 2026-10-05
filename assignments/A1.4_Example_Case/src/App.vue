<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeArea = computed(() => route.path.startsWith('/ratings') ? 'ratings' : route.path.startsWith('/sessions') ? 'sessions' : 'home')
</script>

<template>
  <div class="app-shell">
    <header class="site-header">
      <RouterLink class="brand" to="/" aria-label="Fieldnotes home">
        <span class="brand-mark">F</span>
        <span>fieldnotes<span class="brand-period">.</span></span>
      </RouterLink>
      <nav class="main-nav" aria-label="Main navigation">
        <RouterLink to="/" :class="{ selected: activeArea === 'home' }">Overview</RouterLink>
        <RouterLink to="/sessions" :class="{ selected: activeArea === 'sessions' }">Sessions</RouterLink>
        <RouterLink to="/ratings" :class="{ selected: activeArea === 'ratings' }">Reflections</RouterLink>
      </nav>
      <span class="header-note"><span class="status-dot"></span> Personal journal</span>
    </header>
    <main>
      <RouterView />
    </main>
    <footer class="site-footer">
      <span>FIELDNOTES / TRAINING JOURNAL</span>
      <span>FIT5032 · Debugging case study</span>
    </footer>
  </div>
</template>
