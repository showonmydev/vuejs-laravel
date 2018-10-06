<template>

    <div class="overlay">
        <div class="overlay__close" v-on:click="close">
            <img src="/images/close-outline.svg" alt="Close image">
        </div>
        <div class="overlay__content">
            <div class="row">
                <div class="col-sm-12">
                    <div class="overlay__heading">Add a new Team</div>
                    <div class="overlay__sub-heading"></div>
                </div>
            </div>
            <hr>

            <div class="projects-form">
                <form id="teamForm">

                    <div class="row">
                        <div class="col-sm-12">
                            <label for="name">Name</label>
                            <input class="form-control pad" placeholder="Name" required=""
                                   name="name"
                                   type="text" id="name" :value="team.name">
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-12">
                            <label for="description">Description</label>
                            <textarea id="description" class="form-control pad" placeholder="Description..." required=""
                                      name="description" autocomplete="off">{{team.description}}</textarea>
                        </div>
                    </div>

                </form>
            </div>


            <hr>
            <button class="btn btn--blue btn-block" v-on:click="saveteam">Save Team</button>
        </div>
    </div>

</template>

<script>

    export default {
        props: {
            teamData: {type: Object},
        },
        data() {
            return {
                team: {},
                formData: {}
            }
        },
        mounted() {
            this.team = (this.teamData) ? this.teamData : {};

        },

        watch: {},

        methods: {

            close: function () {
                this.$emit('close');
            },

            saveteam: function () {
                let formData = new FormData(document.getElementById('teamForm'));
                console.log(formData);
                if (!this.team.id) {
                    var url = `/teams`;
                } else {
                    var url = `/teams/` + this.team.id;
                }
                axios.post(url, formData)
                    .then(response => {
                        // Find the request by id
                        console.log(response.data);
                        window.location.reload();
                        this.$emit('close');
                    });
            }

        }
    };


</script>

