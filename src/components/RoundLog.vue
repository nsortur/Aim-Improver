<template>
    <div id="wrapper">
        <p id="instructions">Try to maximize score:time ratio while keeping accuracy high!</p>
        <div id="area">
            <h1 style="font-size: 30px">Rounds log</h1>
            <table style="width: 100%">
                <tr>
                    <th>Score:Time (ratio)</th>
                    <th>Score (clicks)</th>
                    <th>Elapsed time (s)</th>
                    <th>Accuracy (%)</th>
                    <th>Misclicks (clicks)</th>
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
    </div>
</template>

<script>
import {EventBus} from "../eventBus.js"
export default {
    created() {
        EventBus.$on('gameOver', this.createNewStats)
    },
    data() {
        return{
            items: []
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
    font-size: 20px;

    overflow-y: scroll;
}
#instructions{
    text-align: center;
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
}
table, th, td{
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid beige;
}
#wrapper{
    height: 400px;
}
</style>