<template>
    <div id="wrapper">

        <h1 id="title">Improve your aim!</h1>
        <button id="newGame" v-on:click="startGame" v-if="startSeen">New game</button>
        <div id="board" v-on:click="outsideBoxClicked">
            <div class="clickable" v-on:click="boxClicked" :style="boxPos"></div>
            <div id="timerArea">
                <p class="bubbled" id="timerValue">{{displayTime}}</p>
                <p class="bubbled">seconds left</p>
                <p class="bubbled" id="adjust">Adjust time limit: <span><input v-model.number="newTime" placeholder="New time limit" type="number" min=0 max=100></span></p>
            </div>
            <div id="highScoreArea">
                <p class="bubbled">High Score</p>
                <p class="bubbled" id="highScoreValue">{{highScore}}</p>
                <p class="bubbled" id="highScoreSeconds">at {{highSeconds}} second limit</p>
                <div id="totalScore">Score: {{currScore}}</div>
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
            newTime: 4,
            gameTime: 4,
            displayTime: 0,
            currScore: 0,
            highScore: 0,
            startSeen: true,
            countdown: null,
            //dynamically bound box position
            boxPos: {
                top: "0px",
                left: "0px"
            },
            highSeconds: 4,
            outsideBoxClickCt: 0
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
                const intId = setInterval(() => {
                    this.startSeen = !this.startSeen
                }, 100)
                setTimeout(() => clearInterval(intId), 1000)
            }
        },
        gameOver(){
            console.log('game over')
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
        outsideBoxClicked(){
            this.outsideBoxClickCt++
        }
    },
    created() {
        //Set display counter to initial time
        this.displayTime = this.gameTime
    },
    timers: {
        gameOver: {time: 0, autostart: false}
    }
}
</script>

<style scoped>
#adjust{
    position: relative;
    top: 35px;
    font-size: 15px;
    font-family: 'Times New Roman', Times, serif;
}
#board{
	position:absolute;
	left: 50%;
    margin-left: -250px;
    top: 100px;
    width: 500px;
    height: 500px;
	background-color: rgb(200,200,200);
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
}
#highScoreValue{
    font-size: 85px;
}
#highScoreSeconds{
    position: relative;
    font-size: 20px;
    font-family: 'Times New Roman', Times, serif;
    bottom: 10px;
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
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
#newGame:hover{
	cursor: pointer;
	background-color:yellow;
	border: 2px solid rgb(200,200,200);
	color:black;
}
#title{
	text-align: center;
    position: relative;
	font-size:50px;
    top: 30px;
}
#timerArea{
    position: absolute;
    width: 200px;
    height: 200px;
    right: 550px;
    border-radius: 50px;
    background-color: rgb(200,200,200);
}
#timerValue{
    font-size: 85px;
}
#totalScore{
	font-size:30px;
    position: absolute;
   	top:200px;
	left:50%; 
    width: 250px;
    margin-left: -50px;
}
#wrapper{
    height:620px;
}
</style>