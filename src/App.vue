<template>
  <div id="app">
    <button
      v-if="updateExists"
      @click="refreshApp"
    >
      New version available! Click to update
    </button>
    <Header />
    <Weather />
    <Footer />
  </div>
</template>

<script>
import Weather from './components/Weather.vue'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'


export default {
  name: 'app',
  components: {
    Weather,
    Footer,
    Header
  },
  data () {
    return {
      refreshing: false,
      registration: null,
      updateExists: false,
    };
  },
  
  created () {
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });
  },
  methods: {
    showRefreshUI (e) {
      // Display a button inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.updateExists = true;
    },
    refreshApp () {
      // Handle a user tap on the update app button.
      this.updateExists = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
  },
}
</script>

<style>
html, 
body {
    height: 100%;
}
body {
    padding:0;
    margin:0;
    background-color:#000;
    background-image: url(./assets/background.gif);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;  
        display: flex;
    justify-content: center;
    align-items: center;  
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  font-size:14px;
  position: relative;
  background: rgba(0, 0, 0, 0.6);
  padding:2rem;
}

@media (max-width: 600px) {
  html, 
body {
    height: auto;
}
  #app {
      padding:1rem;
  }
}


</style>
