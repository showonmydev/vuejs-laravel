<template>

    <div class="dashboard page__body">

        <div class="container-fluid page__header">
            <div class="row">
                <div class="col-md-6">
                    <h1 v-on:mouseover="activeNewBoard = !activeNewBoard">My Projects

                        <span class="boards-add only-admin" v-on:click="showNewBoard(); "> + Board</span>
                    </h1>
                     <div class="manager-icons" style="display:none">
                        <div class="boards-table__row"  v-for="board in boards">
                            <span style="display:none" class="table__chars" v-bind:class="getRandomBackground(user.user.first_name[0])" v-for="user in board.managers">
                                {{user.user.first_name[0]}} {{user.user.last_name[0]}}
                            </span> 
                            <span class="table__chars plus-sign" v-on:click="showAddManager = !showAddManager" >
                                +
                            </span> 
                        </div>
                        <div v-if="showAddManager" style="margin: 20px 0px 0px">

                           <select multiple="1" class="styled" style="width: 100%;" name="newManagers[]" id="newManagers"
                           v-model="newManagers">
                           <option v-for="user in users" :value="user.id">
                               {{user.first_name}} {{user.last_name}}
                           </option>
                       </select>

                       <button v-on:click="addManagers()" class="btn btn--green only-admin">
                                Add Member
                       </button>                     


                   </div>

                </div>
            </div>
                <div class="col-md-6">
                    <button v-on:click="showNewProject()" class="btn btn--green pull-right only-admin">
                        New Project
                    </button>
                </div>
            </div>
        </div>



        <div class="page__content page--bg">
            <div class="container-fluid">
             <div v-if="shouldShowNewProject" class="campaigns-table new">
                <div class="campaigns-table__row">
                    <div class="campaigns-table__row-status"></div>
                    <div class="campaigns-table__row-title"><input :ref="'newProjectTitle'" v-model="newProjectTitle"
                     v-on:keydown="newProjectInput"
                     class="campaigns-table__row-title-input"
                     type="text"
                     placeholder="Give your project a name"></div>
                     <div class="campaigns-table__row-status-full" style="min-width: 30%;">                                    
                        <select :ref="'newProjectBoard'" v-model="newProjectBoard" class="form-control" style="margin: 0px;  border: none; box-shadow: none; padding-left: 0px" placeholder="Select one"  @change="newProjectSave()">
                            <option v-for="board in boards" :value="board.id" >{{board.name}}</option>
                        </select>

                    </div> 
                    <div v-html="errorHtml"></div>
                    <div class="pull-right">
                        <div class="campaigns-table__row-tasks" v-on:click="newProjectSave()"><img
                            src="images/task.svg"></div>


                            <ul class="header__nav-user clearfix">
                                <li class="dropdown">
                                    <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                    aria-haspopup="false" aria-expanded="false"><span
                                    class="caret"></span>
                                </a>                                            
                            </li>
                        </ul>
                    </div>


                </div>
            </div>


            <div class="boards-table">

             <div v-if="shouldShowNewBoard" style="margin: 20px 0px 0px">


               <h2><span v-on:click="goToBoard(board.id)"><input :ref="'newBoardTitle'" v-model="newBoardTitle"
                 v-on:keydown="newBoardInput"
                 class="campaigns-table__row-title-input"
                 type="text"
                 placeholder="New Board" style="border: none; background: none; box-shadow: none; font-size: 16px; width: 150px"></span> <span class="boards-add only-admin"> + Project</span></h2>
                 <div class="board-add-project">
                    Add a new project to this board
                </div>



            </div>

            <div v-for="board in boards" class="boards-table__row">
                <h2 style="cursor: pointer"><span v-on:click="goToBoard(board.id)">{{board.name}}</span> <span class="boards-add only-admin"  v-on:click="showNewProject(board.id) "> + Project</span></h2>

                <div v-if="current == board.id" class="campaigns-table new" style="margin-bottom: -3px">
                    <div class="campaigns-table__row">
                        <div class="campaigns-table__row-status"></div>
                        <div class="campaigns-table__row-title"><input :ref="'newProjectTitle'" v-model="newProjectTitle"
                         v-on:keydown="newProjectInput"
                         class="campaigns-table__row-title-input"
                         type="text"
                         placeholder="Give your project a name"></div>
                         <div class="campaigns-table__row-status-full" style="min-width: 30%;">                                    

                            <input type="hidden" name="newProjectBoard"v-model="newProjectBoard" :value="board.id" />
                            

                        </div>
                        <div v-html="errorHtml"></div>
                        <div class="pull-right">
                            <div class="campaigns-table__row-tasks" v-on:click="newProjectSave()"><img
                                src="images/task.svg"></div>


                                <ul class="header__nav-user clearfix">
                                    <li class="dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                        aria-haspopup="false" aria-expanded="false"><span
                                        class="caret"></span>
                                    </a>                                            
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>

                <div v-if="board.campaigns.length < 1 && current != board.id" class="board-add-project" v-on:click="newProjectSave()">
                    Add a new project to this board
                </div>

                <div v-else class="campaigns-table">

                    <div v-for="campaign in board.campaigns" class="campaigns-table__row">
                        <div class="campaigns-table__row-status-active" v-if="campaign.submitted" v-bind:class="getStatus(campaign)"></div>
                        <div class="campaigns-table__row-status" v-else v-bind:class="getStatus(campaign)"></div>
                        <div v-on:click="selectCampaign(campaign)" class="campaigns-table__row-title">
                            {{campaign.report_name}}
                        </div>
                        <div class="campaigns-table__row-status-full"  v-if="campaign.submitted">{{showCampaignStatus(campaign)}}</div>
                        <div class="campaigns-table__row-status-full"  v-else>Draft</div>
                        <div class="pull-right">
                            <div v-if="campaign.submitted" class="campaigns-table__row-completion">
                                <div class="tasksCompletedBar">
                                    <div class="tasksCompletedBar-inner"
                                    v-bind:style="{ width: getCompletedWidth(campaign.submittedTasks, campaign.createdTasks)}"></div>
                                </div>
                                {{campaign.submittedTasks}}/{{campaign.createdTasks}}
                            </div>

                            <div class="campaigns-table__row-tasks" v-else="campaign.submitted == 0" v-on:click="selectCampaign(campaign)"><img
                                src="images/task.svg"></div>


                                <ul class="header__nav-user clearfix">
                                    <li class="dropdown">
                                        <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                        aria-haspopup="true" aria-expanded="false"><span
                                        class="caret"></span>
                                    </a>
                                    <ul class="dropdown-menu">
                                        <li class=" only-admin">

                                            <a href="#" v-on:click="editCampaign(campaign)">Edit</a>


                                        </li>
                                        <li v-if="campaign.submitted">

                                            <a v-bind:href="'/reports/campaign/' + campaign.id">View Report</a>

                                        </li>  
                                        <li v-if="campaign.submitted">

                                            <a href="#" v-on:click="downloadReport(campaign)">Download Report</a>

                                        </li>
                                        <li>

                                            <a href="#" v-on:click="archiveProject(campaign)">Archive</a>

                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

<add-task v-if="showAddTasks" :selectedCampaign="selectedCampaign" :locationData="locations" :tagData="tags"
:teamData="teams" :userData="users"  :boardsData="boards"
@close="onClose"></add-task>

<edit-task v-if="showEditTasks" :selectedCampaign="selectedCampaign" :locationData="locations" :tagData="tags"
:teamData="teams" :userData="users"  :boardsData="boards"
@close="onClose"></edit-task>


<campaign-report v-if="showReport" :selectedCampaignReportData="selectedCampaignReport"
:locationData="locations" :tagData="tags" :teamData="teams" :userData="users"
@close="onClose"></campaign-report>

</div>

</template>

<script>

export default {
    props: {
        campaignsData: {type: Array},
        locationData: {type: Array},
        tagData: {type: Array},
        teamData: {type: Array},
        userData: {type: Array},
        boardsData: {type: Array}
    },
    data() {
        return {
            selectedCampaign: null,
            selectedBoard: null,
            errorHtml: null,
            campaigns: [],
            boards: [],
            boardsCampaigns: [],
            campaign: [],
            shouldShowNewProject: false,
            newProjectTitle: null,
            newProjectBoard: null,
            showAddTasks: false,
            showEditTasks: false,
            showReport: false,
            newBoardTitle: null,
            shouldShowNewBoard: false,
            activeNewBoard: false,
            locations: {},
            tags: {},
            teams: [],
            users: [],
            current: 0,
            newManagers: [],
            showAddManager: false
        }
    },
    mounted() {
        this.campaigns = this.campaignsData;
        this.locations = (this.locationData) ? this.locationData : {};
        this.tags = (this.tagData) ? this.tagData : {};
        this.teams = (this.teamData) ? this.teamData : {};
        this.users = (this.userData) ? this.userData : {};
        this.boards = (this.boardsData) ? this.boardsData : {};

        console.log(this.boards);
    },
    methods: {


        showNewProject: function (id = null) {

            if(id == null){
                this.shouldShowNewProject = !this.shouldShowNewProject;
            }else{
                this.$nextTick(() => {
                    this.selectedBoard = id;
                    this.newProjectBoard = id;
                    this.current = id;

                });
            }

        },

        goToBoard: function (id){
            window.location = '/boards/' + id;
        },

        showNewBoard: function () {
            this.shouldShowNewBoard = !this.shouldShowNewBoard;

            this.$nextTick(() => {
                this.$refs.newBoardTitle.focus();
            });
        },
        newProjectInput: function (event) {

                // if enter is pressed submit the new campaign name
                if (event.keyCode === 13) {
                    // submit the app
                    this.newProjectSave();

                }
            },

            newProjectSave: function (){
               this.errorHtml = null;
               if(this.newProjectBoard != null && this.newProjectBoard != 0 && this.newProjectTitle != ''){          


                axios.post(`/campaigns`, {'task_name': this.newProjectTitle, 'board_id': this.newProjectBoard})
                .then(response => {
                    location.reload();
                });

            }else{

                alert("Error saving new campaign. Please ensure you have entered a campaign name and selected a board.");

            }
        },

        newBoardInput: function (event) {
                // if enter is pressed submit the new campaign name
                if (event.keyCode === 13) {
                    // submit the app
                    axios.post(`/boards`, {'name': this.newBoardTitle})
                    .then(response => {
                        this.shouldShowNewBoard = false;
                        this.newBoardTitle = null;
                        this.boards.unshift(response.data.data);
                    });
                }
            },

            // Launch action after selection campaign depending on campaign status
            selectCampaign: function (campaign) {
                if (!campaign.submitted) {
                    this.selectedCampaign = campaign;
                    this.launchAddTasksModal();
                } else{
                    window.location = '/reports/campaign/' + campaign.id;
                }
            },

            // Launch edit modal for selected campaign
            editCampaign: function (campaign) {
                this.selectedCampaign = campaign;
                if (!campaign.submitted) {
                    this.launchAddTasksModal();
                } else {
                    this.launchEditTasksModal();
                }
            },

            archiveProject: function (campaign){
                 axios.get(`/campaigns/`+campaign.id+`/archive`)
                    .then(response => {
                        location.reload();
                    });
            },

            // Get the status of the campaign
            getStatus: function () {

            },

            getDaysRemaining: function (date){
                var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date();
                var secondDate = new Date(date);

                if(firstDate.getTime() <= secondDate.getTime()){
                    var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                }else{
                    var diffDays = 0
                }
                return diffDays;
                
            },

            addManagers: function (){
                axios.post(`/company/` + this.company.id + '/manager/add', {'newManagers': this.newManagers})
                    .then(response => {
                        this.showAddManager = false;
                        this.newManagers = [];
                        this.boards[0].managers = response.data.data;
                    });
            },

            showCampaignStatus: function (campaign){

               var monthNames = [
               "Jan", "Feb", "Mar",
               "Apr", "May", "Jun", "Jul",
               "Aug", "Sep", "Oct",
               "Nov", "Dec"
               ];


               var diff_days  = this.getDaysRemaining(campaign.end_date);
               var start_date = new Date(campaign.start_date);
               var end_date = new Date(campaign.end_date);
               var cur_date = new Date();

               var status = 'Draft';

               if(campaign.submitted){
                if(start_date.getTime() < cur_date.getTime() && end_date.getTime() > cur_date.getTime()){

                    var day = end_date.getDate();
                    var monthIndex = end_date.getMonth();

                    status =  'Due ' + day + ' ' + monthNames[monthIndex];

                }

                if (end_date.getTime() < cur_date.getTime()){

                    status = 'Past due';

                }

                if (start_date.getTime() > cur_date.getTime()) {

                    status = 'Pending Launch';
                }

            }

            return status;
        },

            // Launch the add users modal
            launchAddUsersModal: function () {
                alert('launchAddUsersModal');
            },

            // Launch the add questions modal
            launchAddTasksModal: function () {
                this.showAddTasks = true;
            },

            // Launch the add questions modal
            launchAddTasksModal: function () {
                this.showAddTasks = true;
            },

            // Launch the edit questions modal
            launchEditTasksModal: function () {
                this.showEditTasks = true;
            },

            // return the width of the completed line in %
            getCompletedWidth: function (submitted, created) {
                return Math.floor(( submitted / created) * 100) + "%";
            },

            // on closing a modal
            onClose: function () {
                this.showAddTasks = false;
                this.showEditTasks = false;
            },

            // on closing a modal
            close: function () {
                this.showAddTasks = false;
                this.showEditTasks = false;
            },

            // Download campaign report
            downloadReport: function (campaign) {
                var url = `/campaigns/` + campaign.id + `/report`;
                window.location = url;

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