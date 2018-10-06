<template>

    <div class="page__content page--bg">
        <div class="row">
            <div class="col-md-6">
                <span class="page__subtext active">{{overview.submittedTasks}} / {{overview.createdTasks}} Complete</span>

            </div>

        </div>

        <div class="report-wrap">

            <template v-for="qd, key in cards">
                <div class="report-card" v-if="qd.type == 'Doughnut'">
                    <question-doughnut :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-doughnut>
                </div>
                <div class="report-card" v-if="qd.type == 'starRating'">
                    <question-star-rating :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-star-rating>
                </div>
                <div class="report-card" v-if="qd.type == 'locationCount'">
                    <question-count :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-count>
                </div>
                <div class="report-card" v-if="qd.type == 'feedback'">
                    <question-feedback :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-feedback>
                </div>
                <div class="report-card" v-if="qd.type == 'horizontalBarStock'">
                    <question-horizontal-bar :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-horizontal-bar>
                </div>
                <div class="report-card" v-if="qd.type == 'scanCount'">
                    <question-count :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-count>
                </div>
                <div class="report-card" v-if="qd.type == 'photos'">
                    <question-photos :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-photos>
                </div>
                <div class="report-card" v-if="qd.type == 'horizontalBarRating'">
                    <question-horizontal-bar :questionData="qd.data" :question="qd.question" :questionNumber="++key"></question-horizontal-bar>
                </div>
            </template>
        </div>
    </div>

</template>

<script>
    export default {
        props: {
            locationsData: {
                type: Array
            },
            brandsData: {
                type: Array
            },
            campaignData: {
                type: Object
            },
            overviewData: {
                type: Object
            },
            campaignDetailData: {
                type: Array
            }
        },
        data() {
            return {
                locations: [],
                campaign: null,
                campaignDetail: null,
                showOverview: true,
                showLocations: false,
                showAlerts: false,
                showData: false,
                overview: [],
                cards: [],
            }
        },
        mounted() {
            this.locations = (this.locationsData) ? this.locationsData : [];
            this.brands = (this.brandsData) ? this.brandsData : [];
            this.campaign = (this.campaignData) ? this.campaignData : [];
            this.campaignDetail = (this.campaignDetailData) ? this.campaignDetailData : [];
            this.overview = (this.overviewData) ? this.overviewData : [];
            // To reduce the work on the browser animation we limit the card load time
            this.overviewData.cards.forEach((ele, index) => {
                setTimeout(() => {
                    this.cards.push(ele);
                }, index * 200)
            })
        },
        methods: {

            formatQuestionData: function () {

                // Temp
                this.overview.push(this.feedback);
                this.overview.push(this.photos);
                this.overview.push(this.horizontalBarRating);
                this.overview.push(this.horizontalBarStock);
                this.overview.push(this.locationCount);
                this.overview.push(this.scanCount);
                this.overview.push(this.doughnut);
                this.overview.push(this.starRating);


            }

        }
    }
</script>