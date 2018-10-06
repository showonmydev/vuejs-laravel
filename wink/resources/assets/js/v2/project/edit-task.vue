<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row"> 
                <div class="col-sm-12">
                    <div class="overlay__heading">Edit Project</div>
                </div>
            </div>
            <hr>
            <form id="taskForm" onsubmit="return false;">
                <div class="projects-form">
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="targets">Assign</label>
                            <v-select multiple=1 class="tags" style="width: 100%; margin-bottom: 20px" name="targets[]" id="targets"
                            v-model="targets" :value.sync='targets' :options="options">
                          <!--   <optgroup label="Teams">
                                <option v-for="team in teams" :value="team.id"
                                    :selected="selectedTeams.indexOf(team.id) >= 0 ? 'selected' : ''">
                                    {{team.name}}
                                </option>
                            </optgroup>
                            <optgroup label="Users">
                                <option v-for="user in users" :value="createUserSelectId(user.id)"
                                    :selected="selectedUsers.indexOf(user.id) >= 0 ? 'selected' : ''">
                                    {{user.first_name}} {{user.last_name}}
                                </option>
                            </optgroup> -->
                </v-select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="description">Description</label>
                            <textarea id="description" name="description"
                                      placeholder="Add a description"
                                      v-model="description">{{campaign.description}}</textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="description">Link to Brief</label>
                             <input type="input" class="form-control" id="brief" name="brief"
            v-model="brief">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <label for="daterange">Date range</label>
                            <date-picker v-model="daterange"
                                         range
                                         lang="en"></date-picker>
                        </div>

                    </div>
                    <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <label for="daterange">Board</label>
                             <select class="form-control" placeholder="Select one" name="board_id" v-model="board_id">
                                <option value="" >Select One</option>
                            <option v-for="board in boards" :value="board.id" :selected="board.id == board_id" >{{board.name}}</option>
                        </select>
                        </div>
 
                    </div>
<div class="row">
                      <div class="col-sm-12">
                            <label for="description">Submission Email Alerts</label>
                             <input type="input" class="form-control" id="alert_emails" name="alert_emails"
            v-model="alert_emails" style="margin-bottom: 0px">
            <small>Email addresses to which submission alerts should be sent. Comma seperated list only.</small>
                        </div>
 </div>
                </div>


            </form>
            <hr>


            <button v-on:click="update" class="btn btn--blue btn-block">Update</button>


        </div>

    </div>

</template>

<script>

    import DatePicker from 'vue2-datepicker';
    import moment from 'moment';
    import {createEditor} from 'vueditor';
    import $ from 'jquery';
 
    import vSelect from "vue-select"

    export default {
        props: {
            selectedCampaign: {type: Object},
            locationData: {type: Array},
            tagData: {type: Array},
            teamData: {type: Array},
            userData: {type: Array},
            boardsData: {type: Array}
        },
        data() {
            return {
                showAdvanced: false,
                locations: [],
                tags: [],
                boards: [],
                board_id: 0,
                teams: {},
                users: {},
                daterange: [moment().toISOString(), moment().add(7, 'days').toISOString()],
                description: '',
                frequency: 1,
                showAddQuestions: false,
                showAddLocations: false,
                campaign: [],
                per_location: 1,
                time_to_complete: '',
                one_per_location: '',
                targets: [],
                update_campaign: false,
                launch_campaign: false,
                schedule_campaign: false,
                set_survey: 0,
                selectedUsers: {},
                selectedTeams: {},                
                options: [],
                brief: '',
                alert_emails: ''
            }
        },
        components: {
            DatePicker,
            vSelect
        },
        mounted() {

            this.teams = (this.teamData) ? this.teamData : {};
            this.users = (this.userData) ? this.userData : {};
            this.selectedUsers = [];
            this.selectedTeams = [];


            this.locations = (this.locationData) ? this.locationData : {};
            this.boards = (this.boardsData) ? this.boardsData : {};
            this.tags = (this.tagData) ? this.tagData : {};
            this.campaign = (this.selectedCampaign) ? this.selectedCampaign : {};
            this.per_location = (this.campaign['per_location'] != 0) ? this.campaign['per_location'] : 1;
            this.time_to_complete = (this.campaign['time_to_complete'] > 1) ? this.campaign['time_to_complete'] : 2;
            this.one_per_location = (this.campaign['one_per_location']) ? this.campaign['one_per_location'] : 1;
            this.board_id = (this.campaign['board_id']) ? this.campaign['board_id'] : 0;
            this.targets = [];
            this.options = [];
            this.update_campaign = 'true';
            this.launch_campaign = 'true';
            this.schedule_campaign = 'true';
            this.set_survey = (this.campaign['survey']) ? this.campaign['survey'] : 0;
            this.brief = (this.campaign['brief']) ? this.campaign['brief'] : '';
            this.alert_emails = (this.campaign['alert_emails']) ? this.campaign['alert_emails'] : '';
            this.frequency = (this.campaign['frequency']) ? this.campaign['frequency'] : 1;
            this.description = this.campaign['description'];
            this.daterange = (this.campaign['start_date']) ? [moment(this.campaign['start_date']).toISOString(), moment(this.campaign['end_date']).toISOString()] : [moment().toISOString(), moment().add(7, 'days').toISOString()];
           
            this.setupOptions();    
             this.setupTargets();

            // Setup select 2
            $('select.styled').select2({
                theme: "classic",
                allowClear: true
            });
        },
        methods: {

            close: function () {

                this.$emit('close', this.campaign);
            },

            update: function () {

                if (this.targets.length == 0) {
                    for (var i = 0; i < document.getElementById('targets').selectedOptions.length; i++) {
                        this.targets.push(document.getElementById('targets').selectedOptions[i].value);
                    }
                    if (this.targets.length == 0) {
                        console.log(this.targets);
                        alert("Please select a team or user to assign these tasks to.");
                        return false;
                    }
                }

                axios.post(`/campaigns/launch/update/` + this.selectedCampaign.id, {
                    description: this.description,
                    targets: this.targets,
                    update_campaign: "true",
                    launch_campaign: "true",
                    schedule_campaign: "true",
                    brief: this.brief,
                    alert_emails: this.alert_emails,
                    board_id: this.board_id,
                    start_date: moment(this.daterange[0]).format("YYYY-MM-DD HH:mm:ss"),
                    end_date: moment(this.daterange[1]).format("YYYY-MM-DD HH:mm:ss"),
                })
                .then(response => {
                    // Find the request by id
                    console.log(response);
                    this.$emit('close', response.data.data);
                    location.reload();
                });
            },

          
            setupTargets: function () {
                
                if (this.campaign.teams) {
                    this.campaign.teams.forEach((cteam) => {                      
                        this.targets.push({label: cteam.name, value: cteam.id});
                    });
                }
                if (this.campaign.users) {
                    this.campaign.users.forEach((cuser) => {
                          this.targets.push({label: cuser.first_name + ' ' + cuser.last_name, value: 'user' + cuser.id});
                    });
                }

                
            },

             setupOptions: function () {
                if (this.teams) {
                    this.teams.forEach((team) => {                      
                        this.options.push({label: team.name, value: team.id});
                    });
                }
                if (this.users) {
                    this.users.forEach((user) => {
                          this.options.push({label: user.first_name + ' ' + user.last_name, value: 'user' + user.id});
                    });
                }
            },

            toggleAdvanced: function () {
                this.showAdvanced = !this.showAdvanced;
            },

            showQuestionsInput: function () {
                this.showAddQuestions = true;
            },
            showLocationsInput: function () {
                this.showAddLocations = true;
            },

            createUserSelectId: function (userId) {
                return "user" + userId;
            },

            launch: function () {
                if (this.targets.length == 0) {
                    for (var i = 0; i < document.getElementById('targets').selectedOptions.length; i++) {
                        this.targets.push(document.getElementById('targets').selectedOptions[i].value);
                    }
                    if (this.targets.length == 0) {
                        console.log(this.targets);
                        alert("Please select a team or user to assign these tasks to.");
                        return false;
                    }
                }

                axios.put(`/campaigns/launch/` + this.selectedCampaign.id, {
                    description: this.description,
                    per_location: this.per_location,
                    time_to_complete: this.time_to_complete,
                    one_per_location: this.one_per_location,
                    targets: this.targets,
                    update_campaign: "true",
                    launch_campaign: "true",
                    schedule_campaign: "true",
                    frequency: this.frequency,
                    brief: this.brief,
                    alert_emails: this.alert_emails,
                    survey: this.set_survey,
                    start_date: moment(this.daterange[0]).format("YYYY-MM-DD HH:mm:ss"),
                    end_date: moment(this.daterange[1]).format("YYYY-MM-DD HH:mm:ss"),
                })
                    .then(response => {
                        // Find the request by id
                        this.$emit('close', response.data.data);
                    });
            },

            // on closing a modal
            onClose: function (questions) {
                this.selectedCampaign.questions = questions;
            }

        }
    }
</script>