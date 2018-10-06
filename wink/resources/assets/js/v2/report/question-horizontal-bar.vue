<template>

    <div class="question question-chart">
        <div class="question-wrap">
            <div class="question__title"><span class="question__num">{{questionNumber}}.</span> {{question | truncate(60)}}</div>
            
            <div class="question-chart__data">
                <horizontal-bar-chart :data="questionData.chartData" :height="250"></horizontal-bar-chart>
            </div>
        </div>
    </div>

</template>

<script>
import HorizontalBarChart from './horizontal-bar-chart.js'

    export default({
        props: {
            questionData: {type: Object},
            question: {type: String},
            questionNumber: {type: Number}
        },
        data() {
            return {
                
            }
        },
        mounted() {
           
        },
        methods: {

        },
        components: {
            HorizontalBarChart
        },

        filters: {

            truncate: function (string, value) {
           let suffix = '';
                if(string.length >= 60){
                    suffix = '...';
                }

                return string.substring(0, value) + suffix;
            }

        }
    })
</script>