<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Register" class="nav-link" active-class="active">Register</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Users/Index" class="nav-link" active-class="active">All Users</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Sessions/Index" class="nav-link" active-class="active">All Sessions</router-link>
        </li>
      </ul>
    </header>
  </div>
</template>
