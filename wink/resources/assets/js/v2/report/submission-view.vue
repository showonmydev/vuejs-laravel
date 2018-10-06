<template>

    <div class="page__body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="submission-map"><img :src="generateMap()" style="float:left"/></div>
                    <h1 v-if="selectedSub.location.name">{{selectedSub.location.name}}</h1>
                    <div class="page__subtext active">Submitted by {{selectedSub.user.first_name}} on 
                        <div v-if="selectedSub.submitted_date">
                          123{{selectedSub.submitted_date}}
                        </div>
                        <div v-else>
                          {{selectedSub.update_at}}
                        </div>
                    </div>
                </div>

                    </div>
                </div>






                <div class="page__content page--bg" style="margin-top: 20px">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6"><span class="page__subtext active">Responses</span> {{selectedSub.score}} / {{selectedSub.max_score}} points <span class="mark_result">{{selectedSub.result}}</span></div>
                            <div class="col-md-6">                                
                            </div>
                        </div>
                        <table v-if="selectedData.answers" class="table table-hover submissions-table">                       
                            <tbody>
                                <tr v-for="answer in selectedData.answers">

                                    <td width="60px">
                                        <div class="overlay__list-item-add-small">
                                            <img v-if="answer.alert == 0" src="/images/approved.png" height="27px" alt="Checkmark">
                                            <img v-if="answer.alert == 1" src="/images/approve.png" height="27px" alt="Checkmark">

                                        </div>
                                    </td>
                                    <td width="40%">
                                        <span class="resourcelist__name -slate">{{answer.question.question}}</span>
                                    </td>

                                    <td align="right" v-if="answer.question_type_id == 1 || answer.question_type_id == 5 || answer.question_type_id == 9 || answer.question_type_id == 11 || answer.question_type_id == 12">{{answer.answer_text}}</td>
                                    <td align="right" v-if="answer.question_type_id == 2 || answer.question_type_id == 3 || answer.question_type_id == 4">
                                        {{answer.answer_text}}
                                    </td>
                                    <td align="right" v-if="answer.question_type_id == 6" ><div v-html="showloadImage(answer.image)" v-on:click="showImageModal('/images/' + answer.image.name)"></div></td>
                                    <td align="right" v-if="answer.question_type_id == 7"><span v-bind:class="{ answerActive: answer.answer_text == 'Yes' }">Yes</span> / <span v-bind:class="{ active: answer.answer_text == 'No' }">No</span></td>
                                    <td align="right" v-if="answer.question_type_id == 8">

                                        <ul class="question-star__rating" style="float:right">
                                            <li class="question-star--full"></li> 
                                            <li  v-if="answer.answer_numeric >= 2" class="question-star--full"></li><li  v-else class="question-star--empty"></li>
                                            <li  v-if="answer.answer_numeric >= 3" class="question-star--full"></li><li  v-else class="question-star--empty"></li>
                                            <li  v-if="answer.answer_numeric >= 4" class="question-star--full"></li><li  v-else class="question-star--empty"></li> 
                                            <li  v-if="answer.answer_numeric >= 5" class="question-star--full"></li><li  v-else class="question-star--empty"></li>
                                        </ul>

                                    </td>
                                    <td align="right" v-if="answer.question_type_id == 10">{{answer.answer_gpslat}}; {{answer.answer_gpslong}}</td>


                                </tr>
                            </tbody>
                        </table>

                        <div v-else>
                         <div class="row">
                            <div class="col-md-6">

                                No data available for this submission
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <delete-tasks v-if="showDelete" :selectedSubmissionsData="selectSubmission"
            @close="onDeleteClose"></delete-tasks>

            <edit-tasks v-if="showEdit" :selectedSubmissionsData="selectSubmission"
            @close="onEditClose"></edit-tasks>

        </div>
    </template>

    <script>

    export default {
        props: {
            campaignData: {type: Object},
            submissionData: {type: Object},
            selectedData: {type: Object}
        },
        data() {
            return {

                campaign: {},
                submissions: {},
                selectedSub: {},
                selectSubmission: {},
                prevPage: false,
                nextPage: false,
                total: 1,
                current: 1,
                indexList: [],
                approveText: 'Approve',
                showDelete: false,
                showEdit: false

            }
        },


        mounted() {

            this.campaign = (this.campaignData) ? this.campaignData : [];
            this.selectedSub = (this.selectedData) ? this.selectedData : [];
            this.submissions = (this.submissionData) ? this.submissionData : [];
            console.log(this.selectedSub);
            this.updateNav();
            this.paginationBuild();
            this.selectSubmission = [this.selectedSub.id];
        },
        methods: {

            approveTask: function(){
                let url = '/tasks/approve';                                    
                let tasks = [this.selectedSub.id];
                if (tasks.length > 0) {

                    axios.post(url, {selectedSubmissions: tasks})
                    .then(response => {
                      
                        location.reload();
                        

                    }).catch(function (error) {
                        alert("Error approving selected submission. Insufficient funds.");
                        console.log(error);
                    });;
                } else {
                    alert("Please select at least submission to approve.");
                }
            },

            toggleSubmissionReview: function (){
              let url = '/task/flag/' + this.selectedSub.id;

              axios.post(url, {})
              .then(response => {
                            // Find the request by id
                            if (response.status == 200) {
                                this.selectedSub.flagged = response.data.data
                            } 

                        })
              .catch(function (error) {
                alert("Error approving selected submissions. Please try again");
            });
          },

          paginationBuild: function (){                                    

               this.total = Object.keys(this.submissions).length;
               // this.current = 1;
               // let count = 1;
               // for (var i in this.submissions) { 
               //      this.indexList.push(this.submission[i]['id']);

               //      if(i == this.selectedSub.id){                               
               //          this.current = count;   

               //      }

               //      count++;
               //  }

               this.current = 1;
                let count = 0;

               this.submissions.forEach(function (sub) {
               
                        
                        this.indexList.push(sub.id);

                     if(sub.id == this.selectedSub.id){  
                     console.log(sub);                             
                         this.current = count + 1;
                         console.log("Current: " + this.current)
                     }
                      count++;

                }, this);

                if(this.current < this.total && this.total > 1){
                    this.nextPage = true;
                }

                if(this.current <= this.total && this.current > 1){
                    this.prevPage = true;
                } 

                console.log(this.indexList);              

        }, 

        loadNextPage: function () {
            window.location = "/reports/campaign/" + this.campaign.id + "/submissions/" + this.indexList[this.current];
        }, 

        loadPrevPage: function (){
            window.location = "/reports/campaign/" + this.campaign.id + "/submissions/" + this.indexList[this.current - 2];
         },

         showloadImage: function (img){
            if(img){
                return "<span  class='reportThumb' style='background: url(/images/" + img.name + ") center center no-repeat; background-size:cover'></span>";
            }else{
                return "N / A";
            }
        },

         // Open submission delete model for selected submissions
         openDeleteTask: function () {
            this.showDelete = true;
        },

        // Open submission edit model for selected submission
        openEditTask: function () {
            this.showEdit = true;
        },

        getSelectedSubmission: function (){

        },

        hideAll: function () {
            this.showOverview = false;
            this.showLocations = false; 
            this.showAlerts = false;
            this.showData = false;
        },

        updateNav: function () {
            $('.header__wrap .header__nav-section').html('<li><a href="/reports/campaign/'+this.campaign.id+'"><span class="ion-reply icon--medium"></span> &nbsp; &nbsp;  Back to ' + this.campaign.report_name + '</a></li>');
        },


        // Close the overlay
        onDeleteClose: function () {
            this.showDelete = false;
        },

        // Close the overlay
        onEditClose: function () {

            this.showEdit = false;
        },

        generateMap: function (){
            return "https://maps.googleapis.com/maps/api/staticmap?center=" + this.selectedSub.location.latitude + "," + this.selectedSub.location.longitude + "&zoom=17&size=100x100&markers=" + this.selectedSub.location.latitude + "," + this.selectedSub.location.longitude + "&key=AIzaSyBglo05WjHfbJgShHwkMCF2Kjp_A3Eq44U";
        },

            showImageModal : function(img){
                 swal({
                    title: "",
                    text: "<img src='" + img + "' class='modal-image'>",
                    html: true,
                    customClass: 'swal-wide',
                    allowOutsideClick: true
                });
            },

            openHashedLink : function (){
                window.location = "/reports/submission/" + this.selectedSub.hash;
            }
    }
}
</script>