<template>

    <div class="question question-stars">
        <div class="question-wrap">
            <div class="question__title"><span class="question__num">{{questionNumber}}.</span> {{question | truncate(60)}}</div>
            <div class="question__data question-star__data">
                <div class="question__content">
                     <ul class="question-star__rating">
                        <li v-bind:class="getStarCount(questionData.rating, 1)"></li>
                        <li v-bind:class="getStarCount(questionData.rating, 2)"></li>
                        <li v-bind:class="getStarCount(questionData.rating, 3)"></li>
                        <li v-bind:class="getStarCount(questionData.rating, 4)"></li>
                        <li v-bind:class="getStarCount(questionData.rating, 5)"></li>
                    </ul>
                </div>
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
            getStarCount: function (rating, star) {
                let className = "question-star--full";
                if(rating >= star){
                    className = "question-star--full";
                }
                if(rating < star){
                    className = "question-star--empty";
                }
                if(rating < star && rating > (star - 1)){
                    className = "question-star--half";
                }


                return className;
            },
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