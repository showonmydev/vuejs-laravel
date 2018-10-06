<template>


    <div class="page__content page--bg">


        <div class="campaigns-table" v-if="selectedTeam">

            <div v-for="user in selectedTeam.members" class="campaigns-table__row">


                <div class="campaigns-table__row-title" style="margin-left: 20px"><span class="table__chars" v-bind:class="getRandomBackground(user.first_name[0])">{{ user.first_name[0]
                    }}{{ user.last_name[0] }}</span>
                    <a v-bind:href="'/users/' + user.id + '/edit'" class="resourcelist__name">{{ user.first_name
                        }} {{ user.last_name }}</a></div>
                <div class="campaigns-table__row-status-full">{{user.email}}</div>
                <div class="campaigns-table__row-status-full">{{user.role}}</div>
                <div class="pull-right">
                    <ul class="header__nav-user clearfix">
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                               aria-haspopup="true" aria-expanded="false"><span
                                    class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>

                                    <a href="#" v-on:click="selectTeam(selectedTeam)">Edit</a>

                                </li>
                                <li>

                                    <a href="#" v-on:click="removeUser(user, selectedTeam, index)">Delete</a>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>


            <div v-for="user in selectedTeam.invited_members" class="campaigns-table__row">


                <div class="campaigns-table__row-title" style="margin-left: 20px" v-if="user.first_name">
                    <span class="table__chars" v-bind:class="getRandomBackground(user.first_name[0])">{{ user.first_name[0]
                        }}{{ user.last_name[0] }}</span>
                    <a v-bind:href="'/users/' + user.id + '/edit'" class="resourcelist__name">{{ user.first_name
                        }} {{ user.last_name }}</a>
                </div>
                <div class="campaigns-table__row-title" style="margin-left: 20px" v-if="selectedTeam" v-else>Not available</div>

                <div class="campaigns-table__row-status-full">{{user.email}}</div>

                <div class="pull-right">
                    <ul class="header__nav-user clearfix">
                        <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                               aria-haspopup="true" aria-expanded="false"><span
                                    class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                <li>

                                    <a v-bind:href="'/users/' + user.id + '/edit'" class="resourcelist__name">Edit</a>

                                </li>
                                <li>

                                    <a href="#" v-on:click="removeInvitedUser(user, selectedTeam, index)">Delete</a>

                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="pull-right" style="margin-right: 50px">(invited)</div>
            </div>


        </div>
        <p v-else>There are no users currently</p>
    </div>

</template>

<script>

    export default {
        props: {
            selectedTeamData: {type: Object},

        },
        data() {
            return {
                selectedTeam: null,
            }
        },
        mounted() {

            this.selectedTeam = (this.selectedTeamData) ? this.selectedTeamData : null;
            console.log( this.selectedTeam);
        },
        methods: {


            removeInvitedUser: function (user, team, index){
                 axios.post(`/teams/removeinvited/`+team.id+`/`+user.id, [])
                    .then(response => {
                       this.selectedTeam.invited_members.splice(index, 1);
                    });
            },

            removeUser: function (user, team, index){
                 axios.post(`/teams/removeuser/`+team.id+`/`+user.id, [])
                    .then(response => {
                        this.selectedTeam.members.splice(index, 1);
                    });
            },

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

        }
        }
    }
</script>