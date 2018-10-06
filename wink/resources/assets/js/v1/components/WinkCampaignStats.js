export default {

    props: ['total-tasks', 'submitted-tasks', 'available-tasks', 'alerts'],

    template: `<ul>
                    <li><strong>{{totalTasks}}</strong> Total</li>
                    <li><strong>{{submittedTasks}}</strong> Submitted</li>
                    <li><strong>{{availableTasks}}</strong> Available</li>
                    <li><strong>{{alerts}}</strong> Alerts</li>
                </ul>`,

    data: () => {
        return {

        }
    },

    created(){

    },

    ready(){},

    methods: {}
}