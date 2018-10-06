<template>

<div>
    <div class="board-menu">
        <div class="boards-list" id="boards-list">
            <h3>
                My Teams <span v-on:click="showTeamAddForm" class="admin-button">+</span>
            </h3>
            <div class="row container">
                    <div class="col-md-12">
                        <span class="page__subtext active">{{teams.length}} Teams</span>
                        <span class="page__subtext">{{usersCount}} Users</span>
                    </div>
            </div>
            <div class="board-menu">
                <!-- <teams-table :teamsData="teams" @teamSelected="onTeamSelected"></teams-table>   -->
                <teams-table-componenets :teamsData="teams" @teamSelected="onTeamSelected"></teams-table-componenets>
            </div>    
        </div>
    </div>

    <div class="board-body" id="board-body">
        <div class="container-fluid page__header" style="width:100%; max-width:100%; padding: 20px">
                <div class="row">
                    <div class="col-md-12">
                        <button v-if="showTeamUsersTable" class="btn btn--green pull-right" v-on:click="addNewUser">
                            Add User
                        </button>
                    </div> 
                </div>
        </div>
            <div class="row dashboard page__body">
                <div class="col-md-12">
                    <teams-users-table v-if="showTeamUsersTable" :selectedTeamData="selectedTeam"></teams-users-table>
                </div> 
            </div>
    </div>

    <teams-add-users v-if="showAddUsers" :selectedTeamData="selectedTeam" @close="onClose"></teams-add-users>
    <teams-add-team v-if="showTeamForm" @close="onClose"></teams-add-team>
</div>
</template>

<script>

    export default {
        props: {
            teamsData: {type: Array},
        },
        data() {
            return {
                teams: [],
                selectedTeam: {},
                usersCount: 0,
                showTeamUsersTable: false,
                showAddUsers: false,
                showTeamForm: false,
            }
        },
        mounted() {
            this.teams = (this.teamsData) ? this.teamsData : [];
            this.teams.forEach((team) => {
                this.usersCount += team.members.length;
            })
        },
        methods: {

            showTeamAddForm: function(){
                this.showTeamForm = true;
            },
            showNewUser: function(){

            },
            addNewUser(team){
                this.showAddUsers = true;
            },
            onTeamSelected(team){
                this.selectedTeam = team;
                this.showTeamUsersTable = true;
            },
            backToTeams: function(){
                this.selectedTeam = {};
                this.showTeamUsersTable = false;
            },
            // Close the overlay
            onClose: function(){
                this.showAddUsers = false;
                this.showTeamForm = false;
            }

        }
    }
</script>