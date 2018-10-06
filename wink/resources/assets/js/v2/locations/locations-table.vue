<template>

    <div class="page__content page--bg">

        <locations-form v-if="showLocationEdit" @close="onClose" :location-data="selectedLocation" :tags-data="tags"
                        :brands-data="brands"></locations-form>
        <div class="campaigns-table" v-if="locations.length > 0">

            <div v-for="location in locations" v-if="location.name != 'Unknown'" class="campaigns-table__row">


                <div class="campaigns-table__row-title" style="margin-left: 20px"><a href="javascript:;"
                                                                                     v-on:click="selectLocation(location)"><span
                        class="table__chars"
                        v-bind:class="getRandomBackground(location.name[0])">{{location.name[0]}}</span><span
                        class="resourcelist__name -slate">{{ location.name | truncate(90) }}</span></a></div>
                <div class="campaigns-table__row-status-full">{{location.address | truncate(50) }}</div>


                <div class="pull-right"><span class="pull-right edit-dropdown"></span></div>

                <div class="pull-right campaigns-table__row-status-short">{{location.latitude | truncate(7)}} - {{location.longitude | truncate(7) }}</div>
            </div>


        </div>
        <p v-else>There are no locations currently</p>

    </div>

</template>


<script>

    export default {
        props: {
            tagsData: {type: Array},
            brandsData: {type: Array},
            locationsData: {type: Array}
        },
        data() {
            return {
                locations: [],
                selectedLocation: null,
                showLocationEdit: false,
                tags: [],
                brands: [],
            }
        },
        watch: {
            locationsData: function () {
                this.locations = this.locationsData;
                this.tags = this.tagsData;
            }
        },
        mounted() {
            this.tags = (this.tagsData) ? this.tagsData : [];
            this.brands = (this.brandsData) ? this.brandsData : [];
            this.locations = (this.locationsData) ? this.locationsData : [];

            console.log(this.locations);

        },
        filters: {

            truncate: function (string, value) {
                var output = string.substring(0, value);
                if(string.length > value){
                    output = output + "...";
                }

                return output;
            }

        },

        methods: {
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
            launchLocationAddModal: function () {
                this.showLocationAdd = true;
            },
            launchLocationEditModal: function () {
                this.showLocationEdit = true;
            },
            selectLocation: function (location) {
                if (!location.submitted) {
                    this.selectedLocation = location;
                    this.launchLocationEditModal();
                }
            },
            // Close the overlay
            onClose: function () {
                this.showLocationEdit = false;
            }
        }
    }
</script>