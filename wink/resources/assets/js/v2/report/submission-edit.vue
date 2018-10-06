<template>

    <div class="page__body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="submission-map"><img :src="generateMap()" style="float:left"/></div>
                    <h1 v-if="selectedSub.location.name">{{selectedSub.location.name}}</h1>
                    <div class="page__subtext active">Submitted by {{selectedSub.user.first_name}} on 
                        <span v-if="selectedSub.submitted_date">
                          {{selectedSub.submitted_date}}
                        </span>
                        <span v-else>
                          {{selectedSub.updated_at}}
                        </span>
                    </div>
                </div>
                <div class="col-md-6">
                    <button class="btn btn--green pull-right" v-if="selectedSub.approved == 0" v-on:click="approveTask()" v-html="approveText">
                        Approve
                    </button>
                    <button class="btn btn--gray pull-right" v-else style="cursor: default">
                        Approved
                    </button>

                    <a href="javascript:;" v-on:click="openHashedReport()" style="    float: right;
                        font-size: 14px;
                        display: inline-grid;
                        margin: 8px 20px 0px 0px;
                        color: #5d5d5d;">XLS</a>
                    <a href="javascript:;" v-on:click="openHashedLink()" style="    float: right;
                        font-size: 14px;
                        display: inline-grid;
                        margin: 8px 20px 0px 0px;
                        color: #5d5d5d;"># Link</a>
                    <a href="javascript:;"  v-if="selectedSub.approved == 0" style="float:right; margin: 8px 20px 8px 20px ;" v-on:click="openDeleteTask()"><img
                        src="/images/trash.png"/></a>
                        <a href="javascript:;"  v-if="selectedSub.approved == 0" style="float:right; margin: 8px;" v-on:click="openEditTask()"><img
                            src="/images/edit.png"/></a>
                            <div v-on:click="toggleSubmissionReview(selectedSub.task_id, selectedSub.flagged )">
                                <span v-if="selectedSub.flagged == 1" class="report-star--full" style="    font-size: 20px;
                                margin: 5px 20px 0px 40px;
                                float: right;" height="27px" width="27px" alt="Checkmark"></span>
                                <span v-else class="report-star--empty" height="27px" width="27px" alt="Checkmark" style="    font-size: 20px;
                                margin: 5px 20px 0px 40px;
                                float: right;"></span>
                                
                            </div>

                        </div>
                    </div>
                </div>






                <div class="page__content page--bg" style="margin-top: 20px">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-6"><span class="page__subtext active">Responses</span> {{ scoreCalc() }}<span class="mark_result">{{selectedSub.result}}</span></div>
                            <div class="col-md-6">
                                <div class="submission-pagination">


                                    <span class="prev" v-if="prevPage" v-on:click="loadPrevPage()">&#8249;</span>                                   
                                    <span class="current">{{current}}</span>
                                    of 
                                    <span  class="total">{{total}}</span>
                                    <span class="next" v-if="nextPage" v-on:click="loadNextPage()">&#8250;</span>

                                </div>
                            </div>
                        </div>
                        <div style="float:left; width: 100%; background #FFF; padding: 10px; margin-top: 30px; background: #FFF">
                            <table v-if="selectedData.answers" class="table table-hover submissions-table" style="float:left; width: 60%" border="0">                       
                                <tbody>
                                    <tr v-for="answer in selectedData.answers" v-if="answer.question_type_id != 6">

                                        <td valign="top">
                                            <div >
                                                <img v-if="answer.question_type_id == 1" src="/images/question-text.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 11" src="/images/question-number.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 12" src="/images/question-calc.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 2" src="/images/question-multiple.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 4" src="/images/question-multiple-select.svg" height="20px" /> 
                                                <img v-if="answer.question_type_id == 6" src="/images/question-image.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 7" src="/images/question-yesno.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 8" src="/images/question-rating.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 9" src="/images/question-barcode.svg" height="20px" />
                                                <img v-if="answer.question_type_id == 10" src="/images/question-gps.svg" height="20px" />

                                            </div>
                                        </td>
                                        <td>
                                            <span class="resourcelist__name -slate" style="float:left; width: 100%; margin: 0px 0px 5px">{{answer.question.question}}</span><br/>                             
                                            <div v-if="answer.question_type_id == 1 || answer.question_type_id == 5 || answer.question_type_id == 9 || answer.question_type_id == 11 || answer.question_type_id == 12">{{answer.answer_text}}</div>
                                            <div  v-if="answer.question_type_id == 2 || answer.question_type_id == 3 || answer.question_type_id == 4">
                                                {{answer.answer_text}} &nbsp;({{answer.score}})
                                            </div>
                                            <!-- <div v-if="answer.question_type_id == 6" ><div v-html="showloadImage(answer.image)" v-on:click="showImageModal('/images/' + answer.image.name)"></div></div>
                                             --><div   v-if="answer.question_type_id == 7"><span v-if="answer.answer_text == 'Yes'">Yes</span><span v-if="answer.answer_text == 'No'">No</span>  &nbsp;({{answer.score}})</div>
                                            <div  v-if="answer.question_type_id == 8">
                                               
                                                <ul class="question-star__rating" style="float:left">
                                                    <li class="question-star--full"></li> 
                                                    <li  v-if="answer.answer_numeric >= 2" class="question-star--full"></li><li  v-else class="question-star--empty"></li>
                                                    <li  v-if="answer.answer_numeric >= 3" class="question-star--full"></li><li  v-else class="question-star--empty"></li>
                                                    <li  v-if="answer.answer_numeric >= 4" class="question-star--full"></li><li  v-else class="question-star--empty"></li> 
                                                    <li  v-if="answer.answer_numeric >= 5" class="question-star--full"></li><li  v-else class="question-star--empty"></li>
                                                </ul>
                                                 <span style="float: left; margin:10px 0px 0px 5px;">&nbsp;({{answer.score}})</span>
                                                
                                            </div>
                                            <div  v-if="answer.question_type_id == 10">{{answer.answer_gpslat}}; {{answer.answer_gpslong}}</div>
                             
                                        </td>

                                        


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
                    <div v-if="selectedData.answers" style="float:left; width: 40%" border="0">    
                        <div v-for="answer in selectedData.answers" v-if="answer.question_type_id == 6">
                            <div v-html="showloadImage(answer.image)" v-on:click="showImageModal('/images/' + answer.image.name)"></div>
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

            scoreCalc: function (){
                if(this.selectedSub.score == 0 && this.selectedSub.score == 0){
                    return "N/A";
                }else{
                    return parseFloat((this.selectedSub.score / this.selectedSub.max_score) * 100).toFixed(2) + "%";
                }
            },

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
                return "<img  class='reportThumbBig' src='/images/" + img.name + "' /></span>";
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
    },

    openHashedReport: function (){
         window.location = "/reports/single/" + this.selectedSub.hash;
    }
}
}
</script>