<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row">
               
                <div class="col-sm-12">
                    <div class="overlay__heading" style="text-align:left" v-if="selectedSubmissions.length > 1">Delete the selected submissions</div>
                    <div class="overlay__heading" style="text-align:left" v-else>Delete the selected submission</div>
                </div>
               
            </div>

            <div class="projects-form">
                <form id="deleteForm">
                    <div class="row">
                        
                        <div class="col-sm-12">
                            <span style="float:left; ">Increase due date by 7 days</span>
                            <div v-if=""  v-on:click="toggleExtension();"
                                 class="overlay__list-item-add" style="float: left; margin: -5px 0px 0px 20px;">
                                <img v-if="extendCampaignValue === true" src="/images/checkmark.svg" alt="Checkmark">
                            </div>

                            <input type="hidden" name="deleteSubmissions" v-bind:value="selectedSubmissions"/>
                            <input type="hidden" name="extendCampaign" v-bind:value="extendCampaignValue"/>

                        </div>
                        
                    </div>
                </form>
                    <div class="row">
                        
                        <div class="col-sm-4">
                            <button class="btn btn--blue btn-block" v-on:click="confirmDelete">Confirm delete</button>
                        </div>
                        <div class="col-sm-4">
                            <button class="btn btn-block" v-on:click="close()">Cancel</button>
                        </div>
                        <div class="col-sm-4"></div>
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
                extendCampaignValue: true,
            }
        },
        mounted() {
            this.selectedSubmissions = (this.selectedSubmissionsData) ? this.selectedSubmissionsData : [];
        },

        watch: {},

        methods: {

            close: function () {
                this.$emit('close');
            },

            confirmDelete: function () {

                let formData = new FormData(document.getElementById('deleteForm'));

                let url = '/tasks/delete';

                axios.post(url, formData)
                .then(response => {
                    // Find the request by id
                    if (response.status == 200) {
                        location.reload();
                        this.close();
                    } else {
                        alert("Error deleting selected submissions. Please try again.");
                    }

                })
                .catch(function (error) {
                    alert("Error deleting selected submissions. Please try again");
                });

            },

            extendCampaign: function () {

                return this.extendCampaignValue;
            },

            toggleExtension: function(){
                if(this.extendCampaignValue === true){
                    this.extendCampaignValue = false;
                }else{
                    this.extendCampaignValue = true;
                }
            }
        }
    };


</script>

