<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row">
                <div class="col-sm-12">
                    <div class="overlay__heading">Add a new Location</div>
                    <div class="overlay__sub-heading">If you have mulitple locations, try the <a href="#">bulk
                        upload.</a></div>
                </div>
            </div>
            <hr>

            <div class="projects-form">
                <form id="locationForm">
                    <input id="street_number" class="" required="" name="street_number" type="hidden"
                           :value="location.name">
                    <input id="route" class="" required="" name="street" type="hidden" :value="location.street">
                    <input id="sublocality_level_2" class="" required="" name="suburb" type="hidden"
                           :value="location.suburb">
                    <input id="locality" class="" required="" name="city" type="hidden" :value="location.city">
                    <input id="postal_code" class="" required="" name="postal_code" type="hidden"
                           :value="location.postal_code">
                    <input id="administrative_area_level_1" class="" required="" name="province" type="hidden"
                           :value="location.province">
                    <input id="country" class="" required="" name="country" type="hidden" :value="location.country">

                    <div class="row">
                        <div class="col-sm-12">
                            <div id="location-map"></div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <label for="name">Name</label>
                            <input class="form-control pad" placeholder="Name" required="" onfocus="geolocate()"
                                   name="name"
                                   type="text" id="name" :value="location.name">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <label for="autocomplete">Address</label>
                            <input id="autocomplete" class="form-control pad" placeholder="Address" required=""
                                      name="address" autocomplete="off" :value="location.address" />
                        </div>
                    </div>

                    <div class="row">

                        <div class="form-group col-sm-6">
                            <label for="latitude" class="control-label">Latitude</label>
                            <input class="form-control pad" placeholder="Latitude" name="latitude" type="text"
                                   id="latitude" :value="location.latitude">
                        </div>
                        <div class="form-group col-sm-6">
                            <label for="longitude" class="control-label">Longitude</label>
                            <input class="form-control pad" placeholder="Longitude" name="longitude" type="text"
                                   id="longitude" :value="location.longitude">
                        </div>

                    </div>

                    <!--<div class="row">
                        <div class="col-sm-12">
                            <label for="brands" class="control-label campaign__form-label">Brands <span>You can make multiple selections</span></label>

                            <select id="brands" multiple="1" class="styled brands" style="width: 100%;" name="brands[]">
                                <optgroup label="Brands">

                                    <option v-for="brand in brands" :value="brand.id">{{brand.name}}</option>

                                </optgroup>
                            </select>
                        </div>
                    </div>
                    <div class="row">

                        <div class="col-sm-12">
                        <span v-on:click="toggleAdvanced" v-bind:class="{ active: showAdvanced }"
                              class="pull-right projects-advanced">Add tag </span>
                        </div>
                    </div>-->
                    <transition name="slide-fade">
                        <div class="row">
                            <div class="col-sm-12">
                                <label for="tags" class="control-label form-label">Tags <span>You can make multiple selections</span></label>

                                <select id="tags" multiple="multiple" class="styled tags" style="width: 100%;" name="tags[]">


                                    <option v-for="tag in tags" :value="tag.id" :selected="checkTagSelected(tag.id)">{{tag.name}}</option>


                                </select>
                            </div>
                        </div>
                    </transition>

                </form>
            </div>


            <hr>
            <button class="btn btn--blue btn-block" v-on:click="saveLocation">Save Location</button>
        </div>
    </div>

</template>

<script>

    import $ from 'jquery';
    import 'select2';

    export default {
        props: {
            tagsData: {type: Array},
            brandsData: {type: Array},
            locationData: {type: Object},
        },
        data() {
            return {
                showAdvanced: true,
                tags: [],
                brands: [],
                location: {},
                formData: {}
            }
        },
        mounted() {
            this.tags = (this.tagsData) ? this.tagsData : [];
            this.brands = (this.brandsData) ? this.brandsData : [];
            this.location = (this.locationData) ? this.locationData : {};
            //checkExistingGPS();
            initAutocomplete();
            console.log(this.location);
            if(this.location.latitude) {
                console.log(this.location.latitude);
                initMap(this.location.latitude, this.location.longitude, 12);
            }else{
                initMap(-33.92557, 18.417367, 10)
            }

            // Setup select 2
            $('select.styled').select2({
                theme: "classic",
                allowClear: true,
                tags: true
            });
        },

        watch: {},

        methods: {

            close: function () {
                this.$emit('close');
            },
            toggleAdvanced: function () {
                this.showAdvanced = !this.showAdvanced;
            },

            saveLocation: function () {
                let formData = new FormData(document.getElementById('locationForm'));
                console.log(formData);
                if (!this.location.id) {
                    var url = `/locations/create`;
                } else {
                    var url = `/locations/update/` + this.location.id;
                }
                axios.post(url, formData)
                    .then(response => {
                        // Find the request by id
                        console.log(response.data);
                        location.reload()
                    });
            },

            checkTagSelected: function(id){

                var output = false;
            console.log(this.location);
                if(this.location.tags){
                 this.location.tags.forEach((tag) => {                      
                        if (tag.id === id) { 
                      // or if (Object.prototype.hasOwnProperty.call(obj,prop)) for safety...
                        output =  true;
                      }
                });   
                    }

                return output;
            } 

        }
    };


</script>