<template>

    <div class="page__body">
        <div class="container-fluid page__header">
            <div class="row">
                <div class="col-md-6">
                    <h1>My Locations</h1>
                </div>
                <div class="col-md-6">
                    <button v-if="showLocationsTable" class="btn btn--green pull-right" v-on:click="addNewLocation">
                        New Location
                    </button>
                </div>
            </div>
        </div>
        <div class="page__content page--bg">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-md-6" v-if="!showLocationsTable">
                        <span class="page__subtext active">{{locations.length}} Locations</span>

                    </div>

                </div>
                <locations-table :locations-data="locations" :tagsData="tags"></locations-table>


            </div>
            <locations-form v-if="showAddLocations" @close="onClose" :tags-data="tags"></locations-form>

        </div>
    </div>

</template>

<script>

    export default {
        props: {
            locationsData: {type: Array},
            tagsData: {type: Array},
            brandsData: {type: Array},
        },
        data() {
            return {
                locations: [],
                tags: [],
                brands: [],
                selectedLocation: {},
                locationsCount: 0,
                showLocationsTable: true,
                showAddLocations: false,
            }
        },
        mounted() {
            this.locations = (this.locationsData) ? this.locationsData : [];
            this.tags = (this.tagsData) ? this.tagsData : [];
            this.brands = (this.brandsData) ? this.brandsData : [];
        },
        methods: {

            addNewLocation(location){
                this.showAddLocations = true;

            },

            onLocationSelected(location){
                this.selectedLocation = location;
                this.showLocationTable = false;
            },
            backToLocations: function () {
                this.selectedLocation = {};
                this.showLocationTable = true;
            },
            // Close the overlay
            onClose: function () {
                this.showAddLocations = false;
            }

        }
    }
</script>