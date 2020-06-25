<template>
  <v-app id="app" light>
    <Header />
    <v-main>
      <v-snackbar
        v-model="snackWithButtons"
        :timeout="timeout"
        top
        class="snack"
      >
        <v-btn
          dark
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
      <v-container fluid class="fill-height">
        <Weather />
      </v-container>
    </v-main>
    <Footer />
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
      timeout: -1,
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

</style>
