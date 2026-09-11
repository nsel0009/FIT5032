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

        <template v-if="isLoggedIn">
        <!-- Admin Visible Links -->
        <li class="nav-item" v-if="userRole === 'admin'">
          <router-link to="/Users/Index" class="nav-link" active-class="active">All Users</router-link>
        </li>
        <li class="nav-item" v-if="userRole === 'admin'">
          <router-link to="/Sessions/Index" class="nav-link" active-class="active">All Sessions</router-link>
        </li>

        <!-- User Visible Links -->
        <li class="nav-item" v-if="userRole === 'user'">
          <router-link to="/Ratings/Index" class="nav-link" active-class="active">All Ratings</router-link>
        </li>

        <!-- Log Out -->
         <p>({{ username }})</p>
         <li class="nav-item">
           <a class="nav-link" href="#" @click="handleLogout">Logout</a>
         </li>

        </template>
        <template v-else>
        <!-- Login and Register Links -->
        <li class="nav-item">
          <router-link to="/Login" class="nav-link" active-class="active">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/Register" class="nav-link" active-class="active">Register</router-link>
        </li>
        </template>
      </ul>
    </header>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';


const loggedInUser = ref(null);
const profileData = ref(null);
const loading = ref(true);
const isLoggedIn = ref(false);
const userRole = ref('');
const username = ref('');

onMounted(() => {

  const auth = getAuth();
  const db = getFirestore();

  onAuthStateChanged(auth, async (user) => {
    loading.value = true;
    if (user) {
      loggedInUser.value = user;
      isLoggedIn.value = true;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        profileData.value = docSnap.data();
        userRole.value = profileData.value.role || 'user';
        username.value = profileData.value.username || 'User';
      }
    } else {
      loggedInUser.value = false;
      profileData.value = null;
      isLoggedIn.value = false;
      userRole.value = '';
      username.value = '';
    }
    loading.value = false;
  });
});

const handleLogout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};

</script>
