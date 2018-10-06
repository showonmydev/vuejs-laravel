<template>

    <div class="page__body">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <h1>Submission Edit</h1>
                </div>

                <div class="overlay">
                    <div class="overlay__close" v-on:click="close">
                        <img src="/images/close-outline.svg" alt="Close image">
                    </div>
                    <div class="overlay__content">
                        <div class="row">
                            <div class="col-sm-12">
                                <div class="overlay__heading">Submission Edit</div>
                                <div class="overlay__sub-heading">Edit the submission below before approval</div>
                            </div>
                        </div>
                        <hr>
                        <form id="editForm">
                            <div class="row" v-for="answer in submissionData.answers">
                                <div class="question-answer">


                                    <label><img :src="questionTypeIcon(answer.question.input_type)">{{answer.question.input_type}} - {{answer.question.question}}</label>
                                    <div v-if="answer.question.input_type == 1 || answer.question.input_type == 5 || answer.question.input_type == 9 || answer.question.input_type == 11 || answer.question.input_type == 12">
                                        <input
                                        :id="answer.answer_id" class="form-control pad"
                                        :name="questionName(answer.answer_id, answer.question.input_type)"
                                        :value="answer.answer_text"/>
                                    </div> 

                                    <div v-if="answer.question.input_type == 2 || answer.question.input_type == 3">
                                        <select multiple :id="answer.answer_id" class="form-control pad"
                                        :name="questionName(answer.answer_id, answer.question.input_type)"
                                        >
                                        <option :value="option.name" :selected="option.name == answer.answer_text" v-for="option in answer.options">{{option.name}}</option>
                                        </select>
                                    </div>

                                    <div v-if="answer.question.input_type == 4">
                                        <select multiple :id="answer.answer_id" class="form-control pad"
                                        :name="questionName(answer.answer_id, answer.question.input_type)"
                                        >
                                        <option :value="option.name" :selected="ifinChoices(option.name, answer.choices)" v-for="option in answer.options">{{option.name}}</option>
                                        </select>
                                    </div>

                                    <div v-if="answer.question.input_type == 6">
                                    </div>

                                    <div v-if="answer.question.input_type == 7">
                                        <select :id="answer.answer_id" class="form-control pad"
                                        :name="questionName(answer.answer_id, answer.question.input_type)">
                                        <option value="No">No</option>
                                        <option value="Yes" :selected="answer.answer_text == 'Yes'">Yes</option>
                                    </select>
                                </div>

                                <div v-if="answer.question.input_type == 8">
                                    <select :id="answer.answer_id" class="form-control pad"
                                    :name="questionName(answer.answer_id, answer.question.input_type)">
                                    <option value="1">1</option>
                                    <option value="2" :selected="answer.answer_numeric == 2">2</option>
                                    <option value="3" :selected="answer.answer_numeric == 3">3</option>
                                    <option value="4" :selected="answer.answer_numeric == 4">4</option>
                                    <option value="5" :selected="answer.answer_numeric == 5">5</option>
                                </select>
                            </div>

                            <div v-if="answer.question.input_type == 10">
                                <input :id="answer.answer_id" class="form-control pad"
                                :name="questionName(answer.answer_id, answer.question.input_type)"
                                :value="answer.answer_gpslat"/>
                                <input :id="answer.answer_id" class="form-control pad"
                                :name="questionName(answer.answer_id, answer.question.input_type)"
                                :value="answer.answer_gpslong"/>
                            </div>

                        </div>
                    </div>
                </form>
                <hr>
                <div class="row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-4">
                        <button class="btn btn--blue btn-block" v-on:click="confirmEdit">Save</button>
                    </div>
                    <div class="col-sm-4">
                        <button class="btn btn-block" v-on:click="cancelEdit">Cancel</button>
                    </div>
                    <div class="col-sm-2"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</template>

<script>

    export default {
        props: {
            selectedSubmissionsData: {type: Array}
        },
        data() {
            return {
                selectedSubmissions: [],
                submissionData: []
            }
        },
        mounted() {
            this.selectedSubmissions = (this.selectedSubmissionsData) ? this.selectedSubmissionsData : [];
            this.getSubmissionData();

        },

        watch: {},

        methods: {

            close: function () {
                this.$emit('close');
            },

            questionTypeIcon: function (question_input_type){
                let img = '/images/question-text.svg';
                if(question_input_type == 1 || question_input_type == 5){
                    img = '/images/question-text.svg';
                }
                if(question_input_type == 2 || question_input_type == 3 || question_input_type == 4){
                    img = '/images/question-multiple.svg';
                }
                if(question_input_type == 6){
                    img = '/images/question-image.svg';
                }
                if(question_input_type == 8){
                    img = '/images/question-rating.svg';
                }
                if(question_input_type == 9){
                    img = '/images/question-barcode.svg';
                }
                if(question_input_type == 10){
                    img = '/images/question-gps.svg';
                }
                if(question_input_type == 11){
                    img = '/images/question-number.svg';
                }
                if(question_input_type == 12){
                    img = '/images/question-calc.svg';
                }

                return img;
            },

            ifinChoices: function (option, choices){
                if (choices.includes(option)) {
                            return true;
                        }

                        return false;
            },

            // Cancel editing
            cancelEdit: function () {
                this.$emit('close');
            },

            // Generate input name for form submission
            questionName: function (id, type) {
                return "q_" + id + "[]";
            },

            // Save and approve submitted submission
            confirmEdit: function () {

                let formData = new FormData(document.getElementById('editForm'));

                let url = '/tasks/edit-approve/' + this.selectedSubmissions[0];

                axios.post(url, formData)
                .then(response => {
                        // Find the request by id
                        if (response.status == 200) {
                            location.reload();
                        } else {
                            alert("Error updating selected submission. Please try again.");
                        }

                    });

            },

            // Get Question and Answer data for selected submissions
            getSubmissionData: function () {

                let url = '/tasks/data/' + this.selectedSubmissions[0];

                axios.get(url)
                .then(response => {
                        // Find the request by id
                        if (response.status == 200) {
                            this.submissionData = response.data;
                            console.log(this.submissionData);
                        } else {
                            alert("Error retrieving submission data.");
                            this.close();

                        }

                    });
            }

        }
    };


</script>

