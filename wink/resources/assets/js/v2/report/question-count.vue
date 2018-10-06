<template>

    <div class="question question-count">
        <div class="question-wrap">
            <div class="question__title"><span class="question__num">{{questionNumber}}.</span> {{question | truncate(60)}}</div>
            <div class="question__data question-count__data">
                <div class="question__content question-count__content"><i v-bind:class="questionData.icon"></i> {{questionData.count}}</div>
                <div class="question__foot">{{questionData.footer}}</div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
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