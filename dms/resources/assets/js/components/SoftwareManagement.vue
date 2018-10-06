<template>
<div class="Dashboard" @mousedown="ContextMenuDismissFunction1" v-on:click.left.prevent="ContextMenuDismissFunction">
<div class="wrapper" style="height: auto; min-height: 100%;">
<Header company="Katpro" :name="this.$store.state.Setting.userInfo" @Refresh="emitRefreshClickEvent"></Header>
<loading :active.sync="isLoading" :can-cancel="true"></loading>
<AppManager></AppManager>
</div>
<ContextMenu :StyleContext="context" :ActionData="contextData" :clickTarget="targetclick" :contextDisplaySetting="contextSetting"></ContextMenu>
</div>
</template>
<style src="./../assets/css/style.css"></style>
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
import $ from 'jquery'
export default {
name: 'Home',
data () {
return {
isLoading: false,
contextData: {},
context: {'display': '', 'left': '', 'top': ''},
contextSetting: {'ExpandCollapse': true, 'ShowHideColumn': false, 'Expand': false, 'Newdevice': true, 'Newgroup': true, 'Rename': false, 'Delete': false, 'ExpandAll': false, 'CollapseAll': false},
targetclick: {},
tablegroup: '',
groupid: '',
rightSidebar: [],
msg: 'Welcome to Your Vue.js App'
}
},
components: {
Loading,
Header,
LeftSideBar,
MainContainer,
RightSideBar,
ContextMenu,
AppManager
},
methods: {
ContextMenuFunction (event) {
console.log('INFO')
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
if(diff < contextHeight + 110) {
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
console.log('Its Here')
console.log(targetElement)
console.log('Its ME')
if (targetElement.parent === 'all' && targetElement.type === 'group') {
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = false
this.contextSetting.Newgroup = true
this.contextSetting.Rename = false
this.contextSetting.Delete = false
this.contextSetting.Newdevice = false
this.contextData = {'data': targetElement}
return false
}
if (targetElement.display === 'Uncategorized' && targetElement.type === 'group') {
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = false
this.contextSetting.Newgroup = false
this.contextSetting.Rename = false
this.contextSetting.Delete = false
this.contextSetting.Newdevice = true
this.contextData = {'data': targetElement}
return false
}
if (targetElement.type === 'group') {
/* Here is the setting when user click on group I have display some extra context menu */
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = true
this.contextSetting.Newgroup = true
this.contextSetting.Rename = true
this.contextSetting.Delete = true
this.contextData = {'data': targetElement}
return false
}
if (targetElement.type === 'device') {
/* Here is the setting when user click on group I have display some extra context menu */
this.contextSetting.ShowHideColumn = false
this.contextSetting.Newdevice = true
this.contextSetting.Newgroup = false
this.contextSetting.Rename = true
this.contextSetting.Delete = true
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
THIS.isLoading = true
setTimeout(function(){
THIS.$store.commit('SyncData', {
_token: 'gsdgfsfdjgjhfdsghgjh'
})
console.log('Is STOP')
THIS.isLoading = false
},2000)
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
this.$store.commit('SyncData', {
_token: 'gsdgfsfdjgjhfdsghgjh'
})
}
}
</script>
<style>
.WrapTo {
width:100%
}


#appTable tr.active .table.tooltipTable tr td{
    background: transparent !important; 
}
</style>
