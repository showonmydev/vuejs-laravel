import Vue from 'vue';
import Chart from 'chart.js';

export default Vue.extend({

    props: ['data'],

    template: '<div><canvas width="800" height="600" v-el:canvas></canvas></div>',

    data: () => {
        return {

        }
    },

    methods: {

        render(data, options, type) {

            new Chart(
                this.$els.canvas.getContext('2d'),
                {
                    type: type,
                    data: data,
                    options: options
                }
            );
        }

    }
    
});

