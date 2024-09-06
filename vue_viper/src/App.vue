<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import './assets/style/base.css'
import Home from './components/Home.vue';
export default {
  name: 'app',
  components: {
    Home
  }
}
</script>

<style>
#app {
    height: 100vh;
}
</style>
