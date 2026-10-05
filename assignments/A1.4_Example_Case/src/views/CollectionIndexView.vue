<script setup>
import { computed, ref } from 'vue'
import { database } from '../data/store'

const props = defineProps({
  collection: { type: String, required: true },
})

const search = ref('')
const isSessions = computed(() => props.collection === 'sessions')
const title = computed(() => isSessions.value ? 'Training sessions' : 'Session reflections')
const description = computed(() => isSessions.value
  ? 'A record of the movement, time and effort you put in.'
  : 'Check in with your progress and capture how each session felt.')
const records = computed(() => database[props.collection])

const visibleRecords = computed(() => records.value.filter((item) => {
  const query = search.value.toLowerCase()
  const searchable = isSessions.value ? `${item.title} ${item.activity} ${item.notes}` : `${item.title} ${item.mood} ${item.comment}`
  return searchable.toLowerCase().includes(query)
}))

function sessionTitle(id) {
  return database.sessions.find((session) => session.id === id)?.title ?? 'Session not found'
}
</script>

<template>
  <section class="page-heading">
    <div>
      <div class="eyebrow"><span class="eyebrow-line"></span> YOUR JOURNAL / {{ isSessions ? '01' : '02' }}</div>
      <h1>{{ title }}<span class="heading-count">{{ String(records.length).padStart(2, '0') }}</span></h1>
      <p>{{ description }}</p>
    </div>
    <RouterLink :to="isSessions ? '/sessions/new' : '/ratings/new'" class="button button-dark">＋ Add {{ isSessions ? 'session' : 'reflection' }}</RouterLink>
  </section>

  <section class="list-toolbar">
    <label class="search-box"><span aria-hidden="true">⌕</span><input v-model="search" type="search" :placeholder="`Search ${isSessions ? 'sessions' : 'reflections'}...`" /></label>
    <span class="result-count">{{ visibleRecords.length }} RECORDS</span>
  </section>

  <section v-if="visibleRecords.length" class="record-list">
    <RouterLink v-for="(record, index) in visibleRecords" :key="record.id" :to="`/${collection}/${record.id}`" class="record-row">
      <span class="record-index">{{ String(index + 1).padStart(2, '0') }}</span>
      <span class="record-main">
        <strong>{{ record.title }}</strong>
        <small v-if="isSessions">{{ record.activity }} <span>·</span> {{ record.date }}</small>
        <small v-else>{{ record.mood }} <span>·</span> {{ sessionTitle(record.sessionId) }}</small>
      </span>
      <span class="record-meta" v-if="isSessions">{{ record.durationMinutes }} <small>MIN</small></span>
      <span class="rating-meta" v-else>{{ record.rating }}<small> / 10</small></span>
      <span class="arrow" aria-hidden="true">↗</span>
    </RouterLink>
  </section>
  <section v-else class="empty-state">
    <span class="empty-icon">○</span>
    <h2>{{ search ? 'Nothing found' : 'A blank page, for now.' }}</h2>
    <p>{{ search ? 'Try a different search term.' : 'Add your first entry to start your journal.' }}</p>
    <RouterLink :to="isSessions ? '/sessions/new' : '/ratings/new'" class="text-link">Create an entry <span aria-hidden="true">→</span></RouterLink>
  </section>
</template>
