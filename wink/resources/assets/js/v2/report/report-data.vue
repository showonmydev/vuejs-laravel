<template>

    <div class="page__content page--bg"
    style="position:relative; display:block;  overflow-x:scroll;  white-space: nowrap;">

    <table v-if="questions.data" class="table table-hover submissions-table">
        <thead>
            <tr>
                <th width="40px">
                    <div v-on:click="toggleAll()" class="overlay__list-item-add-small" style="margin-left: 10px">
                        <img v-if="isAllSelected()" src="/images/checkmark.svg" alt="Checkmark"/>
                    </div>
                </th>
                <th v-for="heading in questions.data.headings">
                    {{ heading }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="submission in questions.data.data">

                <td>
                    <div v-on:click="toggleSubmission(submission.task_id, submission.approved )"
                    class="overlay__list-item-add-small">
                    <img v-if="submission.approved == 1" src="/images/approved.png" height="27px" alt="Checkmark">
                    <img v-if="isSelected(submission.task_id) && submission.approved != 1"
                    src="/images/checkmark.svg" alt="Checkmark">
                </div>
                
            </td>
            <td width="300px" style="cursor: pointer" v-on:click="editSubmission(submission.task_id);"><span class="table__chars" 
                v-bind:class="getRandomBackground(submission.location[0])">{{submission.location[0]}}</span>
                <span class="resourcelist__name -slate">{{submission.location}}</span>
            </td>
            <td><div v-on:click="toggleSubmissionReview(submission.task_id, submission.flagged )">
                    <span v-if="submission.flagged == 1" class="report-star--full" height="27px" width="27px" alt="Checkmark"></span>
                    <span v-else class="report-star--empty" height="27px" width="27px" alt="Checkmark"></span>
                    
                </div></td>
            <td>{{submission.user}}</td>
            <td>{{submission.answer_created_at}}</td>
            <td>{{submission.total_score}}</td> 

            <td v-for="ans in submission.questions">

                <div v-if="ans.type == 6" v-html="ans.answer" v-on:click="showImageModal(ans.src)"></div>   
                <div v-else v-html="ans.answer"></div>

            </td>

        </tr>
    </tbody>
</table>
<p v-else>No data available for this campaign</p>

<delete-tasks v-if="showDelete" :selectedSubmissionsData="selectedSubmissions"
@close="onDeleteClose"></delete-tasks>

<edit-tasks v-if="showEdit" :selectedSubmissionsData="selectedSubmissions"
@close="onEditClose"></edit-tasks>
</div> 

</template>

<script>

    export default {
        props: {
            campaignData: {type: Object},
            questionData: {type: Object}
        },
        data() {
            return {
                questions: [],
                campaign: [],
                selectedSubmissions: [],
                showDelete: false,
                showEdit: false
            }
        },
        mounted() {

            this.campaign = (this.campaignData) ? this.campaignData : [];
            this.questions = (this.questionData) ? this.questionData : [];

            console.log(this.questions);

        },
        methods: {

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

            toggleSubmission: function (id, approved) {

                let index = this.selectedSubmissions.indexOf(id);

                if (approved == 0) {
                    if (index > -1) {
                        this.selectedSubmissions.splice(index, 1);
                    } else {
                        this.selectedSubmissions.push(id);
                    }
                }

            },

            toggleSubmissionReview: function (id, approved) {

                let url = '/task/flag/' + id;

                 axios.post(url, {})
                    .then(response => {
                            // Find the request by id
                            if (response.status == 200) {
                                this.questions.data.data[id].flagged = response.data.data
                            } 

                    });

            },

            // Toggle selection of all available submissions
            toggleAll: function () {

                if (this.selectedSubmissions.length != this.questions.data.data.length) {
                    this.selectedSubmissions = [];
                    this.questions.data.data.forEach(function (current_value, index, initial_array) {
                        if (current_value.approved != 1) {
                            this.selectedSubmissions.push(current_value.task_id);
                        }

                    }, this);
                } else {
                    this.selectedSubmissions = [];
                }


            },
            // Check if all submissions are currently selected
            isAllSelected: function () {
                if (this.selectedSubmissions.length == this.questions.data.data.length) {
                    return true;
                }

                return false;
            },

            // Open submission delete model for selected submissions
            openDeleteTasks: function () {
                let tasks = this.selectedSubmissions;
                if (tasks.length > 0) {
                    this.showDelete = true;
                } else {
                    alert("Please select a submission to delete.");
                }


            },

            // Open submission edit model for selected submission
            openEditTasks: function () {
                let tasks = this.selectedSubmissions;
                if (tasks.length > 0) {
                    this.showEdit = true;
                } else {
                    alert("Please select at least one submission to edit.");
                }


            },

             // Open submission edit model for selected submission
            downloadTasks: function () {
                if (this.selectedSubmissions.length > 0) {            

                    this.questions.data.data.forEach(function (current_value) {
                        console.log(current_value);
                        if (this.selectedSubmissions.indexOf(current_value.task_id) > -1) {
                            window.location = "/reports/single/" + current_value.task_hash;
                        }

                    }, this);

                } else {
                    alert("Please select at least one submission to download.");
                }


            },

            // Open submission edit model for selected submission
            editSubmission: function (id) {
                this.selectedSubmissions = [id];
                if (this.selectedSubmissions.length == 1) {
                    window.location = "/reports/campaign/" + this.campaign.id + "/submissions/" + id;
                } else {
                    alert("Error loading submission for editing");
                }


            },

            // Check if submission is currently selected
            isSelected: function (task_id) {
                return this.selectedSubmissions.includes(task_id);
            },

            // Close the overlay
            onDeleteClose: function () {
                this.showDelete = false;

            },

            // Close submission edit modal
            onEditClose: function () {
                this.showEdit = false;

            },

            // Approve selected submissions
            approveSelected: function () {

                let url = '/tasks/approve';
                console.log(this.selectedSubmissions);

                let tasks = this.selectedSubmissions;
                if (tasks.length > 0) {

                    axios.post(url, {selectedSubmissions: this.selectedSubmissions})
                    .then(response => {
                            // Find the request by id
                            if (response.status == 200) {
                                location.reload();
                                this.close();
                            } else {
                                alert("Error approving selected submissions. Please try again.");
                            }

                        });

                } else {
                    alert("Please select at least submission to approve.");
                }
            },

            showImageModal: function(img){
                 swal({
                    title: "",
                    text: "<img src='" + img + "' style='max-width:100%; max-height: calc(100vh - 100px)'>",
                    html: true,
                    customClass: 'swal-wide',
                    allowOutsideClick: true
                });
            }
        }
    }
</script>