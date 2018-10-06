<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row">
                <div class="col-sm-12">
                    <div class="overlay__heading">Add a task to your project</div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <div class="overlay__sub-heading">Design a questionnaire & assign to your teams to complete</div>
                </div>
            </div>
            <hr>
            <form id="taskForm" onsubmit="return false;">
                <div class="projects-form">
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="targets">Assign</label>
                            <v-select multiple class="tags" style="width: 100%; margin-bottom: 20px" name="targets[]" id="targets"
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
                             <input type="brief" class="form-control" id="brief" name="brief"
            v-model="brief">
                        </div>
                    </div>
         <div class="row">
                        <div class="col-sm-12 col-md-12">
                            <label for="board_id">Board</label>
                             <select class="form-control" placeholder="Select one" name="board_id" id="board_id"
                v-model="board_id">
                                <option value="" disabled>Select One</option>
                            <option v-for="board in boards" :value="board.id" :selected="board.id == campaign.board_id" >{{board.name}}</option>
                        </select>
                        </div>

                    </div>
        <div class="row">
            <div class="col-sm-12 col-md-8">
                <label for="daterange">Date range</label>
                <date-picker v-model="daterange"
                range
                lang="en"
                width="300"
                ></date-picker>
            </div>
            <div class="col-sm-12 col-md-4">
                <label for="frequency">Frequency</label>
                <select class="form-control" name="frequency" id="frequency"
                v-model="frequency">
                <option value="1" :selected="campaign.frequency == 1 ? 'selected' : ''">Once Off
                </option>
                <option value="2" :selected="campaign.frequency == 2 ? 'selected' : ''">Weekly
                </option>
                <option value="3" :selected="campaign.frequency == 3 ? 'selected' : ''">Monthly
                </option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <label>
                <span v-if="!campaign.questions" v-on:click="showQuestionsInput"><img src="images/task.svg"> Add questions</span>
                <span v-else v-on:click="showQuestionsInput"><img src="images/task.svg"> Edit questions</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="!campaign.location_ids && set_survey == 0" v-on:click="showLocationsInput"><img                src="images/location-green.svg" /> Add locations</span>
                <span v-on:click="showLocationsInput" v-if="set_survey == 0 && campaign.location_ids">
                    <img src="images/location-green.svg" /> Edit locations</span>
                </label>
            </div>
            <div class="col-sm-12 col-md-4">
                <span v-on:click="toggleAdvanced" v-bind:class="{ active: showAdvanced }"
                class="pull-right projects-advanced">Advanced </span>
            </div>
        </div>
    </div>

    <transition name="slide-fade">
        <div class="project-advanced-wrap" v-if="showAdvanced">
            <hr>
            <div class="row">
                <div class="col-sm-12">
                    <label for="time">Time to complete</label>
                    <select class="form-control" id="time" name="time_to_complete"
                    v-model="time_to_complete">
                    <option value="2"
                    :selected="campaign.time_to_complete == 2 || campaign.time_to_complete == 1 ? 'selected' : ''">
                    2 Hours
                </option>
                <option value="5" :selected="campaign.time_to_complete == 5 ? 'selected' : ''">5
                    Hours
                </option>
                <option value="12" :selected="campaign.time_to_complete == 12 ? 'selected' : ''">12
                    Hours
                </option>
                <option value="24" :selected="campaign.time_to_complete == 24 ? 'selected' : ''">1
                    Day
                </option>
                <option value="72" :selected="campaign.time_to_complete == 72 ? 'selected' : ''">3
                    Days
                </option>
                <option value="120" :selected="campaign.time_to_complete == 120 ? 'selected' : ''">5
                    Days
                </option>
                <option value="168" :selected="campaign.time_to_complete == 168 ? 'selected' : ''">1
                    Week
                </option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-12 col-md-4">
            <label for="per_location">Tasks per location</label>
            <input type="number" class="form-control" id="per_location" name="per_location"
            value="" v-model="per_location" v-on:keyup="calculateRewards">
        </div>
        <div class="col-sm-12 col-md-4">
            <label for="one_per_location">Task Per User</label>
            <select class="form-control" name="one_per_location" id="one_per_location"
            v-model="one_per_location">
            <option value="1" :selected="campaign.one_per_location === 1 ? 'selected' : ''">1 per Location
            </option>
            <option value="0" :selected="campaign.one_per_location === 0 ? 'selected' : ''">No Limit
            </option>

        </select>
    </div>
    <div class="col-sm-12 col-md-4">
        <label for="set_survey">Survey?</label>
        <select class="form-control" name="set_survey" id="set_survey" v-model="set_survey" v-on:change="calculateRewards">
            <option value="0" :selected="campaign.survey == 0 ? 'selected' : ''">No</option>
            <option value="1" :selected="campaign.survey == 1 ? 'selected' : ''">Yes</option>
        </select>
    </div>

    <div class="col-sm-12 col-md-12" v-if="campaign.company.rewards == 1">
        <label for="per_location">Reward per task <span class="pull-right" style="font-size: 12px; color: #8492a6; font-weight:normal">Balance R{{campaign.company.balance}}</span></label>
        <input type="number" class="form-control" placeholder="enter amount in zar" id="reward_per_task" name="reward_per_task"
        value="" v-model="reward_per_task" v-on:keyup="calculateRewards">

        <span v-html="rewardTotalHtml" class="pull-right reward-total"></span>
    </div>

                        <div class="col-sm-12">
                            <label for="description">Submission Email Alerts</label>
                             <input type="input" class="form-control" id="alert_emails" name="alert_emails"
            v-model="alert_emails" style="margin-bottom: 0px">
            <small>Email addresses to which submission alerts should be sent. Comma seperated list only.</small>
                        </div>
                

</div>
</div>
</transition>
</form>
<hr>


<button v-on:click="launch" class="btn btn--blue btn-block">Launch task</button>


</div>

<add-questions v-if="showAddQuestions" :selectedCampaign="selectedCampaign" @close="onClose"
@back="onBack"></add-questions>
<add-locations v-if="showAddLocations" :selectedCampaignData="selectedCampaign" :locationData="locations"
:tagData="tags" @close="onClose"
@back="onBack"></add-locations>
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
                teams: {},
                users: {},
                daterange: [moment().toISOString(), moment().add(7, 'days').toISOString()],
                description: '',
                frequency: 1,
                showAddQuestions: false,
                showAddLocations: false,
                campaign: [],
                rewardTotal: '',
                rewardTotalHtml: '',
                per_location: 1,
                time_to_complete: '',
                one_per_location: '',
                reward_per_task: 0,
                targets: [],
                update_campaign: false,
                launch_campaign: false,
                schedule_campaign: false,
                set_survey: 0,
                selectedUsers: {},
                selectedTeams: {},
                board_id: 0,
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

            this.boards = (this.boardsData) ? this.boardsData : {};
            this.locations = (this.locationData) ? this.locationData : {};
            this.tags = (this.tagData) ? this.tagData : {};
            this.campaign = (this.selectedCampaign) ? this.selectedCampaign : {};

            this.per_location = (this.campaign['per_location'] != 0) ? this.campaign['per_location'] : 1;
            this.time_to_complete = (this.campaign['time_to_complete'] > 1) ? this.campaign['time_to_complete'] : 2;
            this.one_per_location = (this.campaign['one_per_location']) ? this.campaign['one_per_location'] : 1;
            this.targets = [];
            this.options = [];
            this.update_campaign = 'true';
            this.reward_per_task = (this.campaign['reward_value']) ? this.campaign['reward_value'] : 0;
            this.brief = (this.campaign['brief']) ? this.campaign['brief'] : '';
            this.alert_emails = (this.campaign['alert_emails']) ? this.campaign['alert_emails'] : '';
            this.launch_campaign = 'true';
            this.schedule_campaign = 'true';
            this.set_survey = (this.campaign['survey']) ? this.campaign['survey'] : 0;
            this.board_id = (this.campaign['board_id']) ? this.campaign['board_id'] : 0;
            this.frequency = (this.campaign['frequency']) ? this.campaign['frequency'] : 1;
            this.description = this.campaign['description'];
            this.daterange = (this.campaign['start_date']) ? [moment(this.campaign['start_date']).toISOString(), moment(this.campaign['end_date']).toISOString()] : [moment().toISOString(), moment().add(7, 'days').toISOString()];

            
            this.setupOptions();    
             this.setupTargets();

             console.log(this.campaign);
        },
        methods: {

            close: function () {

                 
                axios.put(`/campaigns/launch/` + this.selectedCampaign.id, {
                    description: this.description,
                    per_location: this.per_location,
                    time_to_complete: this.time_to_complete,
                    one_per_location: this.one_per_location,
                    board_id: this.board_id,
                    targets: this.targets,
                    update_campaign: "true",
                    launch_campaign: "false",
                    schedule_campaign: "false",
                    brief: this.brief,
                    alert_emails: this.alert_emails,
                    reward_value: this.reward_per_task,
                    frequency: this.frequency,
                    survey: this.set_survey,
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

            update: function () {

                axios.put(`/campaigns/launch/` + this.selectedCampaign.id, {
                    description: this.description,
                    per_location: this.per_location,
                    time_to_complete: this.time_to_complete,
                    one_per_location: this.one_per_location,
                    board_id: this.board_id,
                    targets: this.targets,
                    update_campaign: "true",
                    launch_campaign: "false",
                    schedule_campaign: "false",
                    brief: this.brief,
                    alert_emails: this.alert_emails,
                   reward_value: this.reward_per_task,
                    frequency: this.frequency,
                    survey: this.set_survey,
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

                if(this.targets.length == 0) {
                        console.log(this.targets);
                        alert("Please select a team or user to assign these tasks to.");
                        return false;
                }

                axios.put(`/campaigns/launch/` + this.selectedCampaign.id, {
                    description: this.description,
                    per_location: this.per_location,
                    time_to_complete: this.time_to_complete,
                    one_per_location: this.one_per_location,
                    board_id: this.board_id,
                    targets: this.targets,
                    update_campaign: "true",
                    launch_campaign: "true",
                    schedule_campaign: "true",
                    brief: this.brief,
                    alert_emails: this.alert_emails,
                    frequency: this.frequency,
                    reward_value: this.reward_per_task,
                    survey: this.set_survey,
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

            calculateRewards: function (){

                this.rewardTotal = '';
                this.rewardTotalHtml = '';

                if(this.reward_per_task > 0){

                    if(this.set_survey == 1){
                        this.rewardTotalHtml = 'Total = R' + (this.reward_per_task * this.per_location) + ' (' +  this.per_location + ' tasks x R' + this.reward_per_task + ')';

                        this.rewardTotal = this.reward_per_task * this.per_location;
                    }else{

                        this.rewardTotalHtml = 'Total = R' + (this.reward_per_task * (this.per_location * this.campaign.location_ids.length)) + ' (' +  (this.per_location * this.campaign.location_ids.length) + ' tasks x R' + this.reward_per_task + ')';
                        this.rewardTotal = this.reward_per_task * (this.per_location * this.campaign.location_ids.length);

                    }
                }

            },

            // on closing a modal
            onClose: function (questions) {
                this.showAddQuestions = false;
                this.showAddLocations = false;
                this.selectedCampaign.questions = questions;

            },
            onBack: function () {
                this.showAddQuestions = false;
            }

        }
    }
</script>