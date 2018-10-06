<template>

    <div class="question question-feedback">
        <div class="question-wrap">
            <div class="question__title"><span class="question__num">{{questionNumber}}.</span> {{question | truncate(60)}}</div>
            <div class="question-feedback__data">
                <ul class="question-feedback__items">
                <li v-for="q in questionData"><span class="question-feedback__user">{{ q.user.first_name[0] }}{{ q.user.last_name[0] }}</span> {{q.feedback}}</li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        props: {
            questionData: {type: Array},
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