<template>

    <div class="page__body">
        <div class="container-fluid page__header">
            <div class="row">
                <div class="col-md-6">
                    <h1>Companies</h1>
                </div>
                <div class="col-md-6">
                    <button v-if="user == 'mike.metelerkamp@gmail.com'" class="btn btn--green pull-right" v-on:click="runPayout">
                        Generate NetCash Payout
                    </button>
                </div>
            </div>
        </div>
        <div class="page__content page--bg">
            <div class="container-fluid">

                <div class="row">
                    <div class="col-md-6" v-if="!showCompaniesTable">
                        <span class="page__subtext active">{{companies.length}} Companies</span>

                    </div>

                </div>
                <companies-table :companies-data="companies" ></companies-table>


            </div>
            <companies-form v-if="showAddCompanies" @close="onClose"></companies-form>

        </div>
    </div>

</template>

<script>

    export default {
        props: {
            companiesData: {type: Array},
            userData: {type: Array},
        },
        data() {
            return {
                companies: [],
                user: '',
                selectedCompany: {},
                companiesCount: 0,
                showCompaniesTable: true,
                showAddCompanies: false,
            }
        },
        mounted() {
            this.companies = (this.companiesData) ? this.companiesData : [];
            this.user = (this.userData) ? this.userData : [];

        },
        methods: {

            addNewCompany(company){
                this.showAddCompanies = true;

            },

            onCompanySelected(company){
                this.selectedCompany = company;
                this.showCompanyTable = false;
            },
            backToCompanies: function () {
                this.selectedCompany = {};
                this.showCompanyTable = true;
            },
            // Close the overlay
            onClose: function () {
                this.showAddCompanies = false;
            },

            runPayout: function (){
                axios.get('/companies/reward/payout')
                .then(response => {
                    // Find the request by id
                    console.log(response.data);
                    //alert(response.data);
                    if(response.data.status != 200){
                        alert("Error generating payout file. Please contact support.");
                    }else{
                        alert("Payout file generated successfully. You will recieve an email shortly.");
                    }
                });
            }

        }
    }
</script>