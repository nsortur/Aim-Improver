<template>
  <div id="app">
    <h1 id="title">improve your aim!</h1>
    <BoxGame/>
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
      instrucShown: false
    }
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap');

#app {
  background-color: beige;
  height: 1000px;
  font-family: 'Nunito', sans-serif;
}
#title{
	text-align: center;
  position: relative;
	font-size:50px;
  top: 30px;
  animation: fadeIn linear 1.5s;
}
#game{
  width: 75%;
}
#rounds{
  width: 25%;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fadeInInst{
  0%{
    opacity: 0;
  }
  75%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}
</style>