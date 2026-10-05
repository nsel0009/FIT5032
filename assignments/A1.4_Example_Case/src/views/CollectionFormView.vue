<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { addDocument, database } from '../data/store'

const props = defineProps({
  collection: { type: String, required: true },
})

const router = useRouter()
const isSessions = computed(() => props.collection === 'sessions')
const error = ref('')
const today = new Date()
const localDate = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
].join('-')
const form = reactive({
  title: '',
  activity: 'Running',
  date: localDate,
  durationMinutes: '',
  notes: '',
  sessionId: '',
  rating: 8,
  mood: 'Energised',
  comment: '',
})

const backTo = computed(() => isSessions.value ? '/sessions' : '/ratings')

function sanitizeInput(event, field) {
  form[field] = event.target.value.replace(/[<>]/g, '')
}

function saveEntry() {
  error.value = ''
  const title = form.title.trim()
  if (!title) {
    error.value = 'Please add a title before saving.'
    return
  }

  if (isSessions.value) {
    const durationMinutes = Number(form.durationMinutes)
    if (!Number.isInteger(durationMinutes) || durationMinutes < 1) {
      error.value = 'Enter a session duration of at least 1 minute.'
      return
    }

    addDocument('sessions', {
      title,
      activity: form.activity,
      date: form.date,
      durationMinutes,
      notes: form.notes.trim(),
    })
  } else {
    const rating = Number(form.rating)
    if (!Number.isInteger(rating) || rating < 1 || rating > 10) {
      error.value = 'Choose a rating from 1 to 10.'
      return
    }

    addDocument('ratings', {
      sessionId: form.sessionId,
      title,
      rating,
      mood: form.mood,
      comment: form.comment.trim(),
    })
  }
  router.push(backTo.value)
}
</script>

<template>
  <section class="page-heading">
    <div>
      <div class="eyebrow"><span class="eyebrow-line"></span> YOUR JOURNAL / NEW ENTRY</div>
      <h1>{{ isSessions ? 'Log a session' : 'Write a reflection' }}</h1>
      <p>{{ isSessions ? 'Capture the details while they’re still fresh.' : 'A quick check-in can reveal a lot over time.' }}</p>
    </div>
    <RouterLink :to="backTo" class="text-link">← Back to {{ isSessions ? 'sessions' : 'reflections' }}</RouterLink>
  </section>

  <form class="entry-form" @submit.prevent="saveEntry">
    <div class="form-intro"><span>NEW ENTRY</span><span>FIELDS MARKED * ARE REQUIRED</span></div>
    <label class="field">
      <span>Title <b>*</b></span>
      <input v-model="form.title" type="text" placeholder="Give this entry a name" required @input="sanitizeInput($event, 'title')" />
    </label>

    <template v-if="isSessions">
      <div class="form-grid">
        <label class="field"><span>Activity</span>
          <select v-model="form.activity"><option>Running</option><option>Strength</option><option>Swimming</option><option>Cycling</option><option>Yoga</option></select>
        </label>
        <label class="field"><span>Date</span><input v-model="form.date" type="date" /></label>
      </div>
      <label class="field"><span>Duration <small>(minutes)</small> <b>*</b></span><input v-model="form.durationMinutes" type="number" min="1" step="1" placeholder="e.g. 40" required /></label>
      <label class="field"><span>Session notes</span><textarea v-model="form.notes" rows="4" placeholder="What did you work on?" @input="sanitizeInput($event, 'notes')"></textarea></label>
    </template>

    <template v-else>
      <label class="field"><span>Related session</span>
        <select v-model="form.sessionId"><option value="">Choose a session</option><option v-for="session in database.sessions" :key="session.id" :value="session.id">{{ session.title }}</option></select>
      </label>
      <div class="form-grid">
        <label class="field"><span>Rating <small>(out of 10)</small> <b>*</b></span><input v-model="form.rating" type="number" min="1" max="10" step="1" required /></label>
        <label class="field"><span>Mood</span><select v-model="form.mood"><option>Energised</option><option>Focused</option><option>Calm</option><option>Tired</option><option>Frustrated</option></select></label>
      </div>
      <label class="field"><span>Reflection</span><textarea v-model="form.comment" rows="4" placeholder="How did the session feel?" @input="sanitizeInput($event, 'comment')"></textarea></label>
    </template>

    <p v-if="error" class="form-error" role="alert">{{ error }}</p>
    <div class="form-actions"><button class="button button-dark" type="submit">Save entry <span aria-hidden="true">↗</span></button><RouterLink :to="backTo" class="text-link">Cancel</RouterLink></div>
  </form>
</template>
