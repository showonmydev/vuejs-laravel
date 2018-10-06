<template>

    <div class="question question-photo">
        <div class="question-wrap">
            <div class="question__title"><span class="question__num">{{questionNumber}}.</span> {{question | truncate(60)}}</div>
            <div class="question-photos__data">
                <ul class="question-photos__items">
                    <li v-for="(photo, index) in questionData" v-if="photo && photo.length > 0 && index < 10" v-bind:style="{ backgroundImage: 'url(' + photo + ')' }"></li>
                </ul>
            </div>
        </div>
    </div>

</template>

<script>
    export default({
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
    })
</script>