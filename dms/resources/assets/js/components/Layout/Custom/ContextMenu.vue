<template>
<div>
<loading :active.sync="isLoading" :can-cancel="true"></loading>
<div v-bind:style="StyleContext" class="contextMenu">
<a href="javascript:;" v-if="contextDisplaySetting.Nop" v-show='contextDisplaySetting.ShowHideColumn' @click="ShowHideColumn">Show/HideColumn</a>
<!-- <a href="javascript:;" v-if="contextDisplaySetting.Nop" :class="{'disable' : !contextDisplaySetting.ExpandCollapse}" @click="ExpandCollapse">Expand (Collapse)</a> -->
<a href="javascript:;" v-show='contextDisplaySetting.Expand' @click="Expand">Expand (Collapse)</a>
<a href="javascript:;" v-show='contextDisplaySetting.Newdevice' @click="Newdevice">New device</a>
<a href="javascript:;" v-show='contextDisplaySetting.Newgroup'  @click="Newgroup">New group</a>
<a href="javascript:;" v-show='contextDisplaySetting.Rename' @click="Rename('context')">Rename</a>
<a href="javascript:;" v-show='contextDisplaySetting.Delete' @click="Delete">Delete</a>

<a href="javascript:;" v-show='contextDisplaySetting.Edit' @click="Edit">Edit</a>
<a href="javascript:;" v-show='contextDisplaySetting.Uninstall' @click="Uninstall">Uninstall</a>


<!-- <a href="javascript:;" v-show='contextDisplaySetting.Newdevice'>New device</a>
<a href="javascript:;" v-show='contextDisplaySetting.Newgroup'>New group</a>
<a href="javascript:;" v-show='contextDisplaySetting.Rename'>Rename</a>
<a href="javascript:;" v-show='contextDisplaySetting.Delete'>Delete</a> -->

<a href="javascript:;" v-if='!contextDisplaySetting.ShowHideColumn' v-show='this.$store.state.Setting.context' @click="ExpandAll">Expand all</a>
<a href="javascript:;" v-if='!contextDisplaySetting.ShowHideColumn' v-show='!this.$store.state.Setting.context' @click="CollapseAll">Collapse all</a>
</div>
<div class="ContextModel">
<div class="inside-ContextModel">
<modal name="add-new-group">
<header class="modal-header">
<slot name="header">
<h4>Add New Group
<!-- <button type="button" class="btn btn-close" @click="close('add-new-group')"><i class="fa fa-times"></i></button>--></h4> 
</slot>
</header>
<section class="modal-body">
<slot name="body">
<label>Please enter the name of the new group.</label>
<input name="name" v-model="name"  type="text" class="form-control">
</slot>
</section>
<footer class="modal-footer">
<slot name="footer">
<button type="button" class="btn-success btn" @click="Add">Add</button>
<button type="button" class="btn-default btn" @click="close('add-new-group')">Cancel</button>
</slot>
</footer>
</modal>

<modal name="add-new-device-first" class="add-new-device-padding">

<div class="first-modal" v-if="AddDeviceStepVal.first">
<header class="modal-header border-none">
<slot name="header">
<h4>   Add new device
<!-- <button type="button" class="btn btn-close" @click="close('add-new-device-first')"><i class="fa fa-times"></i></button> -->
</h4>  </slot>
</header>
<div class="top_modal"><p style="padding: 20px 0px 0px 30px;"><strong>Pick an add method Please</strong> </p>
<p style="padding-left: 30px;">select a way below for adding new device.</p></div>
<section class="modal-body">
<slot name="body">              
<div class="modle-content">
<!-- <div class="radio">
<div class="checkbox" @click="changeCheckBoxStatus('scan')"><label><input type="checkbox" v-model="optionAddDeviceType.scan" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>Scan new device</label></div>
</div> -->
<div class="radio-dott1">
<div class="checkbox" @click="changeCheckBoxStatus('addViaID')"><label><input type="checkbox" v-model="optionAddDeviceType.addViaID" value=""><span class="cr"><i class="cr-icon radio-dott"></i></span>Add via Unique ID</label></div>
</div>
<div class="radio-dott1">
<div class="checkbox" @click="changeCheckBoxStatus('import')"><label><input type="checkbox" v-model="optionAddDeviceType.import" value=""><span class="cr"><i class="cr-icon radio-dott"></i></span>Import new device from a file</label></div>
</div>
</div>
</slot>
</section>
<footer class="modal-footer border-none">
<slot name="footer">
<button type="button" class="btn-success btn" @click="CheckAddDeviceVia">Next</button>
<button type="button" class="btn-default btn" @click="close('add-new-device-first')">Cancel</button>
</slot>
</footer>
</div>

<div class="secont-modal searching_modal" v-if="AddDeviceStepVal.second">
<header class="modal-header">
<slot name="header">
<h4>   Enter Unique ID
<button type="button" class="btn btn-close" @click="close('add-new-device-first')"><i class="fa fa-times"></i></button>
</h4> 
</slot>
</header>
<section class="modal-body " v-if="!optionAddDeviceType.import">
<slot name="body">
<label>Please enter the Unique ID for searching.</label>
<input name="name" v-model="name"  type="text" class="form-control" maxlength="35" id="searchbyUniqueId">
<p>*It can be found on the device (via Settings/About)</p>
</slot>
</section>

<section class="modal-body text-center browse_CSV" v-if="optionAddDeviceType.import">
<slot name="body">
<!-- <form enctype="multipart/form-data"> -->
<label>Please upload CSV</label>

<input name="file" type="file" class="form-control" ref="file" v-on:change="handleFileUpload()">
<!-- </form> -->
</slot>
</section>

<footer class="modal-footer" v-if="optionAddDeviceType.import">
<slot name="footer">
<button type="button" class="btn-success btn" @click="UploadCSV">Import</button>
<button type="button" class="btn-default btn" @click="close('add-new-device-first')">Cancel</button>
</slot>
</footer>

<footer class="modal-footer" v-if="!optionAddDeviceType.import">
<slot name="footer">
<button type="button" class="btn-success btn" @click="SearchDevice">Search</button>
<button type="button" class="btn-default btn" @click="close('add-new-device-first')">Cancel</button>
</slot>
</footer>
</div>

<div class="third-modal table_grid_modal" v-if="AddDeviceStepVal.search">
<header class="modal-header">
<slot name="header">
<h4>  <div v-if="!error"> Add New Device <button type="button" class="btn btn-close" @click="close('add-new-device-first')"><i class="fa fa-times"></i></button></div> 

</h4>  </slot>
</header>
<div v-if="!SearchDeviceData" class="top_modal text-center"><p><strong>Searching for device</strong> </p>
<p>Please wait...</p></div>
<div v-if="SearchDeviceData" class="top_modal text-center"><p><strong>Selected devices to be added</strong> </p>
<p>Checked devices will be added. Modify Name/Description fields if needed.</p></div>
<section class="modal-body">
<div v-if="!SearchDeviceData" class="loader_div"><img src="/images/loading.gif" alt="searching...."></div>
<table class="table searching-table-grid">
<thead>
<tr>
<th scope="col">
<th scope="col">Serial Number</th>
<th scope="col">Model Name</th>
<th scope="col">Name</th>
<th scope="col">Description</th>
</tr>
</thead>
<tbody>
<tr v-if="deviceFound">
	<td colspan="5">
		<center>Device not found</center>
	</td>
</tr>
<tr v-if="SearchDeviceData" v-for="(list1, key1) in SearchDeviceData" v-bind:key="key1">
<td><div class="checkbox"><label @click="updateTableCheck1('A'+key1+1)"><input type="checkbox" style="display:none" v-model="forCheckBox['A'+key1+1]" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div></td>
<td>{{list1.bdid}}</td>
<td>{{list1.model}}</td>
<td><input type="text" v-model=list1.name></td>
<td><input type="text"  v-model=list1.description></td>
</tr>
</tbody>
</table>
</section>
<footer class="modal-footer text-right">
<slot name="footer">
<button type="button" class="btn-success btn" @click="backSearchList">Back</button>
<button v-if="checkIfaddDeviceCheck"  type="button" class="btn-success btn" @click="AddDevice">Add</button>
<button v-if="!checkIfaddDeviceCheck"  disabled type="button" class="btn-success btn" @click="AddDevice">Add</button>
<button type="button" class="btn-default btn" @click="close('add-new-device-first')">Cancel</button>
</slot>
</footer>
</div>

<div class="third-modal" v-if="AddDeviceStepVal.third">
<header class="modal-header">
<slot name="header">
<h4>  <div class="pull-left" v-if="!error"> Success / Add More </div> <div v-if="error">Error / Add More <button type="button" class="btn btn-close" @click="close('add-new-device-first')"><i class="fa fa-times"></i></button></div>

</h4>  </slot>
</header>
<section class="modal-body" v-if="!error">
<slot name="body">
<label>{{name}} has been added successfully</label>
<label>Would you like to add another device via Unique ID?</label>              
</slot>
</section>
<section class="modal-body" v-if="error">
<label>{{error}}</label>
<label>Would you like to add another device via Unique ID?</label> 
</section>
<footer class="modal-footer">
<slot name="footer">
<button type="button" class="btn-success btn" @click="Newdevice">Yes</button>
<button type="button" class="btn-default btn" @click="close('add-new-device-first')">NO</button>
</slot>
</footer>
</div>

<div class="third-modal" v-if="AddDeviceStepVal.fifth">
<header class="modal-header">
<slot name="header">
<h4>  <div v-if="!error"> Fail to Add / Retry  <button type="button" class="btn btn-close" @click="close('add-new-device-first')"><i class="fa fa-times"></i></button></div>

</h4>  </slot>
</header>
<section class="modal-body">
<label>The {{name}} process has failed because of {{$store.state.Setting.InformationResponce}}.</label>
<label>Would you like to add another device via Unique ID?</label> 
</section>
<footer class="modal-footer">
<slot name="footer">
<button type="button" class="btn-success btn" @click="Newdevice">Yes</button>
<button type="button" class="btn-default btn" @click="close('add-new-device-first')">NO</button>
</slot>
</footer>
</div>
</modal>

<modal name="DisplayWaitMsg">
<h1>Please Wait</h1>
</modal>

<modal name="rename">
<header class="modal-header">
<slot name="header">
<h4>  Rename
<button type="button" class="btn btn-close" @click="close('rename')"><i class="fa fa-times"></i></button>
</h4>  </slot>
</header>
<section class="modal-body">
<slot name="body">
<label v-if="this.ActionData.data">Please enter the new name for {{ this.ActionData.data.display }}</label>
<input name="name" v-model="name"  type="text" class="form-control">
</slot>
</section>
<footer class="modal-footer">
<slot name="footer">
<button type="button" class="btn-success btn" @click="Rename('rename')">Rename</button>
<button type="button" class="btn-default btn" @click="close('rename')">Cancel</button>
</slot>
</footer>
</modal>
</div>
<v-dialog/>
</div>
</div>
</template>
<script>
import { EventBus } from './../../EventBus/event-bus.js'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import Loading from 'vue-loading-overlay';
import axios from 'axios';
import $ from 'jquery';
export default {
	props: ['StyleContext', 'clickTarget', 'contextDisplaySetting', 'ActionData'],
	name: 'ContextMenu',
	data () {
		return {
			WhileSearching: false,
			forCheckBox:{},
			checkIfaddDeviceCheck: false,
			deviceFound: true,
			SearchDeviceData: null,
			isLoading: false,
			fileinput: [],
			error: false,
			optionAddDeviceType: {'scan':false, 'addViaID':false, 'import':false},
			AddDeviceStepVal: {'first':true, 'second':false, 'third':false, 'fifth':false, 'search':false, 'sixth':false},
			collaps: false,
			msg: 'Welcome to Your Vue.js App',
			name: 'Group',
			OnHeader: false,
			file: [],
			editName : '',
		}
	},
	components: {
		PulseLoader,Loading
	},
	created: function () {
		EventBus.$on('communicateAllChildToChildAddNewDevice', clickCount => {
				//console.log(`Oh1, that's nice. It's gotten clicks! :)`)
				this.OnHeader = true
				this.Newdevice()
			})
		EventBus.$on('communicateAllChildToChildAddNewGroup', clickCount => {
				//console.log(`Oh1, that's nice. It's gotten clicks! :)`)
				this.OnHeader = true
				this.Newgroup()
			})
	},
	methods: {
		Edit(){
			EventBus.$emit('CallToRightSideBarEdit', '0')	
		},
		Uninstall(){
			EventBus.$emit('CallToRightSideBarUninstall', '0')
		},
		handleFileUpload(){
       		this.file = this.$refs.file.files[0]; 
    	},
		backSearchList() {
			this.AddDeviceStepVal.first = false
			this.AddDeviceStepVal.second = true
			this.AddDeviceStepVal.third = false
			this.AddDeviceStepVal.fifth = false
			this.AddDeviceStepVal.search = false
		},
		DisplayBrowsePopUp() {
			$('#groupName').val(this.ActionData.data.groupkey)
			$('#uploadCSV').click();
		},
		updateTableCheck1 (key) {
			console.log('------------');
				console.log(key);
			// 	console.log(this.forCheckBox[key]);
			// console.log('------------');
			if(this.forCheckBox[key]){
				this.forCheckBox[key]=true
				this.checkIfaddDeviceCheck=false
			} else {
				this.forCheckBox[key]=false
				this.checkIfaddDeviceCheck=key[1]
			}
		},
		changeCheckBoxStatus (val) {
			this.optionAddDeviceType.scan = false
			this.optionAddDeviceType.addViaID = false
			this.optionAddDeviceType.import = false
			// True
			this.optionAddDeviceType[val] = true
		},
		ExpandCollapse () {
			let target = this.ActionData.data.groupkey
			$('#' + target + '1').click()
		},
		ShowHideColumn () {
			// this is use for communicate child to child component
			EventBus.$emit('communicateAllChildToChild', '0')
		},
		Expand (event) {
			//console.log(event)
			// this.$modal.show("hello-world");
			return true
		},
		Add () {
			let parentkey = this.$store.state.L1
			let key1 
			Object.keys(parentkey).forEach(function(val, key){
					if (key === 0) {
						key1 = val
					}
				})
			let parent = key1
			let level = 'L1'
			//console.log('i aM')
			//console.log(parent)
			if(!this.OnHeader){
				//console.log('YYYYYYYYYYYYYYYY')

				parent = this.ActionData.data.groupkey
				level = this.ActionData.data.level
			}

			//console.log('INNNNNNNNNNNNNLEVEL')
			//console.log(level)

			//let parent = this.ActionData.data.groupkey
			let check = this.CheckKey1(this.name)
			if (level === 'L5') {
				this.$modal.hide('add-new-group')
				this.$modal.show('dialog', {
						title: 'Message',
						input: '',
						text: 'Sorry you can not create group. you are in level 6',
						buttons: [
							{
								title: 'Ok',
								handler: () => {
									this.$modal.hide('dialog')
									this.OnHeader = false
								}
							}
						]
					})
			}
			// //console.log('check')
			// //console.log(check)
			// 10 means false 11 means true
			if (check === 10) {
				this.$store.commit('addStore', {level: level, name: parent, display_name: this.name, parentnode: parent})
				this.OnHeader = false
				this.$modal.hide('add-new-group')
				//Overlay screen event catch in leftsidebar
				EventBus.$emit('DeviceIsDeleted', '0')
				this.$modal.show('dialog', {
						title: 'Message',
						input: '',
						text: 'Group has been added Successfully',
						buttons: [
							{
								title: 'Ok',
								handler: () => {
									this.$modal.hide('dialog')
									this.OnHeader = false
								}
							}
						]
					})
			} else {
				this.$modal.hide('add-new-group')
				this.$modal.show('dialog', {
						title: 'Duplicate Name',
						input: '',
						text: ' The entered name is already in use.Please use a different one instead.',
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
		},
		CheckAddDeviceVia () {
			//let parentkey = this.ActionData.data.groupkey
			this.AddDeviceStepVal.first = false
			this.AddDeviceStepVal.second = true
			this.AddDeviceStepVal.third = false
			this.AddDeviceStepVal.fifth = false
			this.AddDeviceStepVal.search = false

			setTimeout(function(){
				$('#searchbyUniqueId').on('keypress', function (event) {
					var regex = new RegExp("^[a-zA-Z0-9]+$");
					var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
					if (!regex.test(key)) {
					event.preventDefault();
					return false;
					}
				});
			},2000);
		},
		UploadCSV () {
			if (this.file) {
				let THIS = this
				THIS.isLoading = false
				THIS.AddDeviceStepVal.first = false
				THIS.AddDeviceStepVal.second = false
				THIS.AddDeviceStepVal.third = false
				THIS.AddDeviceStepVal.fifth = false
				THIS.AddDeviceStepVal.search = true
				//SearchDevice
				THIS.$store.commit('OperationCheck', {'action':false})
				THIS.SearchDeviceData = null
				// Initialize the form data  
				var THIS = this;        
				var self = this;
				self.token = window.localStorage.getItem('token');
				let company_id = window.localStorage.getItem('account_id')
				let formData = new FormData();
				//  Add the form data we need to submit

					formData.append('file', this.file);      
					formData.append('token', window.localStorage.getItem('token'));
					formData.append('access_token', 'sdfjkhfdsjkjhksj');
					formData.append('key', KEY);

					axios.post( API_URL+'device/uploadcsv',formData,{
						headers: {
							'Content-Type': 'multipart/form-data',
							'Authorization': 'Bearer '+ self.token
						}
						}).then(function(result){
						if(result['data']['status'] == 200){
							if(result.device != ""){
								THIS.deviceFound = false
								var results = [];
								result['data']['device'].forEach(function($key,$data){
									results.push($key);
									THIS.forCheckBox['A'+$data+1] = false
								});
								let All = results;
								setTimeout(function(){
									THIS.SearchDeviceData = All
								},3000)
							} else {
								THIS.deviceFound = true
								setTimeout(function(){
									THIS.SearchDeviceData = true
								},3000)
							}
							self.$store.commit('SyncData',{})
						}else{
							alert(data['data']['message']);
							self.$store.commit('SyncData',{})
						}
					});
				THIS.AddDeviceStepVal.first = false
				THIS.AddDeviceStepVal.second = false
				THIS.AddDeviceStepVal.third = false
				THIS.AddDeviceStepVal.fifth = false
				THIS.AddDeviceStepVal.search = true
				THIS.isLoading = false
				THIS.checkIfaddDeviceCheck = false
				setTimeout(function(){
					//THIS.updateTableCheck1('A01');
					//$('.third-modal input[type=checkbox]').prop('checked','true');
				},3000);
				// $('#UploadCSVFinal1').click();
				// this.AddDeviceStepVal.first = false
				// this.AddDeviceStepVal.second = false
				// this.AddDeviceStepVal.third = false //
				// this.AddDeviceStepVal.fifth = false
				// this.AddDeviceStepVal.search = false
				// setTimeout(function(){
				// 		THIS.AddDeviceStepVal.first = false
				// 		THIS.AddDeviceStepVal.second = false
				// 		THIS.AddDeviceStepVal.third = true
				// 		THIS.AddDeviceStepVal.fifth = false
				// 		THIS.AddDeviceStepVal.search = false
				// 		//THIS.OnHeader = false
				// 		THIS.isLoading = false
				// 	},3000);
				// return false
				return true;
			}
		},
		SearchDevice () {
			let THIS = this
			THIS.isLoading = false
			THIS.AddDeviceStepVal.first = false
			THIS.AddDeviceStepVal.second = false
			THIS.AddDeviceStepVal.third = false
			THIS.AddDeviceStepVal.fifth = false
			THIS.AddDeviceStepVal.search = true
			//SearchDevice
			THIS.$store.commit('OperationCheck', {'action':false})
			THIS.SearchDeviceData = null
			var URL = THIS.$store.state.Setting.baseUrl
			var tempdata = { 'bdid':THIS.name, 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
			EventBus.$emit('DeviceIsDeleted', '0')
			$.ajax({
					url: URL + 'device/check/bdid/DMS',
					async: false,
					data: tempdata,
					method: 'POST',
					success: function (result) {
						if(result.device != ""){
							THIS.deviceFound = false
							var results = [];
							result.device.forEach(function($key,$data){
								results.push($key);
								THIS.forCheckBox['A'+$data+1] = false
							});
							let All = results;
							setTimeout(function(){
								THIS.SearchDeviceData = All
							},3000)
						} else {
							THIS.deviceFound = true
							setTimeout(function(){
								THIS.SearchDeviceData = true
							},3000)
						}
					},
					error: function (jqXHR, exception) {
						var msg = '';
						if (jqXHR.status === 0) {
							msg = 'Not connect.\n Verify Network.';
						} else if (jqXHR.status == 404) {
							msg = 'Requested page not found.';
						} else if (jqXHR.status == 500) {
							msg = 'Internal Server Error.';
						} else if (exception === 'parsererror') {
							msg = 'Requested JSON parse failed.';
						} else if (exception === 'timeout') {
							msg = 'Time out error.';
						} else if (exception === 'abort') {
							msg = 'Ajax request aborted.';
						} else {
							result = {'name':'Test Device', 'BID':'INFO'}
							//msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
						}
					}
				})
				THIS.AddDeviceStepVal.first = false
				THIS.AddDeviceStepVal.second = false
				THIS.AddDeviceStepVal.third = false
				THIS.AddDeviceStepVal.fifth = false
				THIS.AddDeviceStepVal.search = true
				THIS.isLoading = false
				THIS.checkIfaddDeviceCheck = true
				setTimeout(function(){
					//$('.third-modal input[type=checkbox]').prop('checked','true');
					//THIS.updateTableCheck1('A1');
				},3000);
		},
		// AddDevice1 () {
		// 	let THIS = this
		// 	THIS.AddDeviceStepVal.search = false
		// 	THIS.$modal.show('DisplayWaitMsg');
		// 	THIS.AddDevice1();
		// },
		AddDevice () {
			let THIS = this
			THIS.isLoading = true
			$('body').append('<style>.loading-overlay .loading-icon:before{content:"Searching..." !important;}</style>');
			THIS.AddDeviceStepVal.first = false
			THIS.AddDeviceStepVal.second = false
			THIS.AddDeviceStepVal.third = false //
			THIS.AddDeviceStepVal.fifth = false
			THIS.AddDeviceStepVal.search = false
			//THIS.OnHeader = false

			////console.log('LOADER START');
			let parentkey = THIS.$store.state.L2
			let key1 
			Object.keys(parentkey).forEach(function(val, key){
					if (key === 0) {
						key1 = val
					}
				})
			parentkey = key1
			//console.log('OOp')
			if(!THIS.OnHeader){
				//console.log('YYYYYYYYYYYYYYYY')
				parentkey = THIS.ActionData.data.groupkey
			}
			THIS.name = THIS.SearchDeviceData[this.checkIfaddDeviceCheck].name
			let check = THIS.CheckDevice(THIS.name)
			// 10 means false 11 means true
			if (check === 10) {
				THIS.$store.state.Setting.operationCheck = false
                // Hide Div
                //console.log(THIS.SearchDeviceData[this.checkIfaddDeviceCheck]);
				THIS.SearchDeviceData = THIS.SearchDeviceData[this.checkIfaddDeviceCheck]
				

				// HERE WE CALL MQTT FOR GETTING RESPONCE
				let Settings = '';
				let tempdata = {"bdid" : "0A002700001B","token":window.localStorage.getItem('token')};
				let URL = THIS.$store.state.Setting.baseUrl
				$.ajax({
					url: URL + 'device/check/deviceMQTT',
					//async: false,
					data: tempdata,
					method: 'POST',
					success: function (result) {
						if(result.status == 200){
							Settings = result.data
							console.log(result.data);
						}
					},
					error: function (jqXHR, exception) {
						var msg = '';
						if (jqXHR.status === 0) {
							msg = 'Not connect.\n Verify Network.';
						} else if (jqXHR.status == 404) {
							msg = 'Requested page not found.';
						} else if (jqXHR.status == 500) {
							msg = 'Internal Server Error.';
						} else if (exception === 'parsererror') {
							msg = 'Requested JSON parse failed.';
						} else if (exception === 'timeout') {
							msg = 'Time out error.';
						} else if (exception === 'abort') {
							msg = 'Ajax request aborted.';
						} else {
							result = {'name':'Test Device', 'BID':'INFO'}
							//msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
						}
					}
				});
				//  return true;
				let i = 1;
				runSelf();
				function runSelf(){
				 	setTimeout(function(){
				 		if(Settings){
							 THIS.checkAndDoResponce(Settings,parentkey);
						 } else {
							 //console.log('Run AGAIn');
							 runSelf();
						 }
				 	},5000);
				}
			} else {
				THIS.AddDeviceStepVal.first = false
				THIS.AddDeviceStepVal.second = false
				THIS.AddDeviceStepVal.third = false //
				THIS.AddDeviceStepVal.fifth = false
				THIS.AddDeviceStepVal.search = false
				THIS.error = 'The entered name is already in use.Please use a different one instead.'
				THIS.OnHeader = false

				setTimeout(function(){
					THIS.AddDeviceStepVal.first = false
					THIS.AddDeviceStepVal.second = false
					THIS.AddDeviceStepVal.third = true
					THIS.AddDeviceStepVal.search = false
					THIS.AddDeviceStepVal.fifth = false
					THIS.OnHeader = false
					THIS.isLoading = false
				},3000);
			}
		},
		checkAndDoResponce (Settings,parentkey) {
			Settings = JSON.parse(Settings)
			let THIS = this
			if(Settings.power){
					THIS.$store.commit('addDevice', {'bdid':THIS.SearchDeviceData.bdid,'parentkey': parentkey, 'name': THIS.SearchDeviceData.name, 'serial': THIS.SearchDeviceData.serial, 'model':THIS.SearchDeviceData.model,'description':THIS.SearchDeviceData.description,'setting':Settings})
					//Overlay screen event catch in leftsidebar
					EventBus.$emit('DeviceIsDeleted', '0')
					if(THIS.$store.state.Setting.operationCheck) {
						THIS.AddDeviceStepVal.first = false
						THIS.AddDeviceStepVal.second = false
						THIS.AddDeviceStepVal.third = false //
						THIS.AddDeviceStepVal.fifth = false
						THIS.AddDeviceStepVal.search = false
						THIS.OnHeader = false
						//console.log('LOADER OFF');
						setTimeout(function(){
								THIS.AddDeviceStepVal.first = false
								THIS.AddDeviceStepVal.second = false
								THIS.AddDeviceStepVal.third = true
								THIS.AddDeviceStepVal.fifth = false
								THIS.AddDeviceStepVal.search = false
								THIS.OnHeader = false
								THIS.isLoading = false
							},3000);
					} else {
						THIS.AddDeviceStepVal.first = false
						THIS.AddDeviceStepVal.second = false
						THIS.AddDeviceStepVal.third = false
						THIS.AddDeviceStepVal.fifth = false //
						THIS.AddDeviceStepVal.search = false
						THIS.OnHeader = false
						setTimeout(function(){
								THIS.AddDeviceStepVal.first = false
								THIS.AddDeviceStepVal.second = false
								THIS.AddDeviceStepVal.third = false
								THIS.AddDeviceStepVal.fifth = true
								THIS.AddDeviceStepVal.search = false
								THIS.OnHeader = false
								THIS.isLoading = false
							},3000);
					}
				} else {
					THIS.AddDeviceStepVal.first = false
					THIS.AddDeviceStepVal.second = false
					THIS.AddDeviceStepVal.third = false //
					THIS.AddDeviceStepVal.fifth = false
					THIS.AddDeviceStepVal.search = false
					THIS.error = 'No Response from the Device OR Device is not in Online to fetch the Data'
					THIS.OnHeader = false

					// setTimeout(function(){
					// 		THIS.AddDeviceStepVal.first = false
					// 		THIS.AddDeviceStepVal.second = false
					// 		THIS.AddDeviceStepVal.third = true
					// 		THIS.AddDeviceStepVal.search = false
					// 		THIS.AddDeviceStepVal.fifth = false
					// 		THIS.OnHeader = false
					// 		THIS.isLoading = false
					// 	},3000);
				}
			$('body').append('<style>.loading-overlay .loading-icon:before{content:"tap Refresh again to stop" !important;}</style>');
		},
		Newdevice (event) {
			this.error = false
			//Empty CheckBox
			this.optionAddDeviceType.scan = false
			this.optionAddDeviceType.addViaID = false
			this.optionAddDeviceType.import = false
			this.AddDeviceStepVal.fifth = false
			//Setup Initial Stage
			this.AddDeviceStepVal.first = true
			this.AddDeviceStepVal.second = false
			this.AddDeviceStepVal.third = false
			this.AddDeviceStepVal.search = false
			this.msg = 'Welcome to Your Vue.js App'
			this.name = ''
			this.$modal.show('add-new-device-first')
		},
		Newgroup (event) {
			this.name = 'Group'
			this.$modal.show('add-new-group')
		},
		close (modelName) {
			this.$modal.hide(modelName)
		},
		DuplicateGroup (event) {
			// //console.log(event);
			this.$modal.show('dialog', {
					title: 'Duplicate Name',
					input: '',
					text: 'label>The entered name is already in use.</label><br>Please use a diffrent one instead',
					buttons: [
						{
							title: 'OK',
							handler: () => {
								this.$modal.hide('dialog')
							}
						}
					]
				})
			return false
		},
		Rename (event) {
			this.editName = ""
			// //console.log(this.ActionData.data)
			let type = this.ActionData.data.type
			let level = this.ActionData.data.level
			var groupkey = this.ActionData.data.groupkey
			var devicekey = this.ActionData.data.devicekey
			let key = this.ActionData.data.key
			if (event === 'context') {
				if (type === 'group') {
					this.name = this.ActionData.data.display
					this.editName = "for " +'"'+this.name+'"'
					//console.log('INNN')
					//console.log(this.ActionData.data.display)
				} else {
					this.name = devicekey
				}
				this.$modal.show('rename')
			} else {
				if (type === 'group') {
					let check = this.CheckKey(this.name)
					this.$modal.hide('rename')
					if (check === 10) {
						let newName = this.name
						this.$store.commit('RenameGroup', {'level': level, 'name': newName, 'groupkey': groupkey})
						this.editName = ""
					} else {
						this.$modal.hide('rename')
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
									}]
							})
					}
				} else {
					let check = this.CheckDevice(this.name)
					this.$modal.hide('rename')
					let devicekey = this.ActionData.data.devicekey
					if (check === 10) {
						let newName = this.name
						this.$store.commit('RenameDevice', {'level': level, 'name': newName, 'groupkey': groupkey, 'devicekey': devicekey, 'key': key, 'deviceID' : this.ActionData.data.deviceid})
					} else {
						this.$modal.hide('rename')
						this.$modal.show('dialog', {
								title: 'Duplicate Name',
								input: '',
								text: 'he entered name is already in use.Please use a different one instead.',
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
			}
			return true
		},
		Delete (event) {
			let level = this.ActionData.data.level
			let type = this.ActionData.data.type
			let key = this.ActionData.data.key
			let MSG = '';
			if(type=='device'){
			   MSG = 'is going to be deleted.</label><br>This cannot be undone. Please confirm the action.';
			}else{
			   MSG = 'is going to be deleted.</label><br>All its sub item will not be deleted, but will be move to "Uncategorized" group.';
			}

			// var groupkey = this.ActionData.data.groupkey
			var devicekey = this.ActionData.data.devicekey
			if(type === 'group') {
				var devicekey = this.ActionData.data.display
			}
			//console.log(type)
			this.$modal.show('dialog', {
					title: 'Delete ' + type,
					input: '',
					text:
					'<label>' + type + ' “' + devicekey + '” ' + MSG,
					buttons: [
						{
							title: 'Delete',
							handler: () => {
								if (type === 'group') {
									let groupkey = this.ActionData.data.groupkey
									this.$store.commit('DeleteStoreGroup', {'level': level, 'groupkey': groupkey})
									this.$modal.hide('dialog')
									alert('Deleted successfully')

									//Overlay screen event catch in leftsidebar
									EventBus.$emit('DeviceIsDeleted', '0')
									this.$store.commit('SyncData', {_token: 'gsdgfsfdjgjhfdsghgjh'})
								}
								if (type === 'device') {
									let groupkey = this.ActionData.data.groupkey
									let devicekey = this.ActionData.data.devicekey
									this.$store.commit('DeleteDevice', {'level': level, 'key': key, 'groupkey': groupkey, 'devicekey': devicekey, 'deviceID' : this.ActionData.data.deviceid})
									this.$modal.hide('dialog')
									alert('Deleted successfully')

									//Overlay screen event catch in leftsidebar
									EventBus.$emit('DeviceIsDeleted', '0')
								}
							}
						},
						{
							title: 'Cancel'
						}
					]
				})
			return false
		},
		ExpandAll (event) {
			// //console.log("yes")
			this.$store.state.Setting.context = false
		},
		CollapseAll (event) {
			// //console.log("yes")
			this.$store.state.Setting.context = true
		},
		CheckKey1 (namekey) {
			var check = 10
			let dataList = Object.values(this.$store.state)
			dataList.forEach(element => {
					let levelList = Object.values(element)
					levelList.forEach(res => {
						// //console.log(namekey)
						if(res){
							if (namekey === res.display_name) {
								check = 11
							}
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
							// //console.log(namekey)
							// //console.log(res)
							if (res !== null && namekey === res.name) {
								check = 11
							}
						})
				})
			return check
		},
		CheckDevice (namekey) {
			var check = 10
			let dataList = Object.values(this.$store.state.Device)
			// //console.log('device')
			// //console.log(dataList)
			dataList.forEach(element => {
					let levelList = Object.values(element)
					levelList.forEach(res => {
							if (namekey === res.name) {
								check = 11
							}
						})
				})
			return check
		}
	}
}
</script>
<style>
.modal-body, header.modal-header {
	padding: 5px 20px !important;
}
.top_modal.text-center {
	border-bottom: 1px solid #c7c7c7;
	padding: 10px;
}
.ContextModel .modal-body {
	padding: 50px 20px !important;
	height: 100%;    
	display: flex;
	justify-content: left;
	align-items: center;
	flex-wrap: wrap;
}
.searching_modal section.modal-body {
	text-align: center;
	justify-content: center;
}
.searching_modal section.modal-body p {
	padding-top: 15px;
	font-size: 12px;
}
.loader_div {
	background: rgba(0,0,0,.6);
	position: absolute;
	width: 100%;
	top: 0;
	height: 100%;
	left: 0;
	text-align: center;
	z-index: 99;
	display: flex;
	justify-content: center;
	align-items: center;
}
.loader_div img {
	width: 10%;
}
.searching_modal section.modal-body input.form-control {
	width: 70%;
}
.browse_CSV label {
	padding-right: 20px;
}
.Dashboard .modal-footer {
	border-top: 0px solid #c7c7c7;
	    padding-top: 0;
}
.top_modal.text-center p {
	margin-bottom: 0;
}
section.modal-body .searching-table-grid tr >td input {
	width: 100%!important;
}

.contextMenu,.modal-addGroup{
	position: absolute;
	background: #ec6c00;
	z-index: 999;
	border-radius: 5px;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
}
.contextMenu a {
	color: #fff;
	display: block;
	padding: 12px 20px;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.contextMenu a:hover {
	text-decoration: none;
	background: #fff;
	border-color: #ccc;
	color: #1e3250;
}
.table_grid_modal footer.modal-footer {
	text-align: right;
}

section.modal-body .searching-table-grid tr .checkbox {
	margin: 0;
}
section.modal-body .searching-table-grid tr .checkbox > label {
	padding-bottom: 0;
}
section.modal-body .searching-table-grid tr > td, section.modal-body .searching-table-grid tr > th {
	padding-top: 15px;
}
section.modal-body .searching-table-grid tr th {
	border-bottom: none;
	white-space: nowrap;
	vertical-align: middle;
}
.ContextModel .btn-close,.modal-addGroup .btn-close,.modal-ShowHide .btn-close{
	float:right;
	/*background: none;
	border: none;
	margin-top: -10px;*/
}
.v--modal-overlay { 
    background: rgba(0, 0, 0, 0.71) !important; 
}
.v--modal-overlay .modal-header h4 { 
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #223a5e;
	    font-weight: 600;
}
.ContextModel .fa{
	color:#b7b6b6;
}
.ContextModel .modal-body{
	padding: 15px 20px !important;
}
.ContextModel label,.modal-addGroup label {
	/* text-transform:capitalize; */
	color:#777;
	padding-bottom:10px;
}
#footerTable input[type="checkbox"] {
	display: none;
}
.vue-dialog .dialog-content{padding: 0px;}
.vue-dialog .dialog-c-title{
	padding: 20px 20px;
	border-bottom: 1px solid #ddd;
}
.vue-dialog .dialog-c-text{
	padding: 20px 20px;
}
.collapse ul > li >ul> li{
	white-space:  nowrap;
	padding:0 0px 0 12px;
}
.sidebar{
	background:#EC6C00;
}
.modal-addGroup .tbl_callSetting{
	margin-top: -10px;
}
.modal-ShowHide .modal-footer{
	float: left;
	width: 100%;
}
.tbl-title{padding:0px 0;color:#fff;}
.sidebar{width: 100%;height:600px;overflow-y: auto;}
/* .main-right-sidebar .table-responsive {overflow-x: hidden;}
.sidebar-collapse .content-wrapper{width:70%;} */
.sidebar-collapse .content-wrapper .demo-content{overflow-x: auto;}
/*.left-sidebar-menu .fa-angle-double-right{ padding-right: 5px;font-weight: 600; padding-left: 5px;}*/
.table-head .pull-right{color: #fff;}
.collapse ul > li >ul li span{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;}
.collapse ul > li >ul li .fa{font-family: fontAwesome;}
.contextMenu .disable, .contextMenu .disable:hover  {
	background-color:grey;
	color:black !important;
	border-bottom: gray;
	cursor: not-allowed;
}
.add-new-device-padding .modal-body {
    padding: 0px 20px !important;
}
</style>
