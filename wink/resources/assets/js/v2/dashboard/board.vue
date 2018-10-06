<template>

<div v-bind:class="[showCampaignBuilder ? 'overlaid' : '']">
    <div class="loading-overlay" v-if="showLoader"><img src="/images/loading-big.gif" /></div>
    <div class="board-menu" v-if="showBoardList">
        <div class="boards-list" id="boards-list">
            <h3>
                Boards <span v-on:click="toggleNewBoard()" class="admin-button">+</span>
            </h3>
            <ul>    
                <li v-if="newBoardShow"><input type="text" :ref="newBoardTitle"  v-model="newBoardTitle"
                       v-on:keydown="newBoardInput" placeholder="New Board Name" style="margin: 20px;  padding: 5px; width: 240px"></li>   
                <li v-for="board in boardsList">
                    <a v-on:click="switchBoard(board.id)" v-bind:class="[board.id == boards[0].id ? 'current' : '']" >{{ board.name }} <span>{{board.campaigns_count}}</span></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="board-body" id="board-body">
        <div class="dashboard page__body">

            <div class="container-fluid page__header" style="width:100%; max-width:100%; padding: 20px">
                <div class="row">
                    <div class="col-md-6">
                        <h1 v-for="board in boards" style="font-size: 20px">{{board.name}}
                        </h1> 
                        <div class="manager-icons">
                            <div v-for="board in boards" class="boards-table__row">
                                <span class="table__chars" v-bind:class="getRandomBackground(user.user.first_name[0])" v-for="user in board.managers">
                                    {{user.user.first_name[0]}} {{user.user.last_name[0]}}
                                </span> 
                                <span class="table__chars plus-sign admin-button" v-on:click="showAddManager = !showAddManager" style="padding: 9px 0px">+</span>
                                <span v-on:click="switchBoard(board.id, true)"><img src="/images/ellipse.png" style="cursor:pointer"/></span>
                            </div>
                            <div v-if="showAddManager" style="margin: 20px 0px 0px">

                               <select multiple="1" class="styled" style="width: 100%;" name="newManagers[]" id="newManagers"
                               v-model="newManagers">
                               <option v-for="user in users" :value="user.id">
                                   {{user.first_name}} {{user.last_name}}
                               </option>
                           </select>

                           <button v-on:click="addManagers()" class="btn btn--green">
                                    Add Member 
                           </button>                     
                       </div>
                   </div>

               </div>
               <div class="col-md-6">
                <button v-for="board in boards" v-on:click="newCampaign(board.id)" id="" class="admin-button btn btn--green pull-right">
                    New Project
                </button>
            </div> 
        </div>
    </div>

    <div class="page__content page--bg" style="padding-top: 0px">
        <div class="container-fluid" style="width:100%; max-width:100%; padding: 0px 20px 20px">
            <div class="boards-table">
                <div v-for="board in boards" v-if="board.campaigns.length < 1" style="text-align:center; margin: 100px auto; width: 250px; float:none">
                    <h3>This board is empty</h3>
                    <p>Click + New project create a new task and start collecting data from teams</p>
                </div>
                <div v-for="board in boards" class="boards-table__row">
                    <div class="row">
                        <div v-for="campaign in board.campaigns" class="col-md-3">
                            <div class="campaign-card">
                                <div class="col-sm-12">
                                    <div class="title">
                                        <div v-on:click="selectCampaign(campaign)" >{{campaign.report_name}}</div>                               
                                
                                        <ul class="header__nav-user clearfix">
                                            <li class="dropdown">
                                                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                                aria-haspopup="true" aria-expanded="false">
                                                        <span class="menu-icon"></span>
                                                </a>
                                                <ul class="dropdown-menu">
                                                    <li  class="admin-button">
                                                        <a href="#" v-on:click="editCampaign(campaign)">Edit</a>
                                                    </li>
                                                    <li v-if="campaign.submitted">
                                                        <a v-bind:href="'/reports/campaign/' + campaign.id">View Report</a>
                                                    </li>  
                                                    <li v-if="campaign.submitted">
                                                        <a href="#" v-on:click="downloadReport(campaign)">Download Report</a>
                                                    </li>
                                                    <li  class="admin-button">
                                                        <a href="#" v-on:click="archiveProject(campaign)">Archive</a>
                                                    </li>
                                                    <li  class="admin-button">
                                                        <a href="#" v-on:click="duplicateProject(campaign.id)">Duplicate</a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-sm-12">
                                        <div class="team-list">&nbsp;</div>
                                </div>
                                <div class="col-sm-6">
                                        <div class="subs">{{campaign.submittedTasks}}/{{campaign.createdTasks}}</div>
                                </div>
                                <div class="col-sm-6">
                                        
                                        <div class="status"  v-if="campaign.submitted">{{showCampaignStatus(campaign)}}</div>
                                        <div class="status"  v-else>Draft</div>
                                    
                                </div>
                                <div class="col-sm-12">
                                    <div class="row-completion">
                                        <div class="tasksCompletedBar">
                                                <div class="tasksCompletedBar-inner"
                                                v-bind:style="{ width: getCompletedWidth(campaign.submittedTasks, campaign.createdTasks)}"></div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    <campaign-builder v-if="showCampaignBuilder" :selectedCampaign="selectedCampaign" :locationData="locations" :tagData="tags"
    :teamData="teams" :userData="users" :boardsData="boards" :companyData="company" :boardsListData="boardsListData"
    @close="onClose" @campaignClose="addCampaignClose"  @addCampaign="addCampaignClose"></campaign-builder>

    <edit-task v-if="showEditTasks" :selectedCampaign="selectedCampaign" :boardsListData="boardsListData" :locationData="locations" :tagData="tags"
:teamData="teams" :userData="users"   :boardsData="boards"
@close="onClose"></edit-task>
</div>
</template>

<script>

    export default {
        props: {
            campaignsData: {type: Array},
            companyData: {type: Object},
            locationData: {type: Array},
            tagData: {type: Array},
            teamData: {type: Array},
            userData: {type: Array},
            boardsData: {type: Array},
            boardsListData: {type: Array}
        },
        data() {
            return {
                selectedCampaign: null,
                selectedBoard: null,
                errorHtml: null,
                campaigns: [],
                company:[],
                newManagers: [],
                boards: [],
                boardsList: [],
                boardsCampaigns: [],
                campaign: [],
                newBoardTitle: null,
                showAddTasks: false,
                showEditTasks: false,
                showReport: false,
                shouldShowNewBoard: false,
                showAddManager: false,
                showCampaignBuilder: false,
                locations: {},
                newBoardShow: false,
                tags: {},
                teams: [],
                users: [],
                showLoader: false,
                showBoardList: true,
                showArchived: false,
            }
        },
        mounted() {
            this.campaigns = this.campaignsData;
            this.locations = (this.locationData) ? this.locationData : {};
            this.tags = (this.tagData) ? this.tagData : {};
            this.teams = (this.teamData) ? this.teamData : {};
            this.users = (this.userData) ? this.userData : {};
            this.boards = (this.boardsData) ? this.boardsData : {};
            this.boardsList = (this.boardsListData) ? this.boardsListData : {};
            this.newProjectBoard = this.boards;
            this.current = this.boards[0];
            this.company = (this.companyData) ? this.companyData : {};

            this.getUsers();    
            console.log(this.company);

        },
        methods: {

            getUsers: function (){
                axios.get(`/users`)
                    .then(response => {
                        this.users = response.data.users;
                    });
            },

            toggleNewBoard: function (){
                this.newBoardShow = !this.newBoardShow;
            },
            
            archiveProject: function (campaign){
                 axios.get(`/campaigns/` + campaign.id + `/archive`)
                    .then(response => { 
                        this.boards[0].campaigns = response.data.data;
                    });
            },

            showCampaignStatus: function (campaign){

             var monthNames = [
             "01", "02", "03",
             "04", "05", "06", "07",
             "08", "09", "10",
             "11", "12"
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
                    var year = (end_date.getYear()) - 100;

                    status =  day+"/"+monthNames[monthIndex]+"/"+year;

                }

                if (end_date.getTime() < cur_date.getTime()){

                    status = 'Past due';

                }

                if (start_date.getTime() > cur_date.getTime()) {

                    status = 'Pending';
                }

            }

            return status;
        },

        switchBoard: function(id, archive = false){
            this.showLoader = true;
            this.errorHtml = null;    
            this.boards = {};
            this.newProjectBoard = {};
            this.current = {}; 
            
            let archive_url = "";

                if(archive && !this.showArchived){
                    this.showArchived = !this.showArchived;
                    archive_url = "?archived=1";
                }else{
                    this.showArchived = !this.showArchived;
                }
 
                axios.get(`/boards/` + id + archive_url)
                .then(response => {

                    this.boards = response.data.boards;
                    this.newProjectBoard = response.data.boards;
                    this.current = response.data.boards;
                    
                });

            this.$nextTick(() => {
                this.showLoader = false;
            });



        },

        newProjectSave: function () {
            this.errorHtml = null;
            if(this.newProjectBoard != null && this.newProjectBoard != 0) {

                axios.post(`/campaigns`, {'task_name': this.newProjectTitle, 'board_id': this.newProjectBoard[0].id})
                .then(response => {
                    location.reload();
                });

            }else{
                this.errorHtml = 'Please select a Board';
            }
        },

        newBoardInput: function (event) {
            // if enter is pressed submit the new campaign name
            if (event.keyCode === 13) {
                // submit the app
                axios.post(`/boards`, {'name': this.newBoardTitle})
                .then(response => {
                    this.newBoardShow = false;
                    this.newBoardTitle = null;

                    this.boards = response.data.boards;
                    this.newProjectBoard = response.data.boards;
                    this.current = response.data.boards;
                    this.boardsList = response.data.boards_list;

                });
            }
        },

        duplicateProject: function (id) {
           
                // Send campaign id through for duplication
                axios.post(`/campaign/duplicate/` + id, {})
                .then(response => {
                     axios.get(`/boards/` + this.boards[0].id)
                        .then(response => {
                            this.boards = response.data.boards;
                        });
                });
            
        },

        // Launch action after selection campaign depending on campaign status
        selectCampaign: function (campaign) {
            if (!campaign.submitted) {
                this.selectedCampaign = campaign;
                this.launchCampaignBuilder();
            } else{
                window.location = '/reports/campaign/' + campaign.id;
            } 
        },

        // Launch edit modal for selected campaign
        editCampaign: function (campaign) {

                this.selectedCampaign = campaign;
                if (!campaign.submitted) {
                    this.launchCampaignBuilder();
                } else {
                    this.launchEditTasksModal();
                }
        },

        addManagers: function (){
            axios.post(`/board/` + this.boards[0].id + '/manager/add', {'newManagers': this.newManagers})
                .then(response => {
                    this.showAddManager = false;
                    this.newManagers = [];
                    this.boards[0].managers = response.data.data;
                });
        },

        getDaysRemaining: function (date){
            var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date();
            var secondDate = new Date(date);

            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

            return diffDays;
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

        // Launch the add users modal
        launchAddUsersModal: function () {
            alert('launchAddUsersModal');
        },

        // Launch the campaign builder
        launchCampaignBuilder: function (board_id) {
            this.showCampaignBuilder = true;
        },

        // Launch new campaign
        newCampaign: function (board_id){
            this.selectedCampaign = {};                   
            this.selectedCampaign.alert_emails =  null;
            this.selectedCampaign.archived = 0;
            this.selectedCampaign.benchmark_score = 0;
            this.selectedCampaign.board_id = this.boards[0].id;
            this.selectedCampaign.brand_id = null;
            this.selectedCampaign.brief = '';
            this.selectedCampaign.company =  this.companyData;
            this.selectedCampaign.company_id = this.companyData.id;
            this.selectedCampaign.complete = 0;
            this.selectedCampaign.createdTasks = 0;
            this.selectedCampaign.creator_id = 0;
            this.selectedCampaign.deleted_at = 0;
            this.selectedCampaign.description = '';
            this.selectedCampaign.end_date = null;
            this.selectedCampaign.frequency = 1;
            this.selectedCampaign.hash = null;
            this.selectedCampaign.id = null;
            this.selectedCampaign.location_ids =[];
            this.selectedCampaign.max_questionnaire_score = null;
            this.selectedCampaign.one_per_location = 0;
            this.selectedCampaign.per_location = 0;
            this.selectedCampaign.questions = [];
            this.selectedCampaign.report_name = '';
            this.selectedCampaign.reward_value = 0;
            this.selectedCampaign.sort_order = null;
            this.selectedCampaign.start_date = null;
            this.selectedCampaign.submitted = null;
            this.selectedCampaign.submittedTasks = null;
            this.selectedCampaign.survey = 1;
            this.selectedCampaign.task_name = null;
            this.selectedCampaign.teams = [];
            this.selectedCampaign.time_to_complete = null;
            this.selectedCampaign.users = []
                    
            this.showCampaignBuilder = true;
        },

        // return the width of the completed line in %
        getCompletedWidth: function (submitted, created) {
            return Math.floor(( submitted / created) * 100) + "%";
        },

        // on closing a modal
        onClose: function () {
            this.showAddTasks = false;
            this.showEditTasks = false;
            this.showCampaignBuilder = false;
        },

        // on closing a modal
        close: function () {
            this.showAddTasks = false;
            this.showEditTasks = false;
            this.showCampaignBuilder = false;

            axios.get(`/boards/` + this.boards[0].id)
                .then(response => {

                    this.boards = response.data.boards;
                    this.newProjectBoard = response.data.boards;
                    this.current = response.data.boards;

                    
                });


        },

        campaignClose: function (campaign) {
            this.showAddTasks = false;
            this.showEditTasks = false;
            this.showCampaignBuilder = false;
            this.boards[0].campaigns.push(campaign);

        },

        addCampaignClose: function (campaign) {

            axios.get(`/boards/` + campaign.board_id)
            .then(response => {

                this.boards = response.data.boards;

                this.showAddTasks = false;
                this.showEditTasks = false;
                this.showCampaignBuilder = false;
            });

            

        },

                    // Launch the edit questions modal
            launchEditTasksModal: function () {
                this.showEditTasks = true;
            },

        // Download campaign report
        downloadReport: function (campaign) {
            var url = `/campaigns/` + campaign.id + `/report`;
            window.location = url;

        },

        outputBoardUrl: function (board){
            return "/boards/" + board.id;
        },

        toggleMenu: function (){
            this.showBoardList = !this.showBoardList;
        } 

    }
}
</script>