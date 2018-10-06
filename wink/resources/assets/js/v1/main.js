import Vue from 'resources/assets/js/v1/vue';
Vue.use(require('vue-resource'));

import WinkMap from './components/WinkMap';
import WinkCampaignResults from './components/WinkCampaignResults';
import WinkCampaignStats from './components/WinkCampaignStats';
import WinkPanelLoadLocations from './components/WinkPanelLoadLocations';
import WinkPanelDefault from './components/WinkPanelDefault';

import WinkLocationsFilter from './components/WinkLocationsFilter';

var vm = new Vue({
    el: '#app',

    data: {
        currentView: 'WinkPanelDefault',
        panelopen: false
    },

    ready(){
        $(function() {
            $('.report-mini').matchHeight();
        });
    },

    components: { 
        WinkMap, 
        WinkCampaignResults, 
        WinkCampaignStats,
        WinkPanelLoadLocations, 
        WinkPanelDefault,
        WinkLocationsFilter
    },
    
    methods: {
        openpanel: function (component) {
            this.currentView = component;
            this.panelopen = true;
        },
        closepanel: function(){
            this.panelopen = false;
        }
    }
});