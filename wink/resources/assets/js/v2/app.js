require('./bootstrap');
Vue.component('home', require('./home/home.vue'));
/*
 Dashboard components
*/
Vue.component('dashboard', require('./dashboard/dashboard.vue'));
Vue.component('board', require('./dashboard/board.vue'));
/*
 Project components
 */
Vue.component('add-task', require('./project/add-task.vue'));
Vue.component('edit-task', require('./project/edit-task.vue'));
Vue.component('add-questions', require('./project/add-questions.vue'));
Vue.component('add-locations', require('./project/add-locations.vue'));
Vue.component('campaign-builder', require('./project/campaign-builder.vue'));
/*
 Teams components 
*/
Vue.component('teams', require('./teams/teams.vue'));
Vue.component('teams-table', require('./teams/teams-table.vue'));
Vue.component('teams-users-table', require('./teams/teams-users-table.vue'));
Vue.component('teams-add-users', require('./teams/teams-add-users.vue'));
Vue.component('teams-add-team', require('./teams/teams-add-team.vue'));
Vue.component('teams-table-componenets', require('./teams/teams-table-componenets.vue'));
Vue.component('teams-users-table-components', require('./teams/teams-users-table-components.vue'));
/*
 Locations components
*/
Vue.component('locations', require('./locations/locations.vue'));
Vue.component('locations-table', require('./locations/locations-table.vue'));
Vue.component('locations-form', require('./locations/locations-form.vue'));
/*
 Companies components
*/
Vue.component('companies', require('./companies/companies.vue'));
Vue.component('companies-table', require('./companies/companies-table.vue'));
Vue.component('companies-form', require('./companies/companies-form.vue'));
/*
 Report componenets
*/
Vue.component('campaign-report', require('./report/campaign-report.vue'));
Vue.component('submission-edit', require('./report/submission-edit.vue'));
Vue.component('submission-view', require('./report/submission-view.vue'));
Vue.component('report-overview', require('./report/report-overview.vue'));
Vue.component('report-locations', require('./report/report-locations.vue'));
Vue.component('report-alerts', require('./report/report-alerts.vue'));
Vue.component('report-data', require('./report/report-data.vue'));
Vue.component('alerts-form', require('./alerts/alerts-form.vue'));
Vue.component('delete-tasks', require('./report/delete-tasks.vue'));
Vue.component('edit-tasks', require('./report/edit-tasks.vue'));
/*
 Report internal question componenets
*/
Vue.component('question-doughnut', require('./report/question-doughnut.vue'));
Vue.component('question-feedback', require('./report/question-feedback.vue'));
Vue.component('question-horizontal-bar', require('./report/question-horizontal-bar.vue'));
Vue.component('question-photos', require('./report/question-photos.vue'));
Vue.component('question-count', require('./report/question-count.vue'));
Vue.component('question-star-rating', require('./report/question-star-rating.vue'));
const app = new Vue({
    el: '#app'
});