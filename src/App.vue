<template>
  <div id="app">
    <BoxGame :style="{ fontFamily: font }"/>
    <RoundLog/>
  </div>
</template>

<script>
import BoxGame from './components/BoxGame.vue'
import RoundLog from './components/RoundLog.vue'
import {EventBus} from './eventBus.js'

export default {
  name: "vue-app",
  components: {
    BoxGame,
    RoundLog
  },
  data() {
    return{
      //Game times, s
      boxGameTime: 4,
      font: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
      
    }
  }
};
</script>

<style>
#app {
  background-color: beige;
}
</style>