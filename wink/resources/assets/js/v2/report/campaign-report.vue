<template>

    <div class="page__body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <h1>{{campaign.report_name}}</h1>
                </div>
                <div class="col-md-6">
                    <div v-if="showExport">
                        <button id="reports-header-button" class="btn btn--green pull-right" v-on:click="downloadReport(campaign)">
                            Export Overview
                        </button>
                    </div>
                    <div v-if="showAlerts">
                        <button class="btn btn--green pull-right" v-on:click="addNewAlert(campaign)">
                            Add Alert
                        </button>
                    </div>
                    <div v-if="showApprove">


                        <button class="btn btn--green pull-right" v-on:click="approveTasks">
                            Approve Selected
                        </button>
                        <div>
                            <a href="javascript:;" style="float:right; margin: 8px 50px 8px 20px ;" v-on:click="deleteTasks">
                                <img src="/images/trash.png" />
                            </a>
                            <a href="javascript:;" style="float:right; margin: 8px;" v-on:click="editTasks">
                                <img src="/images/edit.png" />
                            </a>
                            <a href="javascript:;" style="float:right; margin: 8px 20px 8px 20px ;" v-on:click="downloadTask">
                                <img src="/images/view-submissions.png" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>


            <div class="row">

                <ul class="header__nav-section report-nav clearfix" style="margin-top: 30px; padding-left: 15px;">
                    <li>
                        <a v-on:click="showOverviewTable()" href="#" v-bind:class="{ active: showOverview }">Overview</a>
                    </li>
                    <li>
                        <a v-on:click="showLocationsTable()" href="#" v-bind:class="{ active: showLocations }">Locations</a>
                    </li>
                    <li>
                        <a v-on:click="showAlertsTable()" href="#" v-bind:class="{ active: showAlerts }">Alerts</a>
                    </li>
                    <li>
                        <a v-on:click="showDataTable()" href="#" v-bind:class="{ active: showData }">Data</a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="page__content page--bg" style="padding-top: 0px">
            <div class="container-fluid">
                <report-overview v-if="showOverview" :campaignData="campaign" :campaignDetailData="campaignDetail" :locationsData="locations"
                    :overviewData="overviewData"></report-overview>
                <report-locations v-if="showLocations" :campaignData="campaign" :campaignDetailData="campaignDetail" :locationsData="locations"></report-locations>
                <report-alerts v-if="showAlerts" :campaignData="campaign" :campaignDetailData="campaignDetail" :alertData="alerts" :rulesData="rules"></report-alerts>
                <report-data v-if="showData" :campaignData="campaign" :questionData="questionData" ref="reportData"></report-data>
            </div>
        </div>
        <alerts-form v-if="showAddAlerts" :campaignData="campaign" :campaignDetailData="campaignDetail" @close="onClose"></alerts-form>

    </div>


</template>

<script>
    export default {
        props: {
            locationsData: {
                type: Array
            },
            alertData: {
                type: Array
            },
            rulesData: {
                type: Array
            },
            brandsData: {
                type: Array
            },
            overviewData: {
                type: Object
            },
            campaignData: {
                type: Object
            },
            campaignDetailData: {
                type: Array
            },
            theLocationData: {
                type: Array
            }
        },
        data() {
            return {
                locations: [],
                alerts: [],
                rules: [],
                overview: [],
                campaign: {},
                questionData: {},
                campaignDetail: null,
                showOverview: true,
                showLocations: false,
                showAlerts: false,
                showExport: true,
                showApprove: false,
                showData: false,
                showAddAlerts: false,
                theLocation: false
            }
        },
        mounted() {
            
            this.campaign = (this.campaignData) ? this.campaignData : [];
            this.campaignDetail = (this.campaignDetailData) ? this.campaignDetailData : [];
            this.updateNav();
            this.getQuestionData(this.campaignDetail);
            this.locations = (this.locationsData) ? this.locationsData : [];
            this.theLocation = (this.theLocationData) ? this.theLocationData : false;
            this.brands = (this.brandsData) ? this.brandsData : [];
            this.overview = (this.overviewData) ? this.overviewData : [];
            this.rules = (this.rulesData) ? this.rulesData : [];
            this.alerts = (this.alertData) ? this.alertData : [];
            
            
        },
        methods: {

            approveTasks: function () {
                this.$refs.reportData.approveSelected();
            },

            editTasks: function () {
                this.$refs.reportData.openEditTasks();
            },

            downloadTask: function () {
               this.$refs.reportData.downloadTasks();
            },

            deleteTasks: function () {
                this.$refs.reportData.openDeleteTasks();
            },


            hideAll: function () {
                this.showOverview = false;
                this.showLocations = false;
                this.showAlerts = false;
                this.showData = false;
            },

            addNewAlert(location) {
                this.showAddAlerts = true;

            },

            showOverviewTable: function () {
                this.hideAll();
                this.showOverview = true;
                this.showAlerts = false;
                this.showExport = true;
                this.showApprove = false;
            },

            showLocationsTable: function () {
                this.hideAll();
                this.showLocations = true;
                this.showAlerts = false;
                this.showExport = true;
                this.showApprove = false;
            },

            showAlertsTable: function () {
                this.hideAll();
                this.showAlerts = true;
                this.showAlerts = true;
                this.showExport = false;
                this.showApprove = false;
            },

            showDataTable: function () {
                this.hideAll();
                this.showData = true;
                this.showAlerts = false;
                this.showExport = false;
                this.showApprove = true;
            },

            updateNav: function () {
                // $('.header__wrap .header__nav-section').html(
                //     '<li><a href="/"><span class="ion-reply icon--medium"></span> &nbsp; &nbsp;  Back to Projects</a></li>'
                // );
            },

            downloadReport: function (campaign) {
                var url = `/campaigns/` + campaign.id + `/report`;
                window.location = url;

            },

            getQuestionData() {

                if (this.locations.length == 1) {
                    let url = '/campaigns/' + this.campaign.id + '/location-data/' + this.locations[0].id;
                    axios.get(url)
                        .then(response => {
                            // Find the request by id
                            this.questionData = response.data;
                        });
                } else {
                    let url = '/campaigns/' + this.campaign.id + '/report-data';
                    axios.get(url)
                        .then(response => {
                            // Find the request by id
                            this.questionData = response.data;
                        });
                }

            },

            // Close the overlay
            onClose: function () {
                this.showAddAlerts = false;
            }
        }
    }
</script>