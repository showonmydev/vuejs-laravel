<template>

    <div class="page__content page--bg">


        <div class="campaigns-table custom_left_bar" v-if="teams.length > 0">

            <div v-for="team in teams" class="campaigns-table__row">
                <div v-on:click="selectTeam(team)" class="campaigns-table__row-title" style="margin-left: 20px"><span
                        class="table__chars"
                        v-bind:class="getRandomBackground(team.name[0])">{{team.name[0]}}</span><span
                        class="resourcelist__name -slate">{{ team.name }}</span></div>
                        <div class="pull-right menu_right">
                <div class="campaigns-table__row-status-full">{{team.description}}</div>
            
            
            <div class="campaigns-table__row-status-short">{{team.members.length}}/{{team.invited_members.length}}
                </div>

                <div class="">
                    <ul class="header__nav-user clearfix">
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                               aria-haspopup="true" aria-expanded="false"><span
                                    class="custom_caret caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>

                                    <a href="#" v-on:click="selectTeam(team)">Edit</a>

                                </li>
                                <li>

                                    <a href="#">Delete</a>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

            </div>

        </div>
        <div v-else>There are no teams currently</div>


    </div>

</template>

<script>

    export default {
        props: {
            teamsData: {type: Array},
            userRolesData: {type: Array},
            rolesData: {type: Array}
        },
        data() {
            return {
                teams: [],
                roles: [],
                userRoles: [],
            }
        },
        watch: {
            teamsData: function () {
                this.teams = this.teamsData;
            },
            userRolesData: function () {
                this.userRoles = this.userRoles;
            },
            rolesData: function () {
                this.roles = this.roles;
            }
        },
        mounted() {
            this.teams = (this.teamsData) ? this.teamsData : [];
            this.roles = (this.rolesData) ? this.rolesData : [];
            this.userRoles = (this.userRolesData) ? this.userRolesData : [];
            console.log(this.teams);
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
            selectTeam: function (team) {
                this.$emit('teamSelected', team);
            }
        }
    }
</script>
<style>
.custom_left_bar{

}
.custom_left_bar .campaigns-table__row{
   display: flex;
    align-items: center; 
        padding: 3px 0px 3px 0;
}
.custom_left_bar .campaigns-table__row-title{
    min-width: 150px;
}
.custom_left_bar .campaigns-table__row-status-short{
    margin-right: 5px;
}

.custom_left_bar .menu_right{
        width: 100%;
    justify-content: flex-end;
}

.custom_left_bar .dropdown-toggle {
    padding: 0px;
    min-height: auto !important;
}
.custom_caret {
    float: right;
    margin-right: 10px !important;
}
.v2 .boards-list {
    padding: 5px 0px;
}
.page__header {
    padding-bottom: 0px !important;
}
.v2 .boards-list h3 {
    padding: 0px;
    margin: 5px 0px 4px;
}
</style>