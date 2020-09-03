<template>
    <div id="wrapper">
        <div id="area">
            <h1 style="font-size:30px;" v-if="instAccepted">rounds log</h1>
            <table style="width: 100%" v-if="instAccepted">
                <tr>
                    <th>score:time</th>
                    <th>score</th>
                    <th>time</th>
                    <th>accuracy</th>
                    <th>misclicks</th>
                </tr>
                <tr v-for="round in items" :key="round.score">
                    <td>
                        {{
                        (round.score / round.timeTaken).toFixed(2)
                        }}
                    </td>
                    <td>{{round.score}}</td>
                    <td>{{round.timeTaken}}</td>
                    <td>
                        {{
                        ((round.score / (round.misclicks + round.score)) * 100).toFixed(2)
                        }}
                    </td>
                    <td>{{round.misclicks}}</td>
                </tr>
            </table>
        </div>
        <p id="watermark">Created by Neel Sortur, 2020</p>
    </div>
</template>

<script>
import {EventBus} from "../eventBus.js"
export default {
    created() {
        EventBus.$on('gameOver', this.createNewStats)
        EventBus.$on('accepted', (instrucShown) => this.instAccepted = !instrucShown)
    },
    data() {
        return{
            items: [],
            instAccepted: false
        }
    },
    methods: {
        createNewStats(newStats){
            //add new round statistics to items variable
            this.items.splice(0, 0, {
                score: newStats.score,
                timeTaken: newStats.timeTaken,
                misclicks: newStats.misclicks
            })
        }
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito&display=swap');

#area{
    position: relative;
    left: 50%;
    margin-left: -300px;
    width: 600px;
    height: 200px;
    border-radius: 50px;
    background-color: rgb(200,200,200);
    padding: 10px;
    text-align: center;
    font-size: 15px;
    font-family: 'Nunito', sans-serif;
    overflow-y: scroll;
}
table, th, td{
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid beige;
    table-layout: fixed;
}
#watermark{
  position: relative;
  top: 120px;
  left: 20px;
}
#wrapper{
    height: 350px;
    animation: fadeIn linear 1.5s;
    background-color: beige;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    60% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>