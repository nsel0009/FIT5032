<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { database } from '../data/store'

const props = defineProps({
  collection: { type: String, required: true },
})

const route = useRoute()
const isSessions = computed(() => props.collection === 'sessions')
const backTo = computed(() => isSessions.value ? '/sessions' : '/ratings')
const document = computed(() => database[props.collection].find((item) => item.id === route.params.id))
const relatedSession = computed(() => database.sessions.find((session) => session.id === document.value?.sessionId))
</script>

<template>
  <template v-if="document">
    <section class="page-heading">
      <div>
        <div class="eyebrow"><span class="eyebrow-line"></span> YOUR JOURNAL / {{ isSessions ? 'SESSION' : 'REFLECTION' }}</div>
        <h1>{{ document.title }}</h1>
        <p>{{ isSessions ? `${document.activity} · ${document.date}` : `A reflection from ${document.mood?.toLowerCase() ?? 'your journal'}` }}</p>
      </div>
      <RouterLink :to="backTo" class="text-link">← Back to {{ isSessions ? 'sessions' : 'reflections' }}</RouterLink>
    </section>

    <article class="detail-card">
      <div class="detail-topline"><span>{{ isSessions ? 'SESSION NOTES' : 'PERSONAL REFLECTION' }}</span><span>{{ document.id }}</span></div>
      <template v-if="isSessions">
        <div class="detail-stats">
          <div><span>ACTIVITY</span><strong>{{ document.activity }}</strong></div>
          <div><span>DATE</span><strong>{{ document.date }}</strong></div>
          <div><span>DURATION</span><strong>{{ document.durationMinutes }} <small>MIN</small></strong></div>
        </div>
        <div class="detail-copy"><span>THE SESSION</span><p>{{ document.notes || 'No notes were added for this session.' }}</p></div>
      </template>
      <template v-else>
        <div class="rating-feature"><strong>{{ document.rating }}</strong><span>/ 10</span><span class="rating-mood">{{ document.mood }}</span></div>
        <div class="detail-copy"><span>REFLECTION</span><p>{{ document.comment || 'No reflection was added.' }}</p></div>
        <RouterLink v-if="relatedSession" :to="`/sessions/${relatedSession.id}`" class="related-session"><span>RELATED SESSION</span><strong>{{ relatedSession.title }}</strong><span class="arrow">↗</span></RouterLink>
      </template>
    </article>
  </template>
  <section v-else class="empty-state">
    <span class="empty-icon">?</span><h2>Entry not found</h2><p>This document may have been moved or removed.</p>
    <RouterLink :to="backTo" class="text-link">Return to {{ isSessions ? 'sessions' : 'reflections' }} <span aria-hidden="true">→</span></RouterLink>
  </section>
</template>
