<template>
    <div class="page__content page--bg">
        <div class="row">
            <div class="col-md-6">
                <span class="page__subtext active">{{alerts.length}} Alerts</span>

            </div>

        </div>

        <table v-if="alerts.length > 0" class="table table-hover">
            <tbody>
            <tr v-for="alert in alerts">
                <td width="300px"><span
                        class="table__chars" v-bind:class="getRandomBackground(alert.title[0])">{{alert.title[0]}}</span><span
                        class="resourcelist__name -slate">{{ alert.title }}</span></td>
                <td>{{alert.name}}</td>

                <td width="150px">{{alert.created_at}}</td>
                <td width="50px"><span class="pull-right edit-dropdown"></span></td>
            </tr>
            </tbody>
        </table>
        <p v-else style="margin-top: 30px">There are no alerts currently</p>


    </div>
</template>

<script>

    export default {
        props: {
            alertData: {type: Array},
            rulesData: {type: Array},
            campaignData: {type: Object},
        },
        data() {
            return {
                alerts: [],
                rules: [],
                campaign: {},
                selectedAlert: {},
                showAltersTable: true,
                showAddAlerts: false,

            }
        },
        mounted() {
            this.alerts = (this.alertData) ? this.alertData : [];
            this.rules = (this.rulesData) ? this.rulesData : [];
            this.campaign = (this.campaignData) ? this.campaignData : [];
            console.log(this.alerts);
        },
        methods: {


            onAlertSelected(location) {
                this.selectedAlert = location;
                this.showAlertsTable = false;
            },

            backToAlerts: function () {
                this.selectedAlert = {};
                this.showAlertsTable = true;
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

            }

        }
    }
</script>