 <template>
 <!-- Header -->
 <header class="main-header clearfix">
 <div class="row">
 <div class="col-sm-6"><a href="javascript:void(0)" @click="loadPage()" class="logo_sec">        
 <span class="logo"><img src="./../../assets/images/dms_logo.png" class="img-responsive"></span>
 <span class="logo_name" >Smart DMS - {{company}}</span></a> </div>
 <div class="col-sm-6 text-right">
 <ul class="nav nav-pills pull-right">
 <li v-if="ifDevice" :class="{'dropdown one_ani disabled' : ifDevice, 'dropdown one_ani' : !ifDevice }"><a href="javascript:void(0)" v-bind:title="titleTool.refresh" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="img-icon-benq-1 icon-7"></i></a></li>
 <li v-if="!ifDevice" :class="{'dropdown one_ani disabled' : ifDevice, 'dropdown one_ani' : !ifDevice }" @click="emitOnRefresh()"><a href="javascript:void(0)" v-bind:title="titleTool.refresh" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="img-icon-benq-1 icon-7"></i></a></li>
 <li role="presentation" :class="{'dropdown second_ani first_animation' : ifDevice, 'dropdown second_ani' : !ifDevice }"> <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-bind:title="titleTool.add" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"> <i class="img-icon-benq-1 icon-8"></i> <!--<span class="caret"></span>--> </a>
 <ul class="dropdown-menu">
 <li v-if="ifDevice"><a href="javascript:void(0)" :class="{'deactivate disabled' : ifDevice}">Add Group</a></li>
 <li v-if="!ifDevice"><a href="javascript:void(0)" @click="Newgroup('openModal')" :class="{'deactivate disabled' : ifDevice}">Add Group</a></li>
 <li><a href="javascript:void(0)" @click="Newdevice('openModal')">Add Device</a></li>
 <!-- <li><a href="javascript:void(0)" @click="AddApp()">Add Application</a></li> -->
 </ul>
 </li>
 <li role="presentation" :class="{'dropdown third_ani first_animation' : ifDevice, 'dropdown third_ani' : !ifDevice }"> <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-bind:title="titleTool.settings" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"> <i class="img-icon-benq-1 icon-9"></i> <!--<span class="caret"></span>--> </a>
 <ul class="dropdown-menu">
 <li v-if="ifDevice"><a href="javascript:void(0)" :class="{'deactivate disabled' : ifDevice}">Status & Log</a></li>
 <li v-if="!ifDevice"><a href="javascript:void(0)" :class="{'deactivate disabled' : ifDevice}" @click="StatusLog()">Status & Log</a></li>
 <li><a href="javascript:void(0)" @click="GoToSoftwareMang()">Software Management</a></li>
 <!-- <li><a href="javascript:void(0)" @click="GoToSoftwareMang()">TEST Software Management</a></li> -->
 <li><a href="https://iamtest.benq.com/account">User account management </a></li>
 </ul>
 </li>
 <li role="presentation" class="dropdown"> <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" v-bind:title="titleTool.account" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"> {{name.name}}<span class="caret"></span> </a>
 <ul class="dropdown-menu">
 <li><a href="https://iamtest.benq.com/account">Edit account</a></li>
 <li><a href="https://iamtest.benq.com/account">Change Password</a></li>
 <li><a href="javascript:void(0)" @click="Logout()">Logout</a></li>
 </ul>
 </li>
 </ul>
 </div>

 
 <div class="modal-addGroup">
 <modal name="add-group">
 <header class="modal-header">
 <slot name="header">
 <h4>Create New Group
 <button type="button" class="btn btn-close" @click="close('add-group')"><i class="fa fa-times"></i></button></h4>
 </slot>
 </header>
 <section class="modal-body">
 <slot name="body">
 <label>Please enter the name of the new group.</label>
 <input name="name" v-model="grpname"  type="text" class="form-control">
 </slot>
 </section>
 <footer class="modal-footer">
 <slot name="footer">
 <button type="button" class="btn-success btn" @click="Newgroup('addGroup')">Add</button>
 <button type="button" class="btn-default btn" @click="close('add-group')">Cancel</button>
 </slot>
 </footer>
 </modal>
 <modal name="add-device">
 <header class="modal-header">
 <slot name="header">
 <h4>Create New Device
 <button type="button" class="btn btn-close" @click="close('add-device')"><i class="fa fa-times"></i></button>
 </h4>  </slot>
 </header>
 <section class="modal-body">
 <slot name="body">
 <label>Please enter the name of the new device.</label>
 <input name="name" v-model="grpname"  type="text" class="form-control">
 </slot>
 </section>
 <footer class="modal-footer">
 <slot name="footer">
 <button type="button" class="btn-success btn" @click="Newdevice('addDevice')">Add</button>
 <button type="button" class="btn-default btn" @click="close('add-device')">Cancel</button>
 </slot>
 </footer>
 </modal>
 <modal name="display-log-status" class="statusLog">
 <header class="modal-header">
 <slot name="header">
 <h4>Operation Log
 <!-- <button type="button" class="btn btn-close" @click="close('display-log-status')"><i class="fa fa-times"></i></button> -->
 </h4>  </slot>
 </header>
 <section class="modal-body" style="min-height: 200px;">
 <slot name="body">
 <p v-for="(list, val) in statusLog" v-bind:key="val">{{list}}</p>
 </slot>
 </section>
 <footer class="modal-footer btn-center-all ">
 <slot name="footer">
 <button type="button" class="btn-default btn pull-right " @click="close('display-log-status')">Ok</button>
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
 import leftSideBar from './LeftSideBar.vue'
 import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
 import { EventBus } from './../EventBus/event-bus.js'
 // import ContextMenus from './Custom/ContextMenu.vue'
 export default {
 props: ['name','company'],
 name: 'Header',
 data () {
 return {
 ifDevice: leftSideBar.data().ifDevice,
 statusLog: this.$store.state.StatusLog,
 msg: 'Welcome to Your Vue.js App',
 grpname: 'Group',
 titleTool: {}
 }
 },
 components: {
 PulseLoader,leftSideBar
 },
 created: function () {
 let THIS = this
 setTimeout(function(){
 console.log('Yes')
 THIS.ifDevice = THIS.checkIfDevice()
 console.log('StatusHeader',THIS.ifDevice)
 },1000)
 EventBus.$on('DeviceIsDeleted', clickCount => {
 setTimeout(function(){
 THIS.ifDevice = THIS.checkIfDevice()
 console.log('StatusHeader',THIS.ifDevice)
 },1000)
 })
 EventBus.$on('CallForAddDeviceOrGroup', callFor => {
                if(callFor == 1){
                this.Newgroup()
                } else {
                this.Newdevice()
                }
			})
 },
 methods: {
    loadPage: function(){
        location.reload();
    },
 AddApp: function() {
     EventBus.$emit('AllAddAppInSoftware' , '1');
 },
 GoToSoftwareMang : function(){
    let routeData = this.$router.resolve({name: '/', query: {token: window.localStorage.getItem('token'),account_id:window.localStorage.getItem('account_id'),software: true}});
    window.open(routeData.href, '_blank');
    // this.$store.commit('SoftwareMang', {'action':true})
   //EventBus.$emit('applicationPopUp', 'fromDevice');
 },  
 checkIfDevice: function () {
 console.log('Its RUN',Object.keys(this.$store.state.Device).length)
 let a = false
 if(Object.keys(this.$store.state.Device).length){
 let fullVal = this.$store.state.Device
 Object.keys(this.$store.state.Device).forEach(function(key, val){
 if(fullVal[key][0]){
 console.log('IfTrue',fullVal[key][0])
 a = true
 }
 })
 }
 if(Object.keys(this.$store.state.L2).length >= 2){
 a = true
 }

 if(a){
 // this.ifDevice = false
 return false
 } else {
 // this.ifDevice = true
 return true
 }
 // this.ifDevice = false
 },
 StatusLog () {
 this.$modal.show('display-log-status')
 },
 Logout () {
 this.$store.commit('Logout', {})
 },
 callContextFunction () {
 this.$refs.call.Newdevice()
 },
 emitOnRefresh () {
 this.$emit('Refresh', 'clicked on Refresh')
 this.$store.commit('AddDataIntoTable', {})
 },
 Newgroup (check) {
     // Leave Software Mang.
     this.$store.state.Setting.IsShowSoftwareMang = false;
     this.$store.commit('SoftwareMang', {'action':false})
 EventBus.$emit('communicateAllChildToChildAddNewGroup', '0')
 return true
 if (check === 'openModal') {
 this.$modal.show('add-group')
 } else {
 let GetComp_Id = this.$store.state.L1
 let key1 
 Object.keys(GetComp_Id).forEach(function(val, key){
 if (key === 0) {
 key1 = val
 }
 })
 let level = 'L1'
 let parent = this.$store.state.L1[key1].company_id
 let check = this.CheckKey(this.grpname)
 // 10 means false 11 means true
 if (check === 10) {
 this.$store.commit('addStore', {level: level, display_name: this.grpname, parentnode: parent})
 this.$modal.hide('add-group')
 } else {
 this.$modal.hide('add-group')
 this.$modal.show('dialog', {
 title: 'Duplicate Name',
 input: '',
 text: 'The entered name is already in use.Please use a different one instead.',
 buttons: [
 {
 title: 'Ok',
 handler: () => {
 this.$modal.hide('dialog')
 }
 }
 ]
 })
 }
 }
 },
 Newdevice (check) {
     // Leave Software Mang.
     this.$store.commit('SoftwareMang', {'action':false})
     this.$store.state.Setting.IsShowSoftwareMang = false;
 EventBus.$emit('communicateAllChildToChildAddNewDevice', '0')
 return true
 if(check === 'openModal') {
 this.$modal.show('add-device')
 } else {
 let parentkey = 'uncategories'
 let check = this.CheckDevice(this.grpname)
 // 10 means false 11 means true
 if (check === 10) {
 this.$store.commit('addDevice', {
 parentkey: parentkey,
 name: this.grpname
 })
 this.$modal.hide('add-device')
 } else {
 this.$modal.hide('add-device')
 this.$modal.show('dialog', {
 title: 'Duplicate Name',
 input: '',
 text: 'The entered name is already in use.Please use a different one instead.',
 buttons: [
 {
 title: 'Ok',
 handler: () => {
 this.$modal.hide('dialog')
 }
 }
 ]
 })
 }
 }
 },
 CheckDevice (namekey) {
 var check = 10
 let dataList = Object.values(this.$store.state.Device)
 dataList.forEach(element => {
 let levelList = Object.values(element)
 levelList.forEach(res => {
 if (namekey === res.name) {
 check = 11
 }
 })
 })
 return check
 },
 CheckKey (namekey) {
 var check = 10
 let dataList = Object.values(this.$store.state)
 dataList.forEach(element => {
 let levelList = Object.values(element)
 levelList.forEach(res => {
 if (namekey === res.name) {
 check = 11
 }
 })
 })
 return check
 },
 close (modelName) {
 this.$modal.hide(modelName)
 }
 },
 mounted () {
 this.titleTool = this.$store.state.Setting.toolTipTitle
 // console.log(this.titleTool)

 //For main panel layput resize
       setTimeout(() => {
       $('#also').css('display','none');
       }, 10);
        // $('.lftbar').show();
        // $('.centerBar').width('100%');
        // $('.contextMenu').hide();
        // $('.main-right-sidebar').attr('style','max-width:100% !important;');
        $( function() {
            //var sideIn = $('#also').width();
            var mainSideBar = $('.main-right-sidebar').width();
            $( ".main-right-sidebar" ).resizable({
                handles: 'w',
                maxWidth: 1200,
                resize: function( event, ui ) {
                    if(ui.size.width <= 550){
                        $('.device_block, .filex-row').addClass('Custom_Class_while_resize');
                    }else{
                        $('.device_block, .filex-row').removeClass('Custom_Class_while_resize');
                    }
                    var currentTab = $('.main-right-sidebar .nav-tabs li.active').attr('data-tab');
                    $('.tab-pane').removeClass('current');
                    $('#' + currentTab).addClass('current');
		            //$('.lftbar').removeClass('sidebar-active');
                    //rightSidebarToggle();
                }
            });
        });

        function leftSidebarToggle() {
            $('.lftbar').toggleClass('sidebar-active');
            $('.left-sidebar-toggle').find('.nav-icon').toggleClass('icon-forward');
        }

        $(".left-sidebar-toggle").click(function() {
            leftSidebarToggle();
        });

        function rightSidebarToggle() {
            $('.main-right-sidebar').toggleClass('rightsidebar-active');
            $('.right-sidebar-toggle').find('.icon-right').toggleClass('icon-5-riverse');
        }

        $(".right-sidebar-toggle").click(function() {
            rightSidebarToggle();
            if($('.main-right-sidebar').hasClass('rightsidebar-active')){
              $('.lftbar').removeClass('sidebar-active');
            }else{
              $('.lftbar').addClass('sidebar-active');
            }
            $('.main-right-sidebar').css({
                'width': '',
                'left': ''
            })
            if ( $('.tab-content .tab-pane').hasClass('current')) {
                $('.tab-content .tab-pane').removeClass('current');
            } else {            
                $('.tab-content .tab-pane:first-child').addClass('current');
            }

            var currentTab = $('.main-right-sidebar .nav-tabs li.active').attr('data-tab');
            if ( $('.main-right-sidebar').hasClass('rightsidebar-active')) {
                $('.tab-pane').removeClass('current');
                $('#' + currentTab).addClass('current');
            }
  
        });

        $('.main-right-sidebar .nav-tabs li').click(function() {
            $('.main-right-sidebar').addClass('rightsidebar-active');
            $('.right-sidebar-toggle').find('.glyphicon').addClass('glyphicon-forward');
            $('.lftbar').removeClass('sidebar-active');
            var tab_id = $(this).attr('data-tab');
            $('.tab-pane').removeClass('current');
            $('#' + tab_id).addClass('current');
        });
        


        const lftbar = $('.lftbar').width();
        const width = $('.centerBar').width();
        const r = $('.main-right-sidebar');
        $(".lftbar" ).resizable({
            minWidth: 200,
            maxWidth: 300,
            resize: function( event, ui ) {
                let diff = lftbar - ui.size.width
                $('.centerBar').width(parseInt(width)+parseInt(diff))
                //  $('#resizable').attr('style','max-width:1200px');
            }
       });
        $(".right-sidebar-toggleForTab").click(function () {
            if($(this).hasClass('MoreThenone')){
                alert('Please select only one device from table');
                return true;
            }
            if($(this).hasClass('right-sidebar-toggleCL')){
                alert('Please Select any Device');
                return true;
            }          
           
        });
       $(".right-sidebar-toggle").click(function () {
            if($(this).hasClass('MoreThenone')){
                alert('Please select only one device from table');
                return true;
            }
            if($(this).hasClass('right-sidebar-toggleCL')){
                alert('Please Select any Device');
                return true;
            }
        });
        $(function(){
          $('[data-toggle="tooltip"]').tooltip();
          $(".side-nav .collapse").on("hide.bs.collapse", function() {                   
              $(this).prev().find(".fa").eq(1).removeClass("fa-angle-right").addClass("fa-angle-down");
          });
          $('.side-nav .collapse').on("show.bs.collapse", function() {                        
              $(this).prev().find(".fa").eq(1).removeClass("fa-angle-down").addClass("fa-angle-right");        
          });
        }) 

       
 },
 ready () {
 this.titleTool = this.$store.state.Setting.toolTipTitle
 }
 }
 </script>
 <style>
 .statusLog.v--modal-overlay .v--modal .modal-body{
 max-height: 300px !important;
 overflow-y: scroll;
 height: auto !important;
 }
 .deactivate {
    background: #ccc !important;
    color: black !important;
    cursor: not-allowed;
}
 .deactivate:hover a{
    background: #ccc !important;
    color: black !important;
    cursor: not-allowed;
}
.main-right-sidebar .tab-pane {
  display: none;
}
.main-right-sidebar .tab-pane.current {
  display: block;
  width:600px!important;    
}
</style>