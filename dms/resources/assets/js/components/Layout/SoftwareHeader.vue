 <template>
 <!-- Header -->
 <header class="main-header clearfix">
 <div class="row">
 <div class="col-sm-6">
  <a href="javascript:void(0)" @click="loadPage()" class="logo_sec">        
  <span class="logo">
    <img src="./../../assets/images/Benq_logo.png" class="img-responsive">
  </span>
   <span class="logo_name" >Smart DMS - Software Management</span>
  </a>
</div>
 <div class="col-sm-6 text-right">
 <ul class="nav nav-pills pull-right">
 <li class="" @click="emitOnRefresh()">
  <a href="javascript:void(0)" v-bind:title="titleTool.refresh" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }">
    <span class="webIcon refreshIcon"></span>
  </a>
</li>

 <li role="presentation"> 
  <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-bind:title="titleTool.softwareAdd" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }">
    <span class="webIcon addAppIcon"></span>
  </a>
 <ul class="dropdown-menu">
    <li>
      <a href="javascript:void(0)" @click="ListApplication('openModal')">List Application</a>
    <li>
      <a href="javascript:void(0)" @click="NewApplication('openModal')">Add Application</a>
    </li>
 </ul>
 </li>
 <li >
  <a href="javascript:void(0)" @click="appStatusLog()" v-bind:title="titleTool.statusLog" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }">
  <i class="fa fa-file">
  </i>
  </a>
</li>
 <li role="presentation" class="dropdown">
  <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-bind:title="titleTool.account" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }">{{name.name}}<span class="caret"></span> 
  </a>
 <ul class="dropdown-menu">
 <li><a href="javascript:void(0)">Edit account</a></li>
 <li><a href="https://service-portaltest.benq.com/profileinfoto">View Personal Information</a></li>
 <li><a href="javascript:void(0)">Change Password</a></li>
 <li><a href="javascript:void(0)" @click="Logout()">Logout</a></li>
 </ul>
 </li>
 </ul>
 </div>
 <div class="modals">
   <modal name="display-app-log-status" class="statusLog"  id="statusLogModal">
     <header class="modal-header">
     <slot name="header">
     <h4>Status & Log
     <button type="button" class="btn btn-close pull-right" @click="close('display-app-log-status')"><i class="fa fa-times"></i></button>
     </h4>  </slot>
     </header>
     <section class="modal-body">
     <slot name="body">
     <p v-for="(list, val) in statusLog" v-bind:key="val">{{list}}</p>
     </slot>
     </section>
     <footer class="modal-footer">
     <slot name="footer">
     <button type="button" class="btn-default btn btn-center-all" @click="close('display-app-log-status')">Ok</button>
     </slot>
     </footer> 
   </modal>

 </div>
 </div>
 <!-- <ContextMenus ref="call"></ContextMenus> -->
 </header>
 <!-- End Header -->
 </template>
 <script>

import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { EventBus } from "./../EventBus/event-bus.js";
// import ContextMenus from './Custom/ContextMenu.vue'
export default {
  props: ["name", "company"],
  name: "SoftwareHeader",
  data() {
    return {
     // ifDevice: leftSideBar.data().ifDevice,
      statusLog: this.$store.state.StatusLog,
      msg: "Welcome to Your Vue.js App",
      grpname: "Group",
      titleTool: {},
      //statusLog:{}
    };
  },
  components: {
    PulseLoader
  },
  created: function() {
    let THIS = this;
    EventBus.$on("AllAddAppInSoftware", clickCount => {
        this.$store.commit('SoftwareMang', {'action':true})
        this.NewApplication('openModal')
        this.ListApplication('openModal')
    });
  },
  methods: {
     loadPage: function(){
        location.reload();
    },
GoToDeviceMang : function(){
      this.$store.commit('SoftwareMang', {'action':false})
     //EventBus.$emit('applicationPopUp', 'fromDevice');
    },
    AnotherHeaderFun: function(callFor) {
      //EventBus.$emit('CallForAddDeviceOrGroup', callFor)
    },    
    appStatusLog() {
      this.$modal.show("display-app-log-status");
    },
    Logout() {
      this.$store.commit("Logout", {});
    },
    callContextFunction() {
      this.$refs.call.Newdevice();
    },
    emitOnRefresh() {
      this.$emit('Refresh', 'clicked on Refresh')
      //this.$store.commit('AddDataIntoTable', {})
    },    
    ListApplication(check){
      if (check === "openModal") {
        this.$modal.show("list-application");
      }
     },
    NewApplication(check) {     
      /*EventBus.$emit("communicateAllChildToChildAddNewApplication", "0");
      return true;*/
      if (check === "openModal") {
        this.$modal.show("add-application");
      } else {
        //let parentkey = "uncategories";
        //let check = this.CheckDevice(this.grpname);
        let check = 10;
        // 10 means false 11 means true
        if (check === 10) {
          this.$store.commit("addApplication", {
            parentkey: parentkey,
            name: this.grpname
          });
          this.$modal.hide("add-application");
        } else {
          this.$modal.hide("add-application");
          this.$modal.show("dialog", {
            title: "Duplicate Name",
            input: "",
            text:
              "The entered name is already in use.Please use a different one instead.",
            buttons: [
              {
                title: "Ok",
                handler: () => {
                  this.$modal.hide("dialog");
                }
              }
            ]
          });
        }
      }
    },
    close(modelName) {
      this.$modal.hide(modelName);
    }
  },
  mounted() {
    this.titleTool = this.$store.state.Setting.toolTipTitle;
    // console.log(this.titleTool)
    // this.$modal.show("list-application");
  },
  ready() {
    this.titleTool = this.$store.state.Setting.toolTipTitle;
  }
};
</script>
 <style>
.statusLog.v--modal-overlay .v--modal .modal-body {
  max-height: 300px !important;
  overflow-y: scroll;
  height: auto !important;
}
</style>