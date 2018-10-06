<template>

    <div class="question question-chart">
        <div class="question-wrap">
            <div class="question__title"><span class="question__num">{{questionNumber}}.</span> {{question | truncate(60)}}</div>
            <div class="question-chart__data">
                <doughnut-chart :data="questionData.chartData" :height="280"></doughnut-chart>
            </div>
        </div>
    </div>

</template>

<script>
    import DoughnutChart from './doughnut-chart.js'

    export default {
        props: {
            questionData: {type: Object},
            question: {type: String},
            questionNumber: {type: Number}
        },
        data() {
            return {}
        },
        mounted() {

        },
        methods: {},
        components: {
            DoughnutChart
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
    }
</script>