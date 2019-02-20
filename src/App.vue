1<template>
    <div class=container>
        <div class="resultBox">
            <div></div>
        </div>
        <div>
            <button type="button" class="buttons" id="one">1</button>
            <button type="button" class="buttons" id="two">2</button>
            <button type="button" class="buttons" id="three">3</button>
            <button type="button" class="buttons" id="four">4</button>
            <button type="button" class="buttons" id="five">5</button>
            <button type="button" class="buttons" id="six">6</button>
            <button type="button" class="buttons" id="seven">7</button>
            <button type="button" class="buttons" id="eight">8</button>
            <button type="button" class="buttons" id="nine">9</button>
            <button type="button" class="buttons" id="zero">0</button>
            <button type="button" class="buttons" id="equals">=</button>
        </div>
        <div>
            <button type="button" class="buttons" id="divide">/</button>
            <button type="button" class="buttons" id="mult">X</button>
            <button type="button" class="buttons" id="minus">-</button>
            <button type="button" class="buttons" id="plus">+</button>
            <button type="button" class="buttons" id="clear">CLEAR</button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'vue-app',
  
}
</script>

<style>
.container{
    position:absolute;
    width: 300px;
    height: 600px;
    border: 10px solid blue;
    padding: 200px;
}
.resultBox{
    position:absolute;
    top:0px;
    left:0px;
    border: 10px solid black;
    width: 400px;
    height:100px;
    background:transparent;
    background-color:antiquewhite;
    
}
.buttons{
    padding:10px;
    width:100px;
    height: 100px;
    border:5px solid black;
}
.buttons:hover{
    background-color: grey;
    cursor:pointer;
}
#one{
    position:absolute;
    top:300px;
    left:0px;
}
#two{
    position:absolute;
    top:300px;
    left:100px;
}
#three{
    position:absolute;
    top:300px;
    left:200px;
}
#four{
    position:absolute;
    top:200px;
    left:0px;
}
#five{
    position:absolute;
    top:200px;
    left:100px;
}
#six{
    position:absolute;
    top:200px;
    left:200px;
}
#seven{
    position:absolute;
    top:100px;
    left:0px;
}
#eight{
    position:absolute;
    top:100px;
    left:100px;
}
#nine{
    position:absolute;
    top:100px;
    left:200px;
}
#zero{
    position:absolute;
    top:400px;
    left:0px;
    width:200px;
}
#equals{
    position:absolute;
    top:400px;
    left:200px;
    width:100px;
}
#divide{
    position:absolute;
    top:100px;
    left:300px;
    width:100px;
}
#mult{
    position:absolute;
    top:200px;
    left:300px;
    width:100px;
}
#minus{
    position:absolute;
    top:300px;
    left:300px;
    width:100px;
}
#plus{
    position:absolute;
    top:400px;
    left:300px;
    width:100px;
}
#clear{
    position:absolute;
    top:500px;
    height:80px;
    left:0px;
    width:400px;
}
</style>

