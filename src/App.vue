<template>
  <v-app id="app" dark>
    <!-- <video playsinline autoplay muted loop>
        <source :src='require("@/assets/background.mp4")' type='video/mp4'>
    </video> -->
    <v-content>
      <v-snackbar
        v-model="snackWithButtons"
        :timeout="timeout"
        top
        class="snack"
      >
        <v-btn
          dark
          flat
          color="#00f500"
          @click.native="refreshApp"
        >
          {{ snackBtnText }}
        </v-btn>
        <v-btn
          icon
          @click="snackWithButtons = false"
        >
          <font-awesome-icon icon="times" />
        </v-btn>
      </v-snackbar>
      <v-container fluid>
        <Header />
        <Weather />
        <Footer />
      </v-container>
    </v-content>
  </v-app>
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
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
      timeout: 0,
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
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackBtnText = 'Mettre à jour';
      this.snackWithBtnText = 'Mettre à jour';
      this.snackWithButtons = true;
    },
    refreshApp () {
      this.snackWithButtons = false;
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
    background-color: #000;
}
a {
  color: #fff !important;
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

 video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%; 
  min-height: 100%;
  overflow: hidden;
  z-index: -100;
 }

@media (max-width: 600px) {
  html, 
body {
    height: auto;
}

}


</style>
