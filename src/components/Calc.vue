<template>
    <div class="container">
    <div id="resultBox"></div>
    <div>
      <button type="button" class="buttons" id="one" @click="display(1)">1</button>
      <button type="button" class="buttons" id="two" @click="display(2)">2</button>
      <button type="button" class="buttons" id="three" @click="display(3)">3</button>
      <button type="button" class="buttons" id="four" @click="display(4)">4</button>
      <button type="button" class="buttons" id="five" @click="display(5)">5</button>
      <button type="button" class="buttons" id="six" @click="display(6)">6</button>
      <button type="button" class="buttons" id="seven" @click="display(7)">7</button>
      <button type="button" class="buttons" id="eight" @click="display(8)">8</button>
      <button type="button" class="buttons" id="nine" @click="display(9)">9</button>
      <button type="button" class="buttons" id="zero" @click="display(0)">0</button>
      <button type="button" class="buttons" id="equals" @click="calculate()">=</button>
    </div>
    <div>
      <button type="button" class="buttons" id="divide" @click="display(' / ')">/</button>
      <button type="button" class="buttons" id="mult" @click="display(' * ')">×</button>
      <button type="button" class="buttons" id="minus" @click="display(' - ')">-</button>
      <button type="button" class="buttons" id="plus" @click="display(' + ')">+</button>
      <button type="button" class="buttons" id="clear" @click="clear()">CLEAR</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstVal: 0,
      secondVal: 0,
      result: 0,
      resulted: false
    };
  },
  methods: {
    calculate() {

      var a = eval(document.getElementById("resultBox").innerHTML);
      document.getElementById("resultBox").innerHTML = a;

      this.resulted = true;
    },
    display(event) {
      if (
        document.getElementById("resultBox").innerHTML != "" &&
        this.resulted
      ) {
        if (Number.isInteger(event)) {
          document.getElementById("resultBox").innerHTML = "";
          
        }
        this.resulted = false;
      }
      document.getElementById("resultBox").innerHTML += event;
    },
    clear() {
      document.getElementById("resultBox").innerHTML = "";
    }
  }
}
</script>

<style scoped>
.container {
  position: absolute;
  width: 300px;
  height: 600px;
  border: 10px solid blue;
  padding: 200px;
}
#resultBox {
  position: absolute;
  top: 0px;
  left: 0px;
  border: 10px solid black;
  width: 400px;
  height: 100px;
  background: transparent;
  background-color: antiquewhite;
  font-size: 45px;
  color: black;
  padding-right: 10px;
  text-align: right;
}
.buttons {
  padding: 10px;
  width: 100px;
  height: 100px;
  border: 5px solid black;
  font-size: 35px;
}
.buttons:hover {
  background-color: grey;
  cursor: pointer;
}
#one {
  position: absolute;
  top: 300px;
  left: 0px;
}
#two {
  position: absolute;
  top: 300px;
  left: 100px;
}
#three {
  position: absolute;
  top: 300px;
  left: 200px;
}
#four {
  position: absolute;
  top: 200px;
  left: 0px;
}
#five {
  position: absolute;
  top: 200px;
  left: 100px;
}
#six {
  position: absolute;
  top: 200px;
  left: 200px;
}
#seven {
  position: absolute;
  top: 100px;
  left: 0px;
}
#eight {
  position: absolute;
  top: 100px;
  left: 100px;
}
#nine {
  position: absolute;
  top: 100px;
  left: 200px;
}
#zero {
  position: absolute;
  top: 400px;
  left: 0px;
  width: 200px;
}
#equals {
  position: absolute;
  top: 400px;
  left: 200px;
  width: 100px;
}
#divide {
  position: absolute;
  top: 100px;
  left: 300px;
  width: 100px;
}
#mult {
  position: absolute;
  top: 200px;
  left: 300px;
  width: 100px;
}
#minus {
  position: absolute;
  top: 300px;
  left: 300px;
  width: 100px;
}
#plus {
  position: absolute;
  top: 400px;
  left: 300px;
  width: 100px;
}
#clear {
  position: absolute;
  top: 500px;
  height: 80px;
  left: 0px;
  width: 400px;
}
</style>