import WinkPieChart from './WinkPieChart';
import WinkBarChart from './WinkBarChart';
import WinkRatingChart from './WinkRatingChart';

export default {

    props: ['questions'],

    template: '#wink-campaign-results',

    components: { WinkPieChart, WinkBarChart, WinkRatingChart },

    data: () => {
        return {

        }
    },

    created(){
        this.questions = JSON.parse(this.questions);
    },

    ready(){
        console.log('numberGPS question lenth', this.questions);
    },

    computed: {
        // a computed getter
        numberGPS: function () {

            let GPS = this.questions.filter((question) => {
                return question.question == "GPS"
            });
            return GPS.length;
        }
    },

    methods: {

    }
}