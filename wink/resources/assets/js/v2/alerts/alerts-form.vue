<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row">
                <div class="col-sm-12">
                    <div class="overlay__heading">Add a Alert</div>
                    <div class="overlay__sub-heading">Trigger alert based on questions asked.</div>
                </div>
            </div>
            <hr>

            <div class="projects-form">
                <form id="alertForm">
                    <input type="hidden" :value="campaign.id" name="campaign_id"/>
                    <div class="row">
                        <div class="col-sm-12">
                            <label for="question">Question</label>
                            <select id="question" class="styled tags form-control" style="width: 100%;"
                                    name="question" placeholder="Select a question to create an alert"
                                    v-model="selectedQuestion">
                                <option value="" selected>Select a question to create an alert</option>
                                <option v-for="question in questions" :value="question.id"
                                        v-bind:value="question">{{question.question}}
                                </option>


                            </select>
                            <input type="hidden" name="question_id" v-bind:value="selectedQuestion.id" />
                            <div v-if="selectedQuestion">

                                <p v-if="selectedQuestion.input_type == 5 || selectedQuestion.input_type == 6 || selectedQuestion.input_type == 9 || selectedQuestion.input_type == 10"
                                   style="color: #cc0000">No alert available for this question type.</p>

                            </div>
                        </div>
                    </div>
                    <template>
                        <div class="row"
                             v-if="selectedQuestion.input_type != 5 && selectedQuestion.input_type != 6 && selectedQuestion.input_type != 9 && selectedQuestion.input_type != 10">

                            <div class="form-group col-sm-8">
                                <label for="comparator" class="control-label">Scenario</label>
                                <select id="comparator" class="styled tags form-control" style="width: 100%;"
                                        name="comparator">


                                    <option value="=">If answer selected is equal to</option>
                                    <option value="!=">If answer selected is not equal to</option>
                                    <option value=">">If answer selected is greater than</option>
                                    <option value="<">If answer selected is less than</option>


                                </select>
                            </div>
                            <div class="form-group col-sm-4" v-if="selectedQuestion">
                                <label for="reference_input" class="control-label">&nbsp;</label>

                                <input v-if="selectedQuestion.input_type == 1" class="form-control pad" placeholder=""
                                       name="reference_input" type="text"
                                       id="reference_input" :value="alert.reference" placeholder="">

                                <select v-if="selectedQuestion.input_type == 2 || selectedQuestion.input_type == 3 || selectedQuestion.input_type == 4"
                                        id="reference_input" class="styled tags form-control"
                                        style="width: 100%;"
                                        name="reference_input">

                                    <option value="">Select a reference</option>
                                    <option v-for="opt in selectedQuestion.options" :value="opt.name">{{opt.name}}
                                    </option>


                                </select>

                                <select v-if="selectedQuestion.input_type == 7" id="reference_input"
                                        class="styled tags form-control"
                                        style="width: 100%;"
                                        name="reference_input">

                                    <option value="">Select a reference</option>
                                    <option value="1">Yes</option>
                                    <option value="0">No</option>


                                </select>

                                <select v-if="selectedQuestion.input_type == 8" id="reference_input"
                                        class="styled tags form-control"
                                        style="width: 100%;"
                                        name="reference_input">

                                    <option value="">Select a reference</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>


                                </select>


                            </div>

                        </div>
                        <div class="row"
                             v-if="selectedQuestion.input_type != 5 && selectedQuestion.input_type != 6 && selectedQuestion.input_type != 9 && selectedQuestion.input_type != 10">
                            <div class="form-group col-sm-12">
                                <label for="name" class="control-label">Tigger alert called</label>
                                <input class="form-control pad" placeholder="" name="name" type="text"
                                       id="name" :value="alert.name" placeholder="Give this alert a name">
                            </div>
                        </div>
                    </template>
                </form>
            </div>


            <hr>
            <button class="btn btn--blue btn-block" v-on:click="saveAlert">Save Alert</button>
        </div>
    </div>

</template>

<script>

    export default {
        props: {
            alertData: {type: Array},
            campaignData: {type: Object}
        },
        data() {
            return {
                alert: [],
                campaign: [],
                questions: [],
                formData: {},
                selectedQuestion: ""
            }
        },
        mounted() {
            this.alert = (this.alertData) ? this.alertData : [];
            this.campaign = (this.campaignData) ? this.campaignData : [];
            this.getQuestions();
            console.log(this.questions);
        },

        watch: {},

        methods: {

            close: function () {
                this.$emit('close');
            },

            saveAlert: function () {
                if (this.selectedQuestion) {
                    if (this.selectedQuestion.input_type == 1 || this.selectedQuestion.input_type == 5 || this.selectedQuestion.input_type == 6 || this.selectedQuestion.input_type == 9 || this.selectedQuestion.input_type == 10) {
                        alert("No alert available for this question type");
                        return;
                    }
                }





                let formData = new FormData(document.getElementById('alertForm'));
                console.log(formData);
                //
                let url = `/alerts`;
                if (this.alert.id) {
                    let url = `/alerts/` + this.alert.id;
                }

                console.log(formData);
                axios.post(url, formData)
                    .then(response => {
                        // Find the request by id
                        if (response.status == 200) {
                            console.log(response.data);
                            this.close();
                        } else {
                            console.log(response.data)
                            alert("Error saving this alert. Please ensure all required fields have been completed.");
                        }
 
                    })
                    .catch(function (error) {
                        alert("Error saving this alert. Please ensure all required fields have been completed.");
                        console.log(error);
                    });

            },

            getQuestions: function () {

                let url = '/campaign/questions/' + this.campaign.id;
                axios.get(url)
                    .then(response => {
                        // Find the request by id
                        console.log(response.data);
                        this.questions = response.data.data;
                    });

            }

        }
    };


</script>

