<template>
        <div class="page__content page--bg">

              <div class="row">
                        <div class="col-sm-12">
                            <div id="location-map" style="height:350px"></div>
                        </div>
                    </div>


                <div class="row">
                    <div class="col-md-6">
                        <span class="page__subtext active">{{locations.length}} Locations</span>
                        <p>Legend: <span style="color:#70c1b9"> 
                            <button style="    width: 20px;
    border: 3px solid rgb(255, 255, 255);
    border-radius: 50%;
    background: rgb(112, 193, 185);
    height: 20px;
    margin-bottom: -5px;">&nbsp;</button> Submitted</span> | 
                            <span style="color:#f6d258"><button style="    width: 20px;
    border: 3px solid rgb(255, 255, 255);
    border-radius: 50%;
    background: #f6d258;
    height: 20px;
    margin-bottom: -5px;">&nbsp;</button>Checked Out</span> | 
                            <span style="color:#9291d0"><button style="    width: 20px;
    border: 3px solid rgb(255, 255, 255);
    border-radius: 50%;
    background: #9291d0;
    height: 20px;
    margin-bottom: -5px;">&nbsp;</button>Available</span> | 
                            <span style="color:#CC0000"><button style="    width: 20px;
    border: 3px solid rgb(255, 255, 255);
    border-radius: 50%;
    background: #CC0000;
    height: 20px;
    margin-bottom: -5px;">&nbsp;</button>Alert / Flagged</span></p>

                    </div>

                </div>




            <div class="locations-table">
                <locations-form v-if="showLocationEdit" @close="onClose" :location-data="selectedLocation" :tags-data="tags"
                                :brands-data="brands"></locations-form>

                <table v-if="locations.length > 0" class="table table-hover">
                    <tbody>
                    <tr v-for="location in locations">
                        <td><span
                                class="table__chars" style="cursor:pointer" v-bind:class="getRandomBackground(location.name[0])">{{location.name[0]}}</span><span
                                class="resourcelist__name -slate">{{ location.name }}</span></td>
                        <td width="230px">{{ location.lastUpdated }}</td>
                        <td width="100px">{{ location.submittedTasks }} / {{ location.createdTasks }}</td>

                        <td width="50px"><span class="pull-right edit-dropdown"></span></td>
                    </tr>
                    </tbody>
                </table>
                <p v-else>There are no locations currently</p>

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
                showLocationEdit: false,
                locationsCount: 0,
                showLocationsTable: true,
                showAddLocations: false,

            }
        },
        mounted() {
            this.locations = (this.locationsData) ? this.locationsData : [];
            this.tags = (this.tagsData) ? this.tagsData : [];
            this.brands = (this.brandsData) ? this.brandsData : [];
            console.log(this.locations);
            this.initReportMap();
        },
        methods: {

            // Close the overlay
            onClose: function () {
                this.showAddLocations = false;
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

            showLocationReport: function(id, campaign_id){
                var win = window.open('/reports/location/' + id + '/' + campaign_id, '_blank');
                win.focus();
            },

            initReportMap : function () {

                var mapDiv = document.getElementById('location-map');
                

                map = new google.maps.Map(mapDiv, {
                    center: new google.maps.LatLng(this.locations[0].latitude, this.locations[0].longitude),
                    zoom: 7
                });

                var infowindow = new google.maps.InfoWindow();
                var marker, i;

                var i = 0;
                var t = 0;
                for (i = 0; i < this.locations.length; i++) { 
                    for (t = 0; t < this.locations[i].tasks.length; t++) {
                        if(this.locations[i].tasks[t].flagged == 1){
                             var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';  
                              marker = new google.maps.Marker({
                                position: new google.maps.LatLng(this.locations[i].latitude, this.locations[i].longitude),
                                map: map,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 10,
                                    fillColor: '#CC0000',
                                    fillOpacity : 1,
                                    strokeColor: '#FFFFFF',
                                    strokeWeight:2,

                                }
                              });    
                        }else if(this.locations[i].tasks[t].submitted == 1){
                             var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';  
                              marker = new google.maps.Marker({
                                position: new google.maps.LatLng(this.locations[i].latitude, this.locations[i].longitude),
                                map: map,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 10,
                                    fillColor: '#70c1b9',
                                    fillOpacity : 1,
                                    strokeColor: '#FFFFFF',
                                    strokeWeight:2,

                                }
                              });   
                        }else if(this.locations[i].tasks[t].submitted == 0 && this.locations[i].tasks[t].checked_out_id){
                             var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';  
                              marker = new google.maps.Marker({
                                position: new google.maps.LatLng(this.locations[i].latitude, this.locations[i].longitude),
                                map: map,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 10,
                                    fillColor: '#f6d258',
                                    fillOpacity : 1,
                                    strokeColor: '#FFFFFF',
                                    strokeWeight:2,

                                }
                              });   
                        }else{
                            var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';  
                              marker = new google.maps.Marker({
                                position: new google.maps.LatLng(this.locations[i].latitude, this.locations[i].longitude),
                                map: map,
                                icon: {
                                    path: google.maps.SymbolPath.CIRCLE,
                                    scale: 10,
                                    fillColor: '#9291d0',
                                    fillOpacity : 1,
                                    strokeColor: '#FFFFFF',
                                    strokeWeight:2,

                                }
                              });   
                        }                      

                      }
                }
            }

        }
    }
</script>