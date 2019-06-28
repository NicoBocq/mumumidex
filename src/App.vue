<template>
  <div id="app">
    <!-- <Logo  /> -->
    <Weather />
  </div>
</template>

<script>
import Weather from './components/Weather.vue'
import Logo from './components/Logo.vue'

export default {
  name: 'app',
  components: {
    Weather,
    Logo
  }
}
</script>

<style>
body {
    padding:0;
    margin:0;
    background-color: indianred;
    background-image: url(./assets/background.gif);
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;

}

</style>
