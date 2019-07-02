<template>
  <div id="app">
    <Weather />
    <Footer />
  </div>
</template>

<script>
import Weather from './components/Weather.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: {
    Weather,
    Footer
  }
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
}

@media (max-width: 600px) {
  html, 
body {
    height: auto;
}
}


</style>
