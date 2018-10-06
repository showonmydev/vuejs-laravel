export default {

    template: `
<div class="row">
    <div class="col-xs-8">
        <h2 class="side-panel__title">{{ title }}</h2>
    </div>
    <div class="col-xs-4">
        <div class="side-panel__close" v-on:click="$parent.closepanel(), clear()"><span class="ion-ios-close-empty"></span></div>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
        <h4 v-if="errors.length > 0">Errors</h4>
        <ul>
            <li v-for="error in errors">
                Line: {{ error[0] }} - {{ error[1] }}
            </li>
        </ul>
        
        <p v-if="complete != ''">{{ complete }} rows were added to your locations</p>
    </div>
</div>

<div class="row">
    <div class="col-xs-12">
    
        <h5><a href="/files/locations-template.xlsx">Click here to download the bulk locations template</a></h5>
        
        <label for="excel">Upload your file</label>
        <input v-el:excel type="file" name="excel" id="excel" class="locations__file">
        <input type="submit" @click="submitForm" class="btn btn-primary locations__submit" value="Upload locations">
    </div>
</div>
            `,

    data: () => {
        return {
            title: "Upload Locations",
            errors: [],
            complete: ""
        }
    },

    methods: {

        submitForm: function () {

            var files = this.$els.excel.files;
            var data = new FormData();
            data.append('excel', files[0]);

            this.$els.excel.value = '';

            this.$http.post('/api/v1/locations/bulk', data, function (data, status, request) {
                this.errors  = data.errors;
                this.complete  = data.complete;

            }).error(function (data, status, request) {
                //handling
            });

        },

        clear: function(){
            setTimeout( () => {
                this.errors = [];
                this.complete = ""
            }, 1000);
        }

    }
}