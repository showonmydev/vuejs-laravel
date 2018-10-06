<template>

    <div class="page__content page--bg">

        <companies-form v-if="showCompanyEdit" @close="onClose" :company-data="selectedCompany"></companies-form>
        <div class="campaigns-table" v-if="companies.length > 0">

            <div v-for="company in companies" class="campaigns-table__row">


                <div class="campaigns-table__row-title" style="margin-left: 20px"><a href="javascript:;"
                   v-on:click="selectCompany(company)"><span
                   class="table__chars"
                   v-bind:class="getRandomBackground(company.name[0])">{{company.name[0]}}</span><span
                   class="resourcelist__name -slate">{{ company.name }}</span></a></div>
                   <div class="campaigns-table__row-status-full" style="min-width: 200px">{{company.subdomain}}</div>

                    <div class="campaigns-table__row-status-full">{{company.company_hash}}</div>


                   <div class="pull-right"><span class="pull-right edit-dropdown"></span></div>

                   
               </div>


           </div>
           <p v-else>There are no companies currently</p>

       </div>

   </template>


   <script>

    export default {
        props: {
            companiesData: {type: Array}
        },
        data() {
            return {
                companies: [],
                selectedCompany: null,
                showCompanyEdit: false,
            }
        },
        watch: {
            companiesData: function () {
                this.companies = this.companiesData;
            }
        },
        mounted() {
            this.companies = (this.companiesData) ? this.companiesData : [];

            console.log(this.companies);

        },
        filters: {

            truncate: function (string, value) {
                return string.substring(0, value) + '...';
            }

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
            launchCompanyAddModal: function () {
                this.showCompanyAdd = true;
            },
            launchCompanyEditModal: function () {
                this.showCompanyEdit = true;
            },
            selectCompany: function (company) {
                if (!company.submitted) {
                    this.selectedCompany = company;
                    this.launchCompanyEditModal();
                }
            },
            // Close the overlay
            onClose: function () {
                this.showCompanyEdit = false;
            }
        }
    }
</script>