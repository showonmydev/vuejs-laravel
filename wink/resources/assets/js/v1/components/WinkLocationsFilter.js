import Vue from '../vue';
Vue.use(require('vue-resource'));

export default Vue.extend({

    props: ['campaign_id', 'survey', 'brands', 'tags', 'locations', 'selected_locations'],

    template: '',

    data: () => {
        return {
            currentBrandDisplay: '',
            currentTagDisplay: '',
            originalBrands: [],
            originalTags: [],
            currentBrand: null,
            currentTag: null,
            filteredLocations: [],
            selectedLocations: [],
            unknown: false
        }
    },

    ready(){
        this.originalBrands = this.brands;
        this.originalTags = this.tags;
        this.filteredLocations = this.locations;
        this.unknown = this.survey;
        this.updateSelectedLocations();
    },

    methods: {

        // Set the list of selected locations to remove the
        // additional details from the server return
        updateSelectedLocations (){

            for (let entry of this.selected_locations){
                this.selectedLocations.push(entry.location);
            }

        },

        // If a brand is selected
        brandSelected (brand, ev) {
            $(ev.target).siblings().removeClass('active');
            $(ev.target).addClass('active');
            this.currentBrand = (brand === null) ? null : brand.name;
            this.filterAvailableLocations();
        },

        // If a tag is selected
        tagSelected (tag, ev) {
            $(ev.target).siblings().removeClass('active');
            $(ev.target).addClass('active');
            this.currentTag = (tag === null) ? null : tag.name;
            this.filterAvailableLocations();
        },

        // Filter the list of available locations
        // based on the brands and tags
        filterAvailableLocations (){

            this.filteredLocations = this.locations.filter(location => {

                // If the brand is not empty and is present in the location.brands
                let brand_ok = false;
                if(location.brands){
                    for (let brand of location.brands){
                        if (brand.name == this.currentBrand){
                            brand_ok = true;
                        }
                    }
                    if(this.currentBrand == null || this.currentBrand == ''){brand_ok = true;}
                }

                // AND if the tag is not empty and is present in the location.tags
                let tag_ok = false;
                if(location.tags){
                    for (let tag of location.tags){
                        if(tag.name == this.currentTag){
                            tag_ok = true;
                        }
                    }
                    if(this.currentTag == null || this.currentTag == ''){tag_ok = true;}
                }

                return (brand_ok && tag_ok) ? true : false ;

            });

        },

        // If an available location is selected
        availableSelected (location){

            this.locations.$remove(location);
            this.selectedLocations.push(location);
            this.saveLocations();
            this.filterAvailableLocations();

        },

        // If a current location is selected
        currentSelected (location){

            this.selectedLocations.$remove(location);
            this.locations.push(location);
            this.saveLocations();
            this.filterAvailableLocations();

        },

        // Save the locations to the server
        saveLocations () {

            // Get an array of all the location ID's in this.selected
            let selectedLocationsArray = this.selectedLocations.map( (location) => {
                if(location){
                    return location.id;
                }
            });

            let data = {
                locations_array : JSON.stringify(selectedLocationsArray),
                locations_unknown: false,
                _token : $('#locationForm [name="_token"]').val()
            };

            this.$http.post("/locations/campaign/"+this.campaign_id, data).then((response) => {
                $('.selected-locations').parent().notify("Locations Saved", "info");
            }, (response) => {
                // error callback
                $('.selected-locations').parent().notify("Locations Error", "info");
            });

        },

    },

    watch: {
        'unknown': function(val, oldVal){

            console.log('Click');

            let selectedLocationsArray = this.selectedLocations.map( (location) => {
                if(location){
                    return location.id;
                }
            });

            // If the values of the unknown checkbox is true then send tru
            // otherwise send false
            let data = {
                locations_array : JSON.stringify(selectedLocationsArray),
                locations_unknown: (val) ? val : false,
                _token : $('#locationForm [name="_token"]').val()
            };
            this.$http.post("/locations/campaign/"+this.campaign_id, data).then((response) => {
//                $('#unknown').notify("Locations Saved", "info");
            }, (response) => {
                // error callback
                $('#unknown').notify("Locations Error", "info");
            });

        }
    }

})