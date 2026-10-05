<script setup>
import { database } from '../data/store'

const activities = ['Running', 'Strength', 'Swimming']
</script>

<template>
  <section class="hero">
    <div class="hero-copy">
      <div class="eyebrow"><span class="eyebrow-line"></span> YOUR PRACTICE, IN PERSPECTIVE</div>
      <h1>Build a rhythm.<br /><em>Notice the change.</em></h1>
      <p class="hero-description">A quiet place to keep track of the work you put in—and how it feels along the way.</p>
      <div class="hero-actions">
        <RouterLink to="/sessions/new" class="button button-dark">Log a session <span aria-hidden="true">↗</span></RouterLink>
        <RouterLink to="/ratings/new" class="text-link">Write a reflection <span aria-hidden="true">→</span></RouterLink>
      </div>
      <div class="hero-caption">SMALL STEPS ADD UP <span>—</span> KEEP SHOWING UP</div>
    </div>
    <div class="hero-art" aria-label="Abstract illustration of a running trail">
      <div class="art-sun"></div>
      <div class="art-hill art-hill-back"></div>
      <div class="art-hill art-hill-front"></div>
      <div class="art-path"></div>
      <div class="art-label">01 / KEEP MOVING</div>
      <div class="art-coordinate">37°48' S<br />144°57' E</div>
      <div class="art-stamp">EST.<br /><strong>2026</strong></div>
    </div>
  </section>

  <section class="stats-row" aria-label="Journal summary">
    <div class="stat-intro">
      <span class="eyebrow">A LIVING RECORD</span>
      <p>Consistency is its own kind of progress.</p>
    </div>
    <div class="stat"><strong>{{ database.sessions.length }}</strong><span>SESSIONS LOGGED</span></div>
    <div class="stat"><strong>{{ database.ratings.length }}</strong><span>REFLECTIONS</span></div>
    <div class="stat"><strong>{{ activities.length }}</strong><span>WAYS TO MOVE</span></div>
  </section>

  <section class="home-lower">
    <div>
      <div class="eyebrow"><span class="eyebrow-line"></span> TWO SIDES OF THE PRACTICE</div>
      <h2>Record the effort.<br /><em>Remember the feeling.</em></h2>
    </div>
    <div class="collection-links">
      <RouterLink to="/sessions" class="collection-link">
        <span class="collection-number">01</span><span><strong>Training sessions</strong><small>Activities, dates and notes</small></span><span class="arrow">↗</span>
      </RouterLink>
      <RouterLink to="/ratings" class="collection-link">
        <span class="collection-number">02</span><span><strong>Session reflections</strong><small>Ratings, moods and takeaways</small></span><span class="arrow">↗</span>
      </RouterLink>
    </div>
  </section>
</template>
