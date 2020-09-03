<template>
    <div id="wrapper">
        <button class="myButton" id="newGame" v-on:click="startGame" v-if="startSeen">new game</button>
        <div id="board" v-on:click="outsideBoxClicked">
            <div id="instructions" v-if="instrucShown">
                <p style="font-size:35px; font-weight:bold;">instructions:</p>
                <p>1) adjust time limit, press "new game"</p>
                <p>2) click the yellow squares</p>
                <p>3) try to maximize score:time ratio</p>
                <a href="#" class="myButton" v-on:click="dismissInst">Got it!</a>
            </div>
            <div class="clickable" v-on:click="boxClicked" :style="boxPos" v-if="!instrucShown">{{currScore + 1}}</div>
            <div id="timerArea">
                <p class="bubbled" id="timerValue">{{displayTime}}</p>
                <p class="bubbled">seconds left</p>
                <p class="bubbled" id="adjust">Adjust time limit: <span><input v-model.number="newTime" placeholder="New time limit" type="number" min=0 max=100></span></p>
            </div>
            <div id="highScoreArea">
                <p class="bubbled" id="highScoreValue">{{highScore}}</p>
                <p class="bubbled">high score</p>
            </div>
        </div>
        
	</div>
</template>

<script>
import {EventBus} from "../eventBus.js"
export default {
    name: "click-box-game",
    data () {
        return {
            newTime: 15,
            gameTime: 15,
            displayTime: 0,
            currScore: 0,
            highScore: 0,
            startSeen: false,
            countdown: null,
            //dynamically bound box position
            boxPos: {
                top: "320px",
                left: "320px"
            },
            highSeconds: 15,
            outsideBoxClickCt: 0,
            intId: null,
            instrucShown: true
        }
    },
    methods: {
        startGame(){
            //update game time with user input
            this.gameTime = this.newTime
            //make on screen counter display
            this.displayTime = this.gameTime
            //temp remove new game button
            this.startSeen = false
            //manage timer
            this.timers.gameOver.time = (this.gameTime * 1000) + 1
            this.$timer.start('gameOver')
            this.currScore = 0
            this.outsideBoxClickCt = 0
            //manage on-screen user countdown
            clearInterval(this.countdown)
            this.countdown = setInterval(() => {
                if (this.timers.gameOver.isRunning){
                    this.displayTime --
                }
            }, 1000)
            
        },
        boxClicked(){
            if(this.timers.gameOver.isRunning){
                this.currScore ++
                //random position in screen
                this.boxPos.top  = Math.floor(Math.random() * 450) + "px"
                this.boxPos.left = Math.floor(Math.random() * 450) + "px"
            } else {
                //reminder to press new game (emphasizes button)
                if(!this.timers.blinkNew.isRunning){
                    this.intId = setInterval(() => {
                        this.startSeen = !this.startSeen
                    }, 100)
                    this.$timer.start('blinkNew')
                }
                // setTimeout(() => clearInterval(intId), 1000)
            }
        },
        outsideBoxClicked(){
            this.outsideBoxClickCt++
        },
        blinkNew(){
            clearInterval(this.intId)
            this.$timer.stop('blinkNew')
        },
        gameOver(){
            this.$timer.stop('gameOver')
            //update high score
            if (this.currScore > this.highScore){
                this.highScore = this.currScore
                this.highSeconds = this.gameTime
            }
            //reset game
            this.startSeen = true
            //send round statistics to rounds template
            EventBus.$emit('gameOver', {
                score: this.currScore,
                timeTaken: this.gameTime,
                misclicks: this.outsideBoxClickCt - this.currScore
            })
        },
        dismissInst(){
            this.instrucShown = false
            this.startSeen = true
            EventBus.$emit('accepted', this.instrucShown)
        }
    },
    created() {
        //Set display counter to initial time
        this.displayTime = this.gameTime
    },
    mounted() {
        
    },
    timers: {
        gameOver: {time: 0, autostart: false},
        blinkNew: {time: 1000, autostart: false}
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@800&display=swap');

#adjust{
    position: relative;
    top: 35px;
    font-size: 15px;
}
#board{
    padding: 10px;
	position:absolute;
    z-index: 2;
	left: 50%;
    margin-left: -250px;
    top: 100px;
    width: 500px;
    height: 500px;
	background-color: rgb(200,200,200);
    border-style: solid;
    border-width: 2px;
    border-color: black;
}
.bubbled{
    font-size:30px;
	text-align: center;
}
.clickable{
	width:50px;
	height:50px;
	background-color:yellow;
	position:absolute;
    z-index: 2;
    font-size: 35px;
    text-align: center;
}
.clickable:hover{
	cursor: pointer;
}
#clock{
	font-size:30px;
	position:absolute;
	top:200px;
	left:200px;
}
#highScoreArea{
    position: absolute;
    width: 200px;
    height: 200px;
    left: 550px;
    border-radius: 50px;
    background-color: rgb(200,200,200);
    animation: fadeInHigh linear 1s;
}
#highScoreValue{
    font-size: 85px;
}
#highScoreSeconds{
    position: relative;
    font-size: 20px;
    bottom: 20px;
}
#instructions{
  position: relative;
  text-align: center;
  font-size: 20px;
  animation: fadeInHigh ease 3s;
}
.myButton {
	box-shadow:inset 0px 1px 0px 0px #fff6af;
	background:linear-gradient(to bottom, #ffec64 5%, #ffab23 100%);
	background-color:#ffec64;
	border-radius:6px;
	border:1px solid #ffaa22;
	display:inline-block;
	cursor:pointer;
	color:#333333;
	font-size:15px;
    font-weight: bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #ffee66;
}
.myButton:hover {
	background:linear-gradient(to bottom, #ffab23 5%, #ffec64 100%);
	background-color:#ffab23;
}
.myButton:active {
	position:relative;
	top:1px;
}
#newGame{
	width:300px;
	top:200px;
	left:50%;
    margin-left: -150px;
	height:100px;
	font-size:50px;
	background-color:rgba(0,0,0,0.3);
	position:absolute;
	z-index:3;
	text-align:center;
	border-radius:5px;
    font-family: 'Nunito', sans-serif;
}
#newGame:hover{
	cursor: pointer;
	background-color:yellow;
	border: 2px solid rgb(200,200,200);
	color:black;
}
#timerArea{
    position: absolute;
    width: 200px;
    height: 200px;
    right: 550px;
    border-radius: 50px;
    background-color: rgb(200,200,200);
    animation: fadeInTimer linear 1s;
}
#timerValue{
    font-size: 85px;
}
#wrapper{
    height:550px;
    animation: fadeIn linear 1s;
    font-family: 'Nunito', sans-serif;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fadeInTimer{
    0%{
        opacity: 0;
    }
    33%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
@keyframes fadeInHigh{
    0%{
        opacity: 0;
    }
    50%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>