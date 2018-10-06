<template>

    <div>
        
            <div>
                <label for="tag_list">Tags</label>
                <div id="tag_list" class="tag-list">
                    <div><span class="item-details" v-on:click="selectAllTags()" v-bind:class="{ active: isAllTags() }">
                            All tags
                        </span></div>
                    <div v-for="tag in tags">

                        <span class="item-details" v-on:click="toggleTag(tag)"
                              v-bind:class="{ active: isSelectedTag(tag) }">
                            {{tag.name}}
                        </span>

                    </div>

                </div>
            </div>

            <div>
                <label for="location_list">Selected locations ({{currentLocations.length}})

                    <span class="pull-right">
    <a href="#" v-on:click="selectAll()">Select All</a> |     <a href="#" v-on:click="clearAll()">Clear All</a>
                    </span>

                </label>

                <div class="overlay__list" id="location_list">
                    <!--// For users in users-->
                    <div v-for="location in locations" v-if="location.name != 'Unknown'" class="overlay__list-item">
                        <div class="overlay__list-item-chars">
                            <span class="table__chars" v-bind:class="getRandomBackground(location.name[0])">{{location.name[0]}}</span>
                        </div>
                        <div class="overlay__list-item-details">
                            <span class="list-main">{{location.name}}</span>
                            <span class="list-secondary">{{location.address}}</span>
                        </div>
                        <div v-on:click="toggleLocation(location)" class="overlay__list-item-add">
                            <img v-if="isSelectedLocation(location)" src="/images/checkmark.svg" alt="Checkmark">
                        </div>
                    </div>
                </div>
                <!-- <button class="btn btn--blue btn-block" v-on:click="updateLocations" >Save Changes</button> -->
            </div>


       
    </div>

</template>

<script>

    export default {
        props: {
            tagData: {type: Array},
            brandsData: {type: Array},
            locationData: {type: Array},
            selectedCampaign: {type: Object}
        },
        data() {
            return {
                tags: [],
                brands: [],
                locations: {},
                allLocations: {},
                formData: {},
                currentLocations: [],
                currentTags: [],

            }
        },
        mounted() {
            this.tags = (this.tagData) ? this.tagData : [];
            this.brands = (this.brandsData) ? this.brandsData : [];
            this.locations = (this.locationData) ? this.locationData : {};
            this.campaign   = (this.selectedCampaign) ? this.selectedCampaign : {};
            this.allLocations = (this.locationData) ? this.locationData : {};
            this.currentLocations = [];
            this.currentTags = [];

            this.getSelectedLocations();
        },

        watch: {},

        methods: {

            close: function () {

                this.$emit('close', this.currentLocations);
            },

            getRandomBackground: function (str) {
              var colours = ['red', 'green', 'yellow', 'blue1', 'green1', 'blue2', 'green2', 'pink1', 'yellow1', 'blue3', 'brown', 'pink2', 'purple2', 'green4'];
                var arr = [];
                
                arr = ['A','N'];
                if(arr.indexOf(str) >= 0){
                    return 'red';
                }

                arr = ['B','O'];
                if( arr.indexOf(str) >= 0){
                    return 'green';
                }

                arr = ['C','P'];
                if(arr.indexOf(str) >= 0){
                    return 'yellow';
                }

                arr = ['D','Q'];
                if(arr.indexOf(str) >= 0){
                    return 'blue1';
                }

                arr = ['E','R'];
                if(arr.indexOf(str) >= 0){
                    return 'blue2';
                }

                arr = ['F','S'];
                if(arr.indexOf(str) >= 0){
                    return 'green2';
                }

                arr = ['G','T'];
                if(arr.indexOf(str) >= 0){
                    return 'pink1';
                }

                arr = ['H','U'];
                if(arr.indexOf(str) >= 0){
                    return 'yellow1';
                }

                arr = ['I','V'];
                if(arr.indexOf(str) >= 0){
                    return 'blue3';
                }

                arr = ['J','W'];
                if(arr.indexOf(str) >= 0){
                    return 'brown';
                }

                arr = ['K','X'];
                if(arr.indexOf(str) >= 0){
                    return 'pink2';
                }

                arr = ['L','Y'];
                if(arr.indexOf(str) >= 0){
                    return 'purple2';
                }

                arr = ['M','Z'];
                if(arr.indexOf(str) >= 0){
                    return 'green4';
                }

                return colours[Math.floor(Math.random() * colours.length)];

            },

            updateLocations: function () {
                var formData = {
                    'locations_array': this.currentLocations,
                };
                // console.log(formData);

                axios.post('/locations/campaign/' + this.campaign.id, formData)
                    .then(response => {
                        // Find the request by id
                        
                    });

                this.$emit('update', this.currentLocations);
            },

            // Is this user in the selected team
            isSelectedLocation: function (location) {
                return this.currentLocations.includes(location.id);
            },

            // Is this user in the selected team
            isSelectedTag: function (tag) {
                return this.currentTags.includes(tag.id);
            },

            isAllTags: function () {
                if (this.currentTags.length == 0) {
                    return true;
                }

                return false;
            },

            // Is this user in the selected team
            selectAll: function () {
                this.currentLocations = [];
                this.allLocations.forEach((location) => {
                    this.currentLocations.push(location.id);
                });

                this.updateLocations();

            },

            // Is this user in the selected team
            selectAllTags: function () {
                this.currentTags = [];
                this.locations = this.allLocations;

                this.updateLocations();
            },

            // Is this user in the selected team
            clearAll: function () {
                this.currentLocations = [];

                this.updateLocations();
            },

            // Toggle the team member on or off
            toggleLocation: function (location) {
                // Toggle the green icon on or off
                let index = this.currentLocations.indexOf(location.id);
                if (index > -1) {
                    this.currentLocations.splice(index, 1);
                } else {
                    this.currentLocations.push(location.id);
                }

                this.updateLocations();
            },

            getLocations: function () {
                this.locations = this.allLocations;

                if (this.locations.length > 0) {
                    this.currentLocations = [];
                    this.allLocations.forEach((location) => {
                        var pass = 0;
                        this.currentTags.forEach((tag) => {

                            if (location.tags.includes(tag)) {
                                pass = 1;
                            }
                        });
                        if (pass == 1) {
                            this.currentLocations.push(location.id);
                        }
                    });
                } else {
                    this.currentTags = [];
                    this.currentLocations = [];
                }
            },

            getSelectedLocations: function () {
                this.currentLocations = [];
                if(this.campaign.location_ids.length > 1){
                    this.currentLocations = this.campaign.location_ids;
                }
                
            },

            // Toggle the team member on or off
            toggleTag: function (tag) {
                // Toggle the green icon on or off
                let index = this.currentTags.indexOf(tag.id);
                if (index > -1) {
                    this.currentTags.splice(index, 1);
                } else {
                    this.currentTags.push(tag.id);
                }

               
                this.getLocations();

                this.updateLocations();

            },

        }
    };


</script>

