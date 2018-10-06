<template>

    <div class="overlay" style="background: #fafafa">
        <div class="overlay__close" v-on:click="close" style="left:10vw; top: 10vh">
           <span class="ion-reply icon--medium" style="margin: -5px 15px 0px 0px;"></span> Save & Return
        </div>
        <div class="overlay__content" style="width: 80vw; max-width: 1000px;">
            <form id="taskForm" class="campaign-builder" onsubmit="return false;">
                <div class="row">
                    <div class="col-sm-4">
                         <div class="col-md-12"><div class="title">NEW PROJECT</div></div>

                        <div class="col-md-12">
                            <input type="input" id="report_name" v-on:blur="updateCampaign" name="report_name" v-model="report_name" class="form-control" placeholder="Give your project a name over here…" style="text-align:left; width:100%; font-size: 16px; font-weight: bold">
                        </div>
                        <div class="col-sm-12">                           
                            <date-picker v-model="daterange"
                            range
                            lang="en"
                            width="300"
                            ></date-picker>
                        </div>

                        <div class="col-sm-12">
                            <v-select multiple class="tags" style="width: 100%; margin-bottom: 20px" name="targets[]" id="targets"
                            v-model="targets" :value.sync='targets' :options="options">                                     
                            </v-select>
                        </div>

                        <div class="col-sm-12">
                            <textarea id="description" name="description"
                            placeholder="Add a description"
                            v-model="description">{{campaign.description}}</textarea>
                        </div>
                        <div class="col-sm-12"><div style="margin: 10px 0px 20px" v-on:click="showLocationsInput">Geo Locations <span v-if="set_survey == 0">({{campaign.location_ids.length}})</span><span v-else><small>(survey)</small></span><span class="pull-right add-link" v-on:click="turnSureyOff">Edit</span></div></div>
                        <div class="col-sm-12">
                            <div>Advanced  
                                <span v-on:click="toggleAdvanced" v-bind:class="{ active: showAdvanced }"  class="projects-advanced pull-right">&nbsp; </span>
                            </div>
                        </div>
                        <div class="col-sm-12">
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
                                        <div class="col-sm-12">
                                            <label for="description">Link to Brief</label>
                                             <input type="brief" class="form-control" id="brief" name="brief"            v-model="brief" placeholder="Insert external link">
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 col-md-12">
                                            <label for="board_id">Board</label>
                                             <select class="form-control" placeholder="Select one" name="board_id" id="board_id"                    v-model="board_id">
                                                    <option value="" disabled>Select One</option>
                                                <option v-for="board in boardsListData" :value="board.id" :selected="campaign.board_id == board.id ? 'selected' : ''">{{board.name}}</option>
                                            </select>
                                        </div>

                                    </div>
                                    
                                <div class="row">
                                    <div class="col-sm-12 col-md-12">
                                        <label for="frequency">Frequency</label>
                                        <select class="form-control" name="frequency" id="frequency"                                v-model="frequency">
                                            <option value="1" :selected="campaign.frequency == 1 ? 'selected' : ''">Once Off
                                            </option>
                                            <option value="2" :selected="campaign.frequency == 2 ? 'selected' : ''">Weekly
                                            </option>
                                            <option value="3" :selected="campaign.frequency == 3 ? 'selected' : ''">Monthly
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-sm-12 col-md-12">
                                        <label for="per_location">Tasks per location</label>
                                        <input type="number" class="form-control" id="per_location" name="per_location"
                                        value="" v-model="per_location" v-on:keyup="calculateRewards" style="width: 40px">
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-12">
                                        <label for="one_per_location">Task Per User</label>
                                        <select class="form-control" name="one_per_location" id="one_per_location"
                                            v-model="one_per_location">
                                            <option value="1" :selected="campaign.one_per_location === 1 ? 'selected' : ''">1 per Location
                                            </option>
                                            <option value="0" :selected="campaign.one_per_location === 0 ? 'selected' : ''">No Limit
                                            </option>

                                        </select>
                                    </div>
                                    <div class="col-sm-12 col-md-12">
                                        <label for="set_survey">Survey?</label>
                                        <select class="form-control" name="set_survey" id="set_survey" v-model="set_survey" v-on:change="calculateRewards">
                                            <option value="1" :selected="campaign.survey == 1 ? 'selected' : ''">Yes</option>
                                            <option value="0" :selected="campaign.survey == 0 ? 'selected' : ''">No</option>
                                            
                                        </select>
                                    </div>

                                    <div class="col-sm-12 col-md-12"  v-if="company.rewards == 1">
                                        <label for="per_location">Reward per task </label>
                                        <input type="number" class="form-control" placeholder="enter amount in zar" id="reward_per_task" name="reward_per_task"
                                        value="" v-model="reward_per_task" v-on:keyup="calculateRewards">
                                        <span class="pull-left" style="font-size: 12px; color: #8492a6; font-weight:normal">Balance R{{company.balance}}</span>

                                        <span v-html="rewardTotalHtml" class="pull-right reward-total"></span>
                                    </div>                                    
                                    <div class="col-sm-12">
                                        <label for="description"  style="margin-top: 20px; width:100%">Submission Email Alerts</label>
                                        <input type="input" class="form-control" id="alert_emails" name="alert_emails" v-model="alert_emails"  placeholder="Insert email list" style="margin-bottom: 0px; width:100%; text-align:left">
                                        <small  style="margin-top: 15px; float:left">Email addresses to which submission alerts should be sent. Comma seperated list only.</small>
                                    </div> 
                                </div>
                            </div>
                            </transition>

                            
                        </div>
                        <div class="col-sm-12"><button v-on:click="launch" class="btn btn--blue btn-block">Launch task</button></div>
                    </div>
                    <div class="col-sm-8" style="background: rgb(255, 255, 255); min-height: 65vh">
                        <div style="padding: 15px">
                            <add-questions v-if="!showAddLocations" :selectedCampaign="selectedCampaign" :campaignData="campaign" @close="onQuestionClose" @back="onBack"></add-questions>
                            <add-locations v-if="showAddLocations" :selectedCampaign="selectedCampaign" :campaignData="campaign" :locationData="locations" :tagData="tags" @close="onLocationClose" @update="onUpdateLocation" @back="onBack"></add-locations>
                        </div>
                    </div>
                </div>
            </form>
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
            companyData: {type: Object},
            tagData: {type: Array},
            teamData: {type: Array},
            userData: {type: Array},            
            boardsData: {type: Array},
            boardsListData: {type: Array}
        },
        data() {
            return {
                showAdvanced: false,
                locations: [],
                location_ids: [],
                tags: [],
                boards: [],
                teams: {},
                users: {},
                report_name: '',
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
                set_survey: 1,
                selectedUsers: {},
                selectedTeams: {},
                board_id: 0,
                options: [],
                brief: '',
                alert_emails: '',
                company: '',
                questions: []
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
            this.targets = [];
            this.options = [];
            this.company = (this.companyData) ? this.companyData : {};
            this.boards = (this.boardsData) ? this.boardsData : {};
            this.locations = (this.locationData) ? this.locationData : {};
            this.tags = (this.tagData) ? this.tagData : {};
            this.campaign = (this.selectedCampaign) ? this.selectedCampaign : this.emptyCampaign();
            this.report_name = (this.campaign['report_name']) ? this.campaign['report_name'] : "";
            this.per_location = (this.campaign['per_location'] != 0) ? this.campaign['per_location'] : 1;
            this.time_to_complete = (this.campaign['time_to_complete'] > 1) ? this.campaign['time_to_complete'] : 2;
            this.one_per_location = (this.campaign['one_per_location']) ? this.campaign['one_per_location'] : 1;
            this.reward_per_task = (this.campaign['reward_value']) ? this.campaign['reward_value'] : 0;
            this.brief = (this.campaign['brief']) ? this.campaign['brief'] : '';
            this.alert_emails = (this.campaign['alert_emails']) ? this.campaign['alert_emails'] : '';
            this.set_survey = (this.campaign['survey'] == 0) ? this.campaign['survey'] : 1;
            this.frequency = (this.campaign['frequency']) ? this.campaign['frequency'] : 1;
            this.description = this.campaign['description'];
            this.daterange = (this.campaign['start_date']) ? [moment(this.campaign['start_date']).toISOString(), moment(this.campaign['end_date']).toISOString()] : [moment().toISOString(), moment().add(7, 'days').toISOString()];
            this.board_id = (this.campaign['board_id']) ? this.campaign['board_id'] : this.boards[0].id;
            this.launch_campaign = 'true';
            this.schedule_campaign = 'true';
            this.update_campaign = 'true';

            console.log("TheCampaign:");
            console.log(this.selectedCampaign);
            this.setupOptions();    
            this.setupTargets();
            this.calculateRewards();

        },
        methods: {           

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

            emptyCampaign: function (){
                var output = {                   
                        alert_emails: null,
                        archived: 0,
                        benchmark_score: 0,
                        board_id: this.board_id,
                        brand_id: null,
                        brief: '',
                        company:  this.companyData,
                        company_id: this.companyData.id,
                        complete: 0,
                        createdTasks: 0,
                        creator_id: 0,
                        deleted_at: 0,
                        description: '',
                        end_date: null,
                        frequency: 1,
                        hash: null,
                        id: null,
                        location_ids:[],
                        max_questionnaire_score: null,
                        one_per_location: 0,
                        per_location: 0,
                        questions: [],
                        report_name: '',
                        reward_value: 0,
                        sort_order: null,
                        start_date: null,
                        submitted: null,
                        submittedTasks: null,
                        survey: 1,
                        task_name: null,
                        teams: [],
                        time_to_complete: null,
                        users: []
                    }

                return output;
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
                if(this.campaign.id){
                    this.updateCampaign();
                }
                this.showAddQuestions = true;
                this.showAddLocations = false;
                
            },
            showLocationsInput: function () {
                if(this.campaign.id){
                    this.updateCampaign();
                }
                
                this.showAddLocations = !this.showAddLocations;
                this.showAddQuestions = !this.showAddQuestions;
                
            },

            createUserSelectId: function (userId) {
                return "user" + userId;
            },

            close: function () {

                if(!this.report_name || this.report_name == ''){
                    alert("Please enter a Name for this project in order to save.");
                    return false;
                }

                // if(!this.daterange[0] || this.daterange[0] == "Invalid date" || !this.daterange[1] || this.daterange[1] == "Invalid date"){
                //     alert("Please select a date range.");
                //     return false;
                // }

                if(this.campaign.id){
                    this.$nextTick(() => {
                        this.updateCampaign(true);
                        this.$emit('campaignClose', this.campaign);
                    });
                }else{
                    alert("Saving campaign data. Please wait 5 seconds and try again.");
                }
                
            },

            updateCampaign: function(close){

                if(this.campaign.id){
                    var url = "/campaigns/launch/update/" + this.campaign.id;
                }else{
                    var url = "/campaigns"
                }

                axios.post(url, {
                    task_name: this.report_name,
                    report_name: this.report_name,
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
                    if(response.status == 200){
                        console.log(response);

                        if(!this.campaign.id){
 
                                this.campaign.id = response.data.data.id;               
                                this.campaign.alert_emails = this.alert_emails;
                                this.campaign.board_id = this.board_id;
                                this.campaign.brief = this.brief;
                                this.campaign.description = this.description;
                                this.campaign.end_date = moment(this.daterange[1]).format("YYYY-MM-DD HH:mm:ss");
                                this.campaign.frequency = this.frequency;
                                this.campaign.one_per_location = this.one_per_location;
                                this.campaign.per_location = this.per_location;
                                this.campaign.report_name = this.report_name;
                                this.campaign.reward_value = this.reward_per_task;
                                this.campaign.start_date = moment(this.daterange[0]).format("YYYY-MM-DD HH:mm:ss");
                                this.campaign.survey = this.set_survey;
                                this.campaign.task_name  = this.report_name;
                                this.campaign.time_to_complete = this.time_to_complete;
                            

                            console.log(this.campaign);
                        }
                    }else{
                        alert("Error saving Campaign.");
                    }
                    

                })
                .catch(response => {
                    alert("Error saving campaign.");
                });
            },

            launch: function () {


                if(!this.report_name || this.report_name == ''){
                    alert("Please enter a Name for this project in order to save.");
                    return false;
                }

                if(!this.daterange[0] || this.daterange[0] == "Invalid date" || !this.daterange[1] || this.daterange[1] == "Invalid date"){
                    alert("Please select a date range.");
                    return false;
                }

                if(this.targets.length == 0) {
                        console.log(this.targets);
                        alert("Please select a team or user to assign these tasks to.");
                        return false;
                }

                axios.put(`/campaigns/launch/` + this.campaign.id, {
                    task_name: this.report_name,
                    report_name: this.report_name,
                    description: this.description,
                    per_location: this.per_location,
                    time_to_complete: this.time_to_complete,
                    one_per_location: this.one_per_location,
                    board_id: (this.board_id != "" ? this.board_id : this.boards[0].id),
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
                        this.$emit('addCampaign', response.data.data);
                        
                    })
                .catch(response => {
                    alert("Error launching campaign.");
                });;
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

            turnSureyOff: function (){
                this.set_survey = 0;
                if(this.campaign.id){
                    this.updateCampaign();
                }
                // this.updateCampaign();
            },

            // on closing a modal
            onClose: function (questions) {
                this.showAddLocations = false;

            },
            // on closing a modal
            onLocationClose: function (locations) {
                this.showAddLocations = false;
                this.campaign.location_ids = locations;
                console.log(locations);

            },
            onUpdateLocation: function (locations){
                this.campaign.location_ids = locations;
                console.log(locations);
            },
            // on closing a modal
            onQuestionClose: function (questions) {               
                this.campaign.questions = questions;
                console.log(questions);
            },
            onBack: function () {
                this.showAddQuestions = false;

            }

        }
    }
</script>