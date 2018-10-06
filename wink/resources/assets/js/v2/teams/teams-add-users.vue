<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row"><div class="col-sm-12">
                <div class="overlay__heading">Add users to your team</div>
            </div></div>
            <div class="row"><div class="col-sm-12">
                <div class="overlay__sub-heading">Select existing users or invite new ones</div>
            </div></div>
            <div class="overlay__tabs">
                <div class="overlay__tab" v-bind:class="{active: showExistingUsers}" v-on:click="showExisting(true)">Existing users</div>
                <div class="overlay__tab" v-bind:class="{active: !showExistingUsers}" v-on:click="showExisting(false)">Invite users</div>
            </div>
            <div v-if="showExistingUsers">
                <div class="search">
                    <input v-model="search" class="overlay__input" type="text" placeholder="Search users">
                </div>
                <div class="overlay__list">
                    <!--// For users in users-->
                    <div v-for="user in users" class="overlay__list-item">
                        <div class="overlay__list-item-chars">
                            <span class="table__chars" v-bind:class="getRandomBackground(user.first_name[0])">{{user.first_name[0]}}{{user.last_name[0]}}</span>
                        </div>
                        <div class="overlay__list-item-details">
                            <span class="list-main">{{user.first_name}} {{user.last_name}}</span>
                            <span class="list-secondary">{{user.email}}</span>
                        </div>
                        <div v-on:click="toggleMember(user)" class="overlay__list-item-add">
                            <img v-if="isTeamMember(user)" src="/images/checkmark.svg" alt="Checkmark">
                        </div>
                    </div>
                </div>
                <button class="btn btn--blue btn-block" v-on:click="updateTeamUsers">Update</button>
            </div>
            <div v-else>
                <textarea v-model="emailString" class="overlay__textarea" name="addUsers" id="addUsers" cols="30" rows="6" placeholder="Add email addresses"></textarea>
                <p class="page-subtext text-center">Seperate emails by comma or space</p>
                <button v-on:click="inviteUsers" class="btn btn--grey btn-block">Invite</button>
                <!--<p class="page-subtext text-center">Or invite using a special link</p>-->
            </div>

        </div>
    </div>

</template>

<script>

    export default {
        props: {
            selectedTeamData: {type: Object}
        },
        data() {
            return {
                initialUsers: [],
                users: [],
                currentTeamMembers: [],
                showExistingUsers: true,
                search: "",
                emailString: ""
            }
        },
        mounted() {
            this.getUsers();
            this.selectedTeam = this.selectedTeamData;
        },

        watch: {
            search: function(val){
                // If the text is in the users name or email
                this.users = this.initialUsers.filter( (user) => {
                    return (user.first_name.includes(val) || user.last_name.includes(val) || user.email.includes(val));
                });
            }
        },

        methods: {

            close: function(){
                this.$emit('close');
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

        },


            // Show the exiting users or add new users
            showExisting: function(value){
                this.showExistingUsers = value;

            },

            // AJAX request to get users here
            getUsers: function(){
                axios.get('/users')
                    .then(response => {
                        this.users = response.data.users;
                        this.invited = response.data.invited;
                        this.initialUsers = this.users;
                        this.getCurrentTeamMembers();
                    });
            },

            // find out the users in this team
            getCurrentTeamMembers: function(){
                this.users.forEach((user) => {
                    let teams = [];
                    user.teams.forEach((team) => {
                        teams.push(team.id);
                    });
                    if(teams.includes(this.selectedTeam.id)){
                        this.currentTeamMembers.push(user.id);
                    }
                })
            },

            // Is this user in the selected team
            isTeamMember: function(user){
                return this.currentTeamMembers.includes(user.id);
            },

            // AJAX post to update the team members
            updateTeamUsers: function(){

                axios.post(`/teams/addexistingusers/${this.selectedTeam.id}`, {'teamUsers' : this.currentTeamMembers})
                .then(response => {
                    // Find the request by id
                    console.log(response.data);
                    this.$emit('close');
                });
            },

            // Toggle the team member on or off
            toggleMember: function(user){
                // Toggle the green icon on or off
                let index = this.currentTeamMembers.indexOf(user.id);
                if(index > -1){
                    this.currentTeamMembers.splice(index, 1);
                } else {
                    this.currentTeamMembers.push(user.id);
                }
            },

            // Invite new users to the team
            inviteUsers: function(){
                console.log(this.emailString);
                axios.post(`/teams/addusers/${this.selectedTeam.id}`, {'newUsers' : this.emailString})
                    .then(response => {
                        // Find the request by id
                        console.log(response.data);
                        this.$emit('close');
                    });
            }

        }
    }
</script>