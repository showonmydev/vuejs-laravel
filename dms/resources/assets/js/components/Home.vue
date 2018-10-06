<template>
<!-- v-on:click.left.prevent="ContextMenuDismissFunction" -->
<div class="Dashboard" @mousedown="ContextMenuDismissFunction1">
    <div class="hide customRefresh" @click="CustomRefresh()"></div>
    <div v-if="$store.state.Setting.IsShowSoftwareMang" class="wrapper" style="height: auto; min-height: 100%;">
        <SoftwareHeader company="Katpro" :name="this.$store.state.Setting.userInfo" @Refresh="emitRefreshClickEvent"></SoftwareHeader>
        <loading :active.sync="isLoading" :can-cancel="false" :style="{top: styleObject}"></loading>
        <div class="row_sec">
            <!-- Here is the Software Management Componenet -->
            <AppManager></AppManager>
        </div>
    </div>
    <div v-if="!$store.state.Setting.IsShowSoftwareMang" class="wrapper" style="height: auto; min-height: 100%;">
        <Header company="Katpro" :name="this.$store.state.Setting.userInfo" @Refresh="emitRefreshClickEvent"></Header>
        <!-- <SoftwareHeader v-if="$store.state.Setting.IsShowSoftwareMang" company="Katpro" :name="this.$store.state.Setting.userInfo" @Refresh="emitRefreshClickEvent"></SoftwareHeader> -->
        <loading :active.sync="isLoading" :can-cancel="false" :style="{top: styleObject}"></loading>
        <div class="row_sec">
        <!-- Here is the Software Management Componenet -->
        <!-- <AppManager v-if="$store.state.Setting.IsShowSoftwareMang"></AppManager> -->
        <!--Here is maincontainer and rightsidebar wrap into single div-->
        <div class="WrapTo">
        	<!-- <div>
            	<AppManager></AppManager>
        	</div> -->
        <div class="lftbar sidebar-active" v-on:click.right.prevent="ContextMenuFunction" v-on:click.left.prevent="ContextMenuDismissFunction">
        <LeftSideBar :name="this.$store.state.Setting.userInfo" :clickTarget="targetclick" @emitLeftSideBarClick="emitLeftSideBarClickEvent"></LeftSideBar>
        </div>
        <div class="centerBar" v-on:click.right.prevent="ContextMenuFunctionForTable" v-on:click.left.prevent="ContextMenuDismissFunction">
        <MainContainer :clickTarget="targetclick" :tablegroup="tablegroup" :tablegroupid="groupid" @emitTableRowClick="emitTableRowClickEvent"></MainContainer>
        </div>
        <div v-on:click.right.prevent="ContextMenuFunctionForRightSideBar" v-on:click="ContextMenuDismissFunction">
        <RightSideBar :TableRowData="rightSidebar"></RightSideBar>
        </div>
        </div>
        <!--END Here is maincontainer and rightsidebar wrap into single div-->
        </div>
    </div>

<ContextMenu :StyleContext="context" :ActionData="contextData" :clickTarget="targetclick" :contextDisplaySetting="contextSetting"></ContextMenu>
<!--Connection lost modal-->
 <modal name="server-connection-lost">
 <header class="modal-header">
 <slot name="header"><h4>Server Connection Lost</h4></slot>
 </header>
 <section class="modal-body">
     <slot name="body">  
        <div class="form-group">
            <p>Connection to server lost due to unknown reason.
            Please try to start the program again.</p>
        </div>     
     </slot>
 </section>
 <footer class="modal-footer">
 <slot name="footer">
 <button type="button" class="btn-success btn">OK</button>
 </slot>
 </footer>
 </modal>
 <!--end-->
 <!-- <AppManager></AppManager> -->
</div>
</template>
<style src="./../assets/css/style.css"></style>
<script src="./../jquery-resizable-custom.js"></script>
<script>
// Import component
import Loading from 'vue-loading-overlay';
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.min.css';
import Header from './Layout/Header.vue'
import LeftSideBar from './Layout/LeftSideBar.vue'
import MainContainer from './Layout/MainContainer.vue'
import RightSideBar from './Layout/RightSideBar.vue'
import ContextMenu from './Layout/Custom/ContextMenu.vue'
import AppManager from './Layout/ApplicationContainer'
import SoftwareHeader from './Layout/SoftwareHeader'
import axios from 'axios'
import $ from 'jquery'
import { EventBus } from './EventBus/event-bus.js'

export default {
name: 'Home',
data () {
return {
isLoading: false,
contextData: {},
context: {'display': '', 'left': '', 'top': ''},
contextSetting: {'ExpandCollapse': true, 'ShowHideColumn': false, 'Expand': false, 'Newdevice': true, 'Newgroup': true, 'Rename': false, 'Delete': false, 'ExpandAll': false, 'CollapseAll': false, 'Nop':false, 'Edit':false,'Uninstall':false},
targetclick: {},
tablegroup: '',
groupid: '',
rightSidebar: [],
msg: 'Welcome to Your Vue.js App',
styleObject: '',
}
},
components: {
Loading,
Header,
LeftSideBar,
MainContainer,
RightSideBar,
ContextMenu,
AppManager,
SoftwareHeader
},
// computed:{
//     count: function() {
//         let count = this.$store.state.Setting.noRowSelected
//         if(count == 1){
//             console.log('Yes In')
//             $('.centerBar').width('74%')
//         }else{
//             console.log('Yes In Out')
//             $('.centerBar').width('80%')
//         }
//         return true;
//     }
// },
created: function () {
     // Using the service bus
     EventBus.$on('applicationPopUp', (page) => {
      this.$modal.show("list-application");  
     });
  },
methods: {
    serverConnectionLost: function(){
    //var self = this;
    // shall be used while checking token expiration
    
    setInterval(function(){
        self.token = window.localStorage.getItem('token');
        axios.post(API_URL+'device/checkToken',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ self.token
            },
            token : self.token,         
        }).then(function (data) {           
            console.log('successfull');
        }).catch(function (error) {
            if(error.response['status'] == 405 || error.response['status'] == 401){
                console.log('Server connection lost');
                // self.$modal.show("server-connection-lost");
                location.reload();
            }
        });
    },12000);
},
ContextMenuFunction (event) {
//console.log('INFO')
let targetElement
if (!event.target.dataset.type) {
targetElement = $(event.target).parents('span')[0].dataset
} else if (event.target) {
targetElement = event.target.dataset
}
// let parent_type=$(event.target).parents('span')[0];
// console.log(parent_type.dataset.type)
// console.log($(event).parents('li'))
// console.log('Its ME')

let windowHeight = $('body').height()
let contextHeight = $('.contextMenu').width()
let diff = parseInt(windowHeight) - parseInt(event.clientY)
if(diff < contextHeight) {
// console.log('TRUE')
this.context.left = event.clientX + 'px'
this.context.top = parseInt(event.clientY) - parseInt(contextHeight + 110) + 'px'
}else {
// console.log('FALSE')
this.context.left = event.clientX + 'px'
this.context.top = event.clientY + 'px'
}
this.context.display = 'block'
this.targetclick = event
// console.log('Its Here')
// console.log(targetElement)
// console.log('Its ME')
if (targetElement.parent === 'all' && targetElement.type === 'group') {
this.contextSetting.ExpandCollapse = true
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = false
this.contextSetting.Newgroup = true
this.contextSetting.Rename = false
this.contextSetting.Delete = false
this.contextSetting.Newdevice = false
this.contextSetting.Edit = false
this.contextSetting.Uninstall = false
this.contextSetting.Nop = true
this.contextData = {'data': targetElement}
return false
}
if (targetElement.display === 'Uncategorized' && targetElement.type === 'group') {
this.contextSetting.ExpandCollapse = true
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = false
this.contextSetting.Newgroup = false
this.contextSetting.Rename = false
this.contextSetting.Delete = false
this.contextSetting.Newdevice = true
this.contextSetting.Edit = false
this.contextSetting.Uninstall = false
this.contextSetting.Nop = true
this.contextData = {'data': targetElement}
return false
}
if (targetElement.type === 'group') {
/* Here is the setting when user click on group I have display some extra context menu */
this.contextSetting.ExpandCollapse = true
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = true
this.contextSetting.Newgroup = true
this.contextSetting.Rename = true
this.contextSetting.Delete = true
this.contextSetting.Edit = false
this.contextSetting.Uninstall = false
this.contextSetting.Nop = true
this.contextData = {'data': targetElement}
return false
}
if (targetElement.type === 'device') {
/* Here is the setting when user click on group I have display some extra context menu */
this.contextSetting.ExpandCollapse = false
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = true
this.contextSetting.Newgroup = false
this.contextSetting.Rename = true
this.contextSetting.Delete = true
this.contextSetting.Edit = false
this.contextSetting.Uninstall = false
this.contextSetting.Nop = true
this.contextData = {'data': targetElement}
return false
}
/* Here is the setting when user click on group I have display some extra context menu */
// this.contextSetting.ShowHideColumn = false
// this.contextSetting.Newdevice = false
// this.contextSetting.Newgroup = false
// this.contextSetting.Rename = false
// this.contextSetting.Delete = false
// this.contextData = {'data': event.target.dataset}
// return false
},
ContextMenuFunctionForTable (event) {
console.log(event)
this.context.left = event.clientX + 'px'
this.context.top = event.clientY + 'px'
this.context.display = 'block'
this.contextSetting.ShowHideColumn = true
this.contextSetting.Newdevice = false
this.contextSetting.Newgroup = false
this.contextSetting.Rename = false
this.contextSetting.Delete = false
this.contextSetting.Edit = false
this.contextSetting.Uninstall = false
this.contextSetting.ExpandCollapse = false
this.contextSetting.Nop = true
return false
},
ContextMenuFunctionForRightSideBar (event) {
    console.log(event)
    console.log(event.path[4]);
    if(event.path[4].classList[1] != "software_upgrade_table"){
        return true;
    }
    
        console.log($(event).find('td').addClass('active'));

    this.context.left = event.clientX + 'px'
    this.context.top = event.clientY + 'px'
    this.context.display = 'block'
    this.contextSetting.ShowHideColumn = true
    this.contextSetting.Newdevice = false
    this.contextSetting.Newgroup = false
    this.contextSetting.Rename = false
    this.contextSetting.Delete = false
    this.contextSetting.Edit = true
    this.contextSetting.Uninstall = true
    this.contextSetting.Expand = false

    this.contextSetting.Nop = false

    return false
},
ContextMenuDismissFunction (event) {
this.targetclick = event
this.context.display = 'none'
return false
},
ContextMenuDismissFunction1 (event) {
this.targetclick = event
},
emitRefreshClickEvent (value) {
let THIS = this
THIS.isLoading = !THIS.isLoading
if(THIS.isLoading){
    this.$store.state.Setting.toolTipTitle.refresh = 'Stop refreshing'
}else{
    this.$store.state.Setting.toolTipTitle.refresh = 'Refresh'
}
setTimeout(function(){
THIS.$store.commit('SyncData', {
_token: 'gsdgfsfdjgjhfdsghgjh'
})
//console.log('Is STOP')
THIS.isLoading = false
},2000)
},
CustomRefresh () {
let THIS = this
THIS.$store.commit('SyncData', {
_token: 'gsdgfsfdjgjhfdsghgjh'
});
},
emitLeftSideBarClickEvent (groupname, keyname) {
this.tablegroup = groupname
// this.groupid = keyname
},
emitTableRowClickEvent (tableclickdata) {
if (tableclickdata.length !== 0) {
this.rightSidebar = tableclickdata[tableclickdata.length - 1]
} else {
this.rightSidebar = {'Deviceinfo': '', 'Status': ''}
}
}
},
mounted () {
    this.serverConnectionLost();
    this.$store.commit('SyncData', {
    _token: 'gsdgfsfdjgjhfdsghgjh'
    });
    this.styleObject =  $('header.main-header').outerHeight()+5+'px';
    document.body.addEventListener('keyup', e => {
          if (e.keyCode === 27) {
            this.$modal.hide("list-application");
          }
    });
}
}
</script>
<style>
body {
    overflow-x:hidden !important;
    overflow-y: scroll !important;
}
.WrapTo {
  display: flex;
  flex-direction: row;
  /* overflow: scroll; */
  /* avoid browser level touch actions */
  xtouch-action: none;
}
.loading-overlay .loading-background {
        background: #000000 !important;
        opacity: .6 !important;
}
.loading-overlay .loading-icon:before {
    margin-top: 50px;
    content: "tap Refresh again to stop";
    position: absolute;
    font-size: 20px;
    display: inline-block;
    transform: translate(-50%,0%);
    color: #fff;
}
.loading-overlay .loading-icon {
    text-align: center;
    width: 100%;
}
.loading-overlay .loading-icon:after {
    border: 2px solid #fff;
    border-right-color: transparent;
    border-top-color: transparent;
}
</style>
