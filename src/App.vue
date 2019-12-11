<template>
  <div id="app">
    
    <Weater msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Weater from './components/Weater.vue'

export default {
  name: 'app',
  components: {
    Weater
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/screen.scss";

#app {
  
overflow: hidden;
}
</style>
