<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row">
                <div class="col-sm-12">
                    <div class="overlay__heading" v-if="company.id">Edit Company</div>
                    <div class="overlay__heading" v-else>Add Company</div>
                </div>
            </div>
            <hr>

            <div class="projects-form">
                <form id="companyForm">

                     <div class="row" style="margin-bottom: 25px">
                        <div class="col-sm-12">
                            <label for="name">Unique Hash</label>
                            <p v-if="company.company_hash">{{company.company_hash}}</p>
                            <p v-else>Not available. Click save to generate unique hash.</p>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <label for="name">Name</label>
                            <input class="form-control pad" placeholder="Name" required=""
                                   name="name"
                                   type="text" id="name" :value="company.name">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <label for="autocomplete">Subdomain</label>
                            <input class="form-control pad" placeholder="Subdomain" required=""
                                   name="subdomain"
                                   type="text" id="name" :value="company.subdomain">
                        </div>
                    </div>

                     <div class="row">
                        <div class="col-sm-12">
                            <label for="autocomplete">Rewards</label>
                            <select class="form-control" name="rewards" id="rewards" v-model="company.rewards">
            <option value="0" :selected="company.rewards == 0 ? 'selected' : ''">No</option>
            <option value="1" :selected="company.rewards == 1 ? 'selected' : ''">Yes</option>
        </select>
                        </div>
                    </div>


                    <div class="row">
                        <div class="col-sm-12">
                            <label for="autocomplete">Balance</label>
                            <input class="form-control pad" placeholder="Balance" required=""
                                   name="balance" 
                                   type="text" id="name" :value="company.balance">
                        </div>
                    </div>                 

                </form>
            </div>


            <hr>
            <button class="btn btn--blue btn-block" v-on:click="saveCompany">Save Company</button>
        </div>
    </div>

</template>

<script>

    import $ from 'jquery';
    import 'select2';

    export default {
        props: {
            companyData: {type: Object},
        },
        data() {
            return {
                showAdvanced: true,
                company: {},
                formData: {}
            }
        },
        mounted() {
            this.company = (this.companyData) ? this.companyData : {};
            console.log(this.company);
          
            // Setup select 2
            $('select.styled').select2({
                theme: "classic",
                allowClear: true
            });
        },

        watch: {},

        methods: {

            close: function () {
                this.$emit('close');
            },

            saveCompany: function () {
                let formData = new FormData(document.getElementById('companyForm'));
                console.log(formData);
                if (!this.company.id) {
                    var url = `/companies/create`;
                } else {
                    var url = `/companies/update/` + this.company.id;
                }
                axios.post(url, formData)
                    .then(response => {
                        // Find the request by id
                        console.log(response.data);
                       location.reload(); 
                    });
            }

        }
    };


</script>