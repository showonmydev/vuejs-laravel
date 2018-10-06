import Vue from 'vue'
import VueRouter from 'vue-router'
import Appp from './Appp'
import Vuex from 'vuex'
import VueTippy from 'vue-tippy'
import Home from './components/Home'
import SoftwareManagement from './components/SoftwareManagement'
import Header from './components/Layout/Header'
import BootstrapVue from 'bootstrap-vue'
import store from './store/index.js'
import VueDraggable from 'vue-draggable'
import VueDragAndDropList from 'vue-drag-and-drop-list'
import VModal from 'vue-js-modal'
import draggable from 'vuedraggable'
import Sortable from 'vue-sortable'
import { Drag, Drop } from 'vue-drag-drop'
//import DatatableFactory from 'vuejs-datatable';
import Lodash from 'lodash'
window.Vue = Vue;
window._ = Lodash;
Vue.component('drag', Drag)
Vue.component('drop', Drop)
Vue.use(Sortable)
Vue.use(draggable)
Vue.use(VueDragAndDropList)
Vue.use(VModal, { dialog: true })
Vue.use(VueDraggable)
Vue.use(BootstrapVue)
Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueTippy)


const router = new VueRouter({
    mode: 'history',
    routes: [ 
        {
            path: '/',
            name: 'Home',
            component: Home
        },      
        {
            path: '/header',
            name: 'Header',
            component: Header
        },
		{
            path: '/Application',
            name: 'Application',
            component: SoftwareManagement
        }
       
    ],
});

// const store = new Vuex.Store({
//     state: {
//       count: 12
//     },
//     mutations: {
//       increment (state) {
//         state.count++
//       }
//     }
//   });

 new Vue({
    el: newFunction(),
    store,
    router,
    components: { Appp },
    template: '<Appp/>'
    
});

function newFunction() {
    return '#app';
}
// new Vue({
//     el: '#app',
//     router,
//     store,
//     components: { App },
//     template: '<App/>'
//   })
