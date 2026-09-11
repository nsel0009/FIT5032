import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpTTychGfDi4J7Mo4e3jpIusZHgtHVHxU",
  authDomain: "fit5032-50180.firebaseapp.com",
  projectId: "fit5032-50180",
  storageBucket: "fit5032-50180.firebasestorage.app",
  messagingSenderId: "1061813704441",
  appId: "1:1061813704441:web:8ef8941af5bb0df4a1f428"
};

// Initialize Firebase
initializeApp(firebaseConfig);

app.mount('#app')
