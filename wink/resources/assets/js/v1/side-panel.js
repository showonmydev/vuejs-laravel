new Vue({
    
    el: "#app",
    
    data: {
        task: {},
        isVisible: false
    },

    methods: {

        showPanel: function(value){
            this.isVisible = value;
        },
        
        getAlert: function(task_id){
            console.log('task id ' + task_id);
            this.showPanel(true);
        }

    }
    
});