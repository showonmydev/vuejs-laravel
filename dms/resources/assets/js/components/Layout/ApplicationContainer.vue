<template>
<div class="content-wrapper application-table">
<div class="table-content">
  <div class="screenScroll">
    <div class="">     
        <!-- <div class="modal-addGroup">
            <modal name="list-application" id="appicationList" @opened="opened" :clickToClose="false"> -->
             <div>
              <div id="appicationList"> 
             <header class="applistheader">
              <!-- <SoftwareHeader v-if="$store.state.Setting.IsShowSoftwareMang" company="Katpro" :name="this.$store.state.Setting.userInfo" @Refresh="emitRefreshClickEvent"></SoftwareHeader> -->
              <!-- <SoftwareHeader company="Katpro" :name="this.$store.state.Setting.userInfo" @Refresh="emitRefreshClickEvent"></SoftwareHeader>
              <loading :active.sync="isLoading" :can-cancel="false" :is-full-page="false" :style="{top: styleObject}"></loading> -->
             <slot name="header">
              <div class="subHeader">
                <h4 class="pull-left">Katpro Application
                <!-- <button type="button" class="btn btn-close pull-right" @click="close('add-application')"><i class="fa fa-times"></i></button> -->
                </h4> 
                <span class="pull-right showOldList"><label><input type="checkbox" name="older_version" @click="checkboxToggle" v-model="getOlderVersion" class="showOlderVersion" /> Show Older Version</label></span>
              </div>
            </slot>  
             </header>
             <section class="form-horizontal">
                 <slot name="body">
        <div class="demo-content overflowData" v-bind:style="{ height: screenHeight}">
      <table id="appTable" class="table-hover sar-table ui-widget-content table table-bordered">
        <thead>
            <tr>
                <!-- <th class="accept" v-for="metric in metricList"> -->
                <th class="accept" id='column-header-1' @click="sort('app_name')">
                  Names
                  <span class="sort-icon pull-right" v-show="isAscendingForName != 'NOT'"><a v-if="isAscendingForName" @click="sort('app_name')">▼</a>
                  <a v-else @click="sort('app_name')">▲</a></span>
                  <div id='column-header-1-sizer'></div>
                </th>
                <th class="accept" id='column-header-2' @click="sort('version')">
                  Version
                  <span class="sort-icon pull-right" v-show="isAscendingForVersion != 'NOT'"><a v-if="isAscendingForVersion" @click="sort('version')">▼</a>
                  <a v-else @click="sort('version')">▲</a></span>
                  <div id='column-header-2-sizer'></div>
                </th>
                <!-- <th class="accept hidden" id='column-header-3' @click="sort('description')">
                  Description
                  <span class="sort-icon pull-right"><a v-if="isAscendingForName" @click="sort('description')">▼</a>
                  <a v-else @click="sort('description')">▲</a></span>
                <div id='column-header-3-sizer'></div>
              </th>
                <th class="accept hidden" id='column-header-4' @click="sort('app_name')">
                  File Name
                  <span class="sort-icon pull-right"><a v-if="isAscendingForName" @click="sort('app_name')">▼</a>
                  <a v-else @click="sort('app_name')">▲</a></span>
                  <div id='column-header-4-sizer'></div>
                </th> -->
                <th class="accept" id='column-header-5' @click="sort('size')">
                  Size
                  <span class="sort-icon pull-right" v-show="isAscendingForSize != 'NOT'"><a v-if="isAscendingForSize" @click="sort('size')">▼</a>
                  <a v-else @click="sort('size')">▲</a></span>
                  <div id='column-header-5-sizer'></div>
                </th>
                <th class="accept" id='column-header-6' @click="sort('date_modified')">
                  Date Modified
                  <span class="sort-icon pull-right" v-show="isAscendingForDateModify != 'NOT'"><a v-if="isAscendingForDateModify" @click="sort('date_modified')">▼</a>
                  <a v-else @click="sort('date_modified')">▲</a></span>
                  <div id='column-header-6-sizer'></div>
                </th>
                <th class="accept" id='column-header-7' @click="sort('date_uploaded')">
                  Date Uploaded
                  <span class="sort-icon pull-right" v-show="isAscendingForDateUpload != 'NOT'"><a v-if="isAscendingForDateUpload" @click="sort('date_uploaded')">▼</a>
                  <a v-else @click="sort('date_uploaded')">▲</a></span>
                  <div id='column-header-7-sizer'></div>
                </th>
                <th id='column-header-8'>Actions
                  <div id='column-header-8-sizer'></div>
                </th>
            </tr>
        </thead>
        <tbody>
          <tr v-for="(data, key) in sortedData" v-bind:key="key" class="softwaremang" v-bind:class="{'olderVersion': isOldData(data)}" v-on:click="displayRow(key)" v-on:mouseout="hideRow(key)">
                <!-- <span @click="appInfo(data)"></span> -->
                <td v-bind:id="'column-col-1-row-' + key" class="accept">{{data.app_name}}  
                  <span class="pull-right tooltipDiv webIcon appInfoTag">
                    <div class="tooltipText">
                      <div class="tooltipHeader">
                        <p><strong>Current Version</strong></p>
                        <p>IPVT 1.2</p>
                        <p class="tooltipTitle"><strong>Device Info</strong></p>
                      </div>
                         <table class="table tooltipTable tooltip-dt-style">
                           <tr><td>Name:</td><td>TPE02-D01</td></tr>
                           <tr><td>Model:</td><td>ST550K</td></tr>
                           <tr><td>Type:</td><td>Display</td></tr>
                           <tr><td>Group:</td><td>TPE02</td></tr>
                           <tr><td>MAC Address:</td><td>B0-C5-CA-70-00-10</td></tr>
                           <tr><td>IP Address:</td><td>10.27.27.89</td></tr>
                           <tr><td>Ser ial Number:</td><td>236131200059XA0014</td></tr>
                           <tr><td>System Version:</td><td>2.0.2_WW</td></tr>
                         </table>
                   </div>
                  </span>
                  <div v-bind:id="'column-col-1-row-' + key + '-sizer'"></div>
                </td>

                <td class="accept" v-bind:id="'column-col-2-row-' + key">{{data.version}}<div v-bind:id="'column-col-2-row-' + key + '-sizer'"></div></td>
                <td class="accept hidden" v-bind:id="'column-col-3-row-' + key">{{data.description}}<div v-bind:id="'column-col-3-row-' + key + '-sizer'"></div></td>
                <td class="accept hidden" v-bind:id="'column-col-4-row-' + key">{{data.file_name}}<div v-bind:id="'column-col-4-row-' + key + '-sizer'"></div></td>
                <td class="accept" v-bind:id="'column-col-5-row-' + key">{{data.size}}<div v-bind:id="'column-col-5-row-' + key + '-sizer'"></div></td>
                <td class="accept" v-bind:id="'column-col-6-row-' + key">{{data.date_modified}}<div v-bind:id="'column-col-6-row-' + key + '-sizer'"></div></td>
                <td class="accept" v-bind:id="'column-col-7-row-' + key">{{data.date_uploaded}}<div v-bind:id="'column-col-7-row-' + key + '-sizer'"></div></td>
                <td class="accept ifnotClick" v-bind:id="'column-col-8-row-' + key">
                  <span class="hide">
                  <a href="javascript:void(0)"  @click="installApp(data)" title="Install" v-bind:class="{ hidden: isOldData(data) }"><span class="webIcon  action-icon installIcon"></span></a>
                  <a href="javascript:void(0)" @click="editApp(data)" title="Edit" v-bind:class="{ hidden: isOldData(data) }"><span class="webIcon  action-icon editIcon"></span></a>
                  <a href="javascript:void(0)" title="Delete" @click="deleteApp(data.id, key, data.app_name)" v-bind:class="{ hidden: isOldData(data) }"><span class="webIcon  action-icon deleteIcon"></span></a>
                  </span>
                  <div v-bind:id="'column-col-8-row-' + key + '-sizer'"></div>
                </td>
            </tr>
        </tbody>
      </table>
     
    </div>
    </slot>
             </section>
             <footer class="applistfooter">
             <slot name="footer">
                        <div class="status-bar">
                            <div class="pull-left">Storage: 608MB used / 892 MB available</div>
                            <div class="pull-right">{{operation}} <i class="fa fa-file-text-o fa-lg" aria-hidden="true"></i>
                          </div>
                        </div>
                        <!--                <p>
                        <button @click="prevPage">Previous</button> 
                        <button @click="nextPage">Next</button>
                      </p> -->

                     <!-- <button type="button" class="btn-success btn" v-on:click="ListApplication">Add</button> -->
                     <!-- <button type="button" class="btn-default btn" @click="close('list-application')">Cancel</button> -->
                     </slot>
                 </footer>
             <!-- </modal> -->
           </div>
             </div>
             </div>
      <div class="row">
        <div class="modal-addGroup">
            <modal name="add-application">
             <header class="modal-header">
             <slot name="header">
             <h4>Add Application Info
             <!-- <button type="button" class="btn btn-close pull-right" @click="close('add-application')"><i class="fa fa-times"></i></button> -->
             </h4>  </slot>
             </header>
             <section class="modal-body form-horizontal">
                 <slot name="body">  
                    <div class="form-group">
                        <label class="control-label col-md-2">App Name</label>
                        <div class="col-sm-9">
                            <input name="app_name" type="text" class="form-control">  
                        </div>
                    </div>      
                    <div class="form-group">
                        <label class="control-label col-md-2">Description</label>
                        <div class="col-sm-9">
                            <textarea name="description" class="form-control" row="4" />  
                        </div>
                    </div>   
                    <div class="form-group">
                      <label class="control-label col-md-2">Version</label>
                      <div class="col-sm-9">
                          <input name="version" type="text" class="form-control">  
                      </div>    
                    </div> 
                    <div class="form-group">
                       <label class="control-label col-md-2">File Name</label>
                       <div class="col-sm-9">
                          <input name="file_name" type="text" class="form-control"> 
                      </div>
                    </div>   
                    <div class="form-group">
                       <label class="control-label col-md-2">Choose File</label>
                       <div class="col-sm-9">
                         <input name="file" type="file" class="form-control" ref="file" v-on:change="handleFileUpload()"> 
                      </div>
                    </div>         
                 </slot>
             </section>
             <footer class="modal-footer">
             <slot name="footer">
             <button type="button" class="btn-success btn" v-on:click="newApplication">Add</button>
             <button type="button" class="btn-default btn" @click="close('add-application')">Cancel</button>
             </slot>
             </footer>
             </modal>
             <modal name="edit-application">
             <header class="modal-header">
             <slot name="header">
             <h4>Edit Application Info
             <!-- <button type="button" class="btn btn-close pull-right" @click="close('edit-application')"><i class="fa fa-times"></i></button> -->
             </h4>  </slot>
             </header>
             <section class="modal-body form-horizontal">
                 <slot name="body">  
                      <div class="form-group">
                        <label class="control-label col-md-2">App Name</label>
                        <div class="col-sm-9">
                          <input name="app_name"   type="text" class="form-control" v-model="editAppName">  
                        </div>
                    </div>     
                    <div class="form-group">
                       <label class="control-label col-md-2">Description</label>
                       <div class="col-sm-9">
                        <textarea name="description" class="form-control" row="4" v-model="editDescription"></textarea>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-2">Version</label>
                      <div class="col-sm-9">
                       <!-- <input name="version" type="text" class="form-control" v-model="editVersion"> -->
                       <label class="control-label">{{editVersion}}</label>    
                      </div> 
                    </div>
                    <!-- <div class="form-group">
                      <label class="control-label col-md-2">File Name</label>
                      <div class="col-sm-9">
                        <input name="file_name" type="text" class="form-control" v-model="editFileName">  
                      </div>   
                    </div>   
                    <div class="form-group">
                      <label class="control-label col-md-2">Choose File</label>
                      <div class="col-sm-9">
                        <input name="file" type="file" class="form-control" ref="file" v-on:change="handleFileUpload()"> 
                      </div>
                    </div> -->
                 </slot>
             </section>
             <footer class="modal-footer">
             <slot name="footer">
             <button type="button" class="btn-success btn" @click="doEdit(record)">Save</button>
             <button type="button" class="btn-default btn" @click="close('edit-application')">Cancel</button>
             </slot>
             </footer>
             </modal>
             <modal name="delete-application">
             <header class="modal-header">
             <slot name="header">
             <h4>Delete Application</h4>
             <!-- <button type="button" class="btn btn-close pull-right" @click="close('delete-application')"><i class="fa fa-times"></i></button> -->
             </slot>
             </header>
             <section class="modal-body">
                 <slot name="body">  
                    <div class="form-group">
                        <div v-html="message"></div>
                    </div>     
                 </slot>
             </section>
             <footer class="modal-footer">
             <slot name="footer">
             <button type="button" class="btn-success btn" @click="deleteApplication()">Delete</button>
             <button type="button" class="btn-default btn" @click="close('delete-application')">Cancel</button>
             </slot>
             </footer>
             </modal>
             <modal name="install-application" class="installApp">
                <header class="modal-header">
                    <slot name="header">
                        <h4>Select Device For {{selectedDevice}} Installation
                        <!-- <button type="button" class="btn btn-close pull-right" @click="close('add-application')"><i class="fa fa-times"></i></button> -->
                        </h4>
                    </slot>
                </header>
                <section class="modal-body form-horizontal">
                    <slot name="body">
                        <div class="col-md-7">
                          <div id="app">
                            <!-- <div class="btn-group deviceView">
                                <button type="button" class="btn btnList active">List</button>
                                <button type="button" class="btn btnMap">Map</button>
                            </div> -->
                          <ul class="cd-accordion-menu">
                            <AccordionGroupList :model="treeData"></AccordionGroupList>
                          </ul>
                        </div>
                        </div>   
                        <div class="col-md-5">
                            <div class="deviceMsg">Select Device For {{selectedDevice}} Installation</div>
                            <div class="totalDevice">
                                <p class="title">{{selectedDeviceArray.length}} Devices selected</p>
                                <p class="deviceCount" v-if="!selectedDeviceNames">{{ selectedDeviceNames }}</p>
                                <p v-else>{{ selectedDeviceNames }} </p>
                            </div>
                            <footer class="modal-footer">
                                <slot name="footer">
                                    <button type="button" class="btn-success btn" @click="install()">Install</button>
                                    <button type="button" class="btn-default btn" @click="close('install-application')">Cancel</button>
                                </slot>
                            </footer>

                        </div>
                    </slot>
                </section>
             </modal>
        </div>
      </div>
    </div>
</div>

</div>
<!-- </drop> -->
</template>
<!-- built files will be auto injected -->
<script>
import { EventBus } from './../EventBus/event-bus.js'
//import loading from 'vue-full-loading'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.min.css';
import draggable from 'vuedraggable'
import axios from 'axios'
import AccordionGroupList from './AccordionGroupList'
import JQueryUi from 'jquery-ui'
import SoftwareHeader from './SoftwareHeader'

var treeData = {
  name: "All",
  type: "group",
  children: [
    {
      name: "Group 1",
      type: "group",
      children: [{ name: "Device 1.1", type: "device" },{ name: "Device 1.2", type: "device" }]
    },
    {  name: "Group 3",
       type: "group",
       children: [{ name: "Device 3.1", type: "device" }]
    },
    { name: "Group 4",
      type: "group",
       children: [{ 
        name: "Sub-Group 4.1",
        type: "sub-group",
        children:[{ name: "Device 4.1.2", type: "device" },{ name: "Device 4.1.3", type: "device" },{ name: "Device 4.1.4", type: "device" },{ name: "Device 4.1.5", type: "device" }]
        }]
    },
    {  name: "Group 7",
       type: "group",
       children: [{ name: "Device 7.1", type: "device" },{ name: "Device 7.2", type: "device" },{ name: "Device 7.3", type: "device" },{ name: "Device 7.4", type: "device" },{ name: "Device 7.5", type: "device" }]
    }
  ]
};

export default {
  props: [],
  name: 'AppManager',
  data () {
    return {
      operation: this.$store.state.LastLog,
      isLoading: false,
      styleObject: '',
      currAppId: '',
      count: 0,
      file: '',
      options: {},
      titleTools: [],
      label: 'Loading...',
      cats:[],
      currentSort:'app_name',
      currentSortDir:'asc',
      pageSize:1000,
      currentPage:1,
      appData: [],
      editAppName: '', 
      editDescription: '', 
      editVersion: '', 
      editFileName: '',
      selectedFile: '',
      message: '',
      deleteId:'',
      key:'',
      addAppData: {
        id: '',
        app_name: '',
        description: '', 
        version: '',
        file_name: '',
        size: '',
        date_modified: '',
        date_uploaded:''
      },
      cache: {},
      record: {},
      getOlderVersion: false,
      isAscending: true,
      isAscendingForName: true,
      isAscendingForVersion: 'NOT',
      isAscendingForSize: 'NOT',
      isAscendingForDateModify: 'NOT',
      isAscendingForDateUpload: 'NOT',
      
      screenHeight: '',
      token: '',
      selectedDevice: '',
      selectedDeviceNames: '',
      selectedDeviceArray: [],
      displayRowaction: false,
      selectedDeviceFullDetail: [],
    }
  },
  components: {
    Loading, draggable, AccordionGroupList, SoftwareHeader
  },
  created: function () {
     setTimeout(function(){
        $("table tr, table tr td").resizable({handles: 'e'})
     }, 1000);
     var self = this;    
     self.getList();
     EventBus.$on('applicationPopUp', (page) => {
      self.getList();
     });
     // Using the service bus
     EventBus.$on('deviceSelected', (model) => {
       console.log('When Click on Group');
       console.log(model);
      if(model.type === 'group'){
        
        self.selectedDeviceArray.push(model.trimmedName);
        self.selectedDeviceFullDetail.push(model);
      }
      if(model.type === 'device'){
        self.selectedDeviceArray.push(model.trimmedName);
        self.selectedDeviceFullDetail.push(model);
      }
      self.selectedDeviceNames = self.selectedDeviceArray.join(', ');
      //console.log(self.selectedDeviceFullDetail)      
     });
     EventBus.$on('deviceUnSelected', (model) => {
      if(model.type === 'device'){        
        self.selectedDeviceArray.forEach(function (val, key) {
          if(model.trimmedName == val){
            return self.selectedDeviceArray.splice(key, 1)            
          }          
        })
        self.selectedDeviceFullDetail.forEach(function (val, key) {          
          if(model.trimmedName == val.trimmedName){
            return self.selectedDeviceFullDetail.splice(key, 1)            
          }          
        })
      }
      self.selectedDeviceNames = self.selectedDeviceArray.join(', ');  
      //console.log(self.selectedDeviceFullDetail)   
     });
  },
  computed: {
    treeData: function(){
      return this.$store.state.tree
    },
    sortedData:function() {     
      this.cats = this.appData;
      if(this.cats){
        return this.cats.sort((a,b) => {
                  let modifier = 1;
                  if(this.currentSortDir === 'desc') modifier = -1;
                  if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                  if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                  return 0;
              }).filter((row, index) => {
                  let start = (this.currentPage-1)*this.pageSize;
                  let end = this.currentPage*this.pageSize;
                  if(index >= start && index < end) return true;
              });
      }  
    }
  },
  methods: {
    emitRefreshClickEvent (value) {
      let THIS = this
      THIS.isLoading = !THIS.isLoading
      if(THIS.isLoading){
          this.$store.state.Setting.toolTipTitle.refresh = 'Stop refreshing'
      }else{
          this.$store.state.Setting.toolTipTitle.refresh = 'Refresh'
      }
       var self = this;
        if(self.getOlderVersion){
             this.getWithOld();
        }else{ 
            this.getList();
        }      
      },
    install(){
        var self = this;
        self.token = window.localStorage.getItem('token');
        axios.post(API_URL+'device/assign/app',{'AppId':this.currAppId,'data':this.selectedDeviceFullDetail,'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':'kafLP47F0S8mVzhq3XQWUW1HNXaaEmzY'},{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ self.token
            }            
        }).then(function (data) {
              if(data) {
                 self.$modal.hide("install-application");
                 self.operation = 'Installing ' + self.currAppId + ' to Device';
                }
            }).catch(function (error) {
               console.log(error);
            }).then(function () {
              // always executed
        });
        // Log the Event for taskbar
        self.operation = 'Installing ' + self.currAppId + ' to ' + self.selectedDeviceFullDetail;
        this.$modal.hide("install-application");
      },
      isLatest(isLatest){
        if(isLatest==1){
          //return false;
          return true;
        }
        return false;
      },
      displayRow(key){
        // if(this.sortedData[key]['display']){
        //   this.sortedData[key]['display'] = false
        // } else {
        //   this.sortedData[key]['display'] = true
        // }
        // console.log(this.sortedData[key]['display']);
        //this.displayRowaction = false;
      },
      hideRow(key){
        this.sortedData[key]['display'] = false
        //this.displayRowaction = true;
      },
      getList(){ 
        var self = this;
        self.token = window.localStorage.getItem('token');
        axios.get(API_URL+'app/list/',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ self.token
               }            
        }).then(function (data) {
              if(data) {
                    self.appData = data['data']['result'];
                    self.cats = data['data']['result'];                    
                    setTimeout(function(){            
                      self.isLoading = false; // when refresh is used
                    },2000)
                }
            }).catch(function (error) {
               console.log(error);
            }).then(function () {
              $('.softwaremang td:not(.ifnotClick)').click(function(){
                  $('.softwaremang').removeClass('active');
                  $(this).parent().addClass('active');
                  $('.ifnotClick span').addClass('hide');
                  $(this).parent().find('.ifnotClick span').removeClass('hide');
              });
              // always executed
        }); 
      },
      getWithOld(){ 
        var self = this;
        self.token = window.localStorage.getItem('token');
        axios.get(API_URL+'app/listAll/',{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ self.token
               }            
            }).then(function (data) {           
                  if(data) {
                        self.appData = data['data']['result'];
                        self.cats = data['data']['result'];
                        setTimeout(function(){            
                          self.isLoading = false; // when refresh is used
                        },2000)
                    }
                }).catch(function (error) {
                   console.log(error);
                }).then(function () {
                  // always executed
                  $('.softwaremang td:not(.ifnotClick)').click(function(){
                      $('.softwaremang').removeClass('active');
                      $(this).parent().addClass('active');
                      $('.ifnotClick span').addClass('hide');
                      $(this).parent().find('.ifnotClick span').removeClass('hide');
                  });
            });

      },
      isOldData(data){
        if(data.isLatest == 0){
            return true;
        }
        return false;
      },
      isDisplay(data){
        if(data.display){
            return true;
        }
        return false;
      },
      checkboxToggle(){       
        var self = this;
        self.getOlderVersion = !self.getOlderVersion;
        if(self.getOlderVersion){
             this.getWithOld();
        }else{
            this.getList(); 
        }     
      },
      sort:function(s) {
        //if s == current sort, reverse
        if(s=="app_name"){
          this.isAscendingForVersion = "NOT";
          this.isAscendingForSize = "NOT";
          this.isAscendingForDateModify = "NOT";
          this.isAscendingForDateUpload = "NOT";
          
          if(this.isAscendingForName == "NOT"){
            this.isAscendingForName = false;
          }
          this.isAscendingForName = !this.isAscendingForName;
        }
        if(s=="version"){
          this.isAscendingForName = "NOT";
          this.isAscendingForSize = "NOT";
          this.isAscendingForDateModify = "NOT";
          this.isAscendingForDateUpload = "NOT";
          if(this.isAscendingForVersion == "NOT"){
            this.isAscendingForVersion = false;
          }
          this.isAscendingForVersion = !this.isAscendingForVersion;
        }
        if(s=="size"){
          this.isAscendingForName = "NOT";
          this.isAscendingForVersion = "NOT";
          this.isAscendingForDateModify = "NOT";
          this.isAscendingForDateUpload = "NOT";
          if(this.isAscendingForSize == "NOT"){
            this.isAscendingForSize = false;
          }
          this.isAscendingForSize = !this.isAscendingForSize;
        }
        if(s=="date_modified"){
          this.isAscendingForName = "NOT";
          this.isAscendingForVersion = "NOT";
          this.isAscendingForSize = "NOT";
          this.isAscendingForDateUpload = "NOT";
          if(this.isAscendingForDateModify == "NOT"){
            this.isAscendingForDateModify = false;
          }
          this.isAscendingForDateModify = !this.isAscendingForDateModify;
        }
        if(s=="date_uploaded"){
          this.isAscendingForName = "NOT";
          this.isAscendingForVersion = "NOT";
          this.isAscendingForSize = "NOT";
          this.isAscendingForDateModify = "NOT";
          if(this.isAscendingForDateUpload == "NOT"){
            this.isAscendingForDateUpload = false;
          }
          this.isAscendingForDateUpload = !this.isAscendingForDateUpload;
        }
        
        this.isAscending = !this.isAscending;
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      },
      nextPage:function() {
        if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
      },
      prevPage:function() {
        if(this.currentPage > 1) this.currentPage--;
      },
     /*
       Handles a change on the file upload
     */
     handleFileUpload(){
       this.file = this.$refs.file.files[0]; 
     },
     ListApplication(){
        alert('here');
     },
     newApplication(){     
          if($('input[name=app_name]').val() == "" ||  $('textarea[name=description]').val() == "" || $('input[name=version]').val() == "" || $('input[name=file_name]').val() == ""){
            alert('Please fill all field');
            return true;
          }
          var self = this;
          self.operation = 'Add Application '+$('input[name=app_name]').val(); 
          // Initialize the form data     
           self.token = window.localStorage.getItem('token');
           let company_id = window.localStorage.getItem('account_id')
           let formData = new FormData();
           //    Add the form data we need to submit

            formData.append('file', this.file);      
            formData.append('app_name', $('input[name=app_name]').val());
            formData.append('description', $('textarea[name=description]').val());
            formData.append('version', $('input[name=version]').val());
            formData.append('file_name', $('input[name=file_name]').val());

            axios.post( API_URL+'app/add',formData,{
               headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ self.token
               }
            }).then(function(data){
              if(data['data']['status'] == 200){
                self.getList();
                self.close('add-application');
                // Log the Event for taskbar
                
              }else{
                alert(data['data']['message']);
              }
            });
    },
    editApp(record){
      if (record.id === "") {
        this.$modal.show("add-application");
      } 
      else {
        this.$modal.show("edit-application");
        var self = this;
        self.token = window.localStorage.getItem('token');
        axios.get(API_URL+'app/list/'+record.id,{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Bearer '+ self.token
            }
        })
        .then(function (response) {
          if(response['status']==200) {
            console.log(response);
            self.editAppName = response['data']['result']['app_name'];
            self.editDescription = response['data']['result']['description'];
            self.editVersion = response['data']['result']['version'];
            //self.editFileName = response['data']['result']['file_name'];

            self.record = _.cloneDeep(record);
            self.cache = record;

            
            // Log the Event for taskbar
            self.operation = 'Edit Application '+response['data']['result']['app_name'];
          }
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });  
      }
    },
    doEdit: function (record) {     
     console.log(record.id);
     var self = this;
     let formData = new FormData();
     record.app_name = self.editAppName;
     record.description = self.editDescription;
     //record.version = self.editVersion;
     //record.file_name = self.editFileName;

     //    Add the form data we need to submit
     
      //formData.append('file', this.file);      
      formData.append('app_name', self.editAppName);
      formData.append('description', self.editDescription);
      //formData.append('version', self.editVersion);
      //formData.append('file_name', self.editFileName);

      axios.post( API_URL+'app/update/'+record.id,
       formData,
       {
         headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer '+ self.token
         }
       }).then(function(data){
            console.log(data['data']);
            if(data['data']['status'] == 200){
               alert(data['data']['result']);
               self.close('edit-application');
               // Log the Event for taskbar
               //self.operation = 'Complete Edit Application '+self.editAppName;
            }else{
               alert('Failed');
            }
       });

     var index = _.indexOf(self.appData, self.cache);
     //self.sortedData.splice(index, 1, record);
     self.appData.splice(index, 1, record);
    },
    deleteApp(id,key,appName){      
      this.$modal.show("delete-application");
      this.deleteId = id;
      this.key = key;
      this.message = '"'+ appName + '" will be deleted from server space.This cannot be undone.<br/><br/>Device with this application installed will not be affected.<br/><br/>Please confirm the operation.';

      // Log the Event for taskbar
      this.operation = 'Delete Application '+appName;
    },
    deleteApplication(){
      var self = this;
      axios.delete(API_URL+'app/delete/'+this.deleteId,{
        headers: {
              'Authorization': 'Bearer '+ self.token
        }
      }).then(function(data){
          if(data['data']['status'] == 200){
            self.message='';
            self.message = data['data']['message'];
            // Log the Event for taskbar
            self.operation = 'Delete Application '+appName+' Success';
           setTimeout(function(){
              self.close('delete-application');
              self.message = "";
            }, 1 * 1000);
           self.appData.splice(self.key, 1);
           //self.sortedData.splice(self.key, 1);
          }
      });
    },
    CheckDevice (namekey) {
      var check = 10
      let dataList = Object.values(this.$store.state.Device)
      // console.log('device')
      // console.log(dataList)
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
    handleSelectionChange (val) {
      this.multipleSelection = val
      this.$emit('emitTableRowClick', this.multipleSelection)
    },
    handleCurrentChange (val) {
      this.multipleSelection = ['0', val]
      this.$emit('emitTableRowClick', this.multipleSelection)
      this.$refs.singleTable.clearSelection()
      this.$refs.singleTable.toggleRowSelection(val)
    },
    checkState (field, val) {
      let fieldVal
      if (val === true) {
        fieldVal = false
      } else {
        fieldVal = true
      }
      this.$store.commit('ShowHideDetails', {key: field, value: fieldVal})
    },
    showHideColumn () {
      this.$modal.show('show-hide-column');
    },
    close (modalName) {
      this.$modal.hide(modalName);
    },
    installApp(app){
        this.selectedDevice = app.app_name +'(v' + app.version + ')';
        this.$modal.show("install-application");
   },
   opened(){
      var thHeight = $("table#appTable th:first").height();
      var thWidth = $("table#appTable th:first").width();
      $("table#appTable th,td").resizable({
          handles: "e",
          /*minHeight: thHeight-10,
          maxHeight: thHeight+40,*/
          minWidth: 40,
          resize: function (event, ui) {
            var sizerID = "#" + $(event.target).attr("id") + "-sizer";
            $(sizerID).width(ui.size.width);
          }
      }); 
   },
   installApp(app){
      this.selectedDevice = app.app_name +'(v' + app.version + ')';
      this.currAppId = app.id;
      this.$modal.show("install-application");
      // Log the Event for taskbar
      //self.operation = 'Open Install Application '+app.app_name+' Process';
   }
  },
  mounted () {
     this.titleTools = this.$store.state.Setting.toolTipTitle;
     //this.tableHeight = screen.height/1.43+'px';   
     this.styleObject =  $('header.main-header').outerHeight() +10+'px';
     /*added height to application list table*/
     this.screenHeight = screen.height - 300 +'px';
  }
}
</script>
<style>
body {
  overflow: hidden !important;
}
.editable {
    width :90%;
    height : 90%;
}
.content-wrapper {
  height: 100%;
}
.content-wrapper .el-table {
    overflow-x: scroll
}
.content-wrapper .el-table__footer-wrapper, .content-wrapper .el-table__header-wrapper {
    overflow: visible
}
.content-wrapper .el-table__body-wrapper {
    overflow: visible
}
.table-head {
  padding: 5px 15px;
  background: #f2f2f2;
}
#Table_azam {
    display: table;
    width:100%;
}
#Title_azam {
    display: table-caption;
    text-align: center;
    font-weight: bold;
    font-size: larger;
}
#Heading_azam {
    display: table-row;
    /* font-weight: bold; */
    text-align: center;
    background: #f5f5f5;
    color: #080808;
    font-size: 16px;
}
#Row_azam {
    display: table-row;
}
#Cell_azam {
    display: table-cell;
    border: 0.222em solid #020202;
    border-width: thin;
    padding-left: 5px;
    padding-right: 5px;
}
#content_azam{
    padding-top: 8px;
    text-align:center;
}
#head_azam{
    padding-top: 8px;
}
.scroll-azam{overflow-x:scroll; padding-left: 0px; padding-right: 0px;}
/*Radio and Checkbox START*/
.checkbox label:after, .radio label:after {
    content: '';
    display: table;
    clear: both;
}

.checkbox .cr,
.radio .cr {
    position: relative;
    display: inline-block;
    border: 1px solid #a9a9a9;
    border-radius: .25em;
    width: 1.3em;
    height: 1.3em;
    float: left;
    margin-right: .5em;
}
.radio .cr {
    border-radius: 50%;
}
.checkbox .cr .cr-icon,
.radio .cr .cr-icon {
    position: absolute;
    font-size: .8em;
    line-height: 0;
    top: 50%;
    left: 20%;
}
/*.checkbox label input[type="checkbox"],
.radio label input[type="radio"] {
    display: none;
}*/
.checkbox label input[type="checkbox"] + .cr > .cr-icon,
.radio label input[type="radio"] + .cr > .cr-icon {
    transform: scale(3) rotateZ(-20deg);
    opacity: 0;
    transition: all .3s ease-in;
}
.checkbox label input[type="checkbox"]:checked + .cr > .cr-icon,
.radio label input[type="radio"]:checked + .cr > .cr-icon {
    transform: scale(1) rotateZ(0deg);
    opacity: 1;
}

.checkbox label input[type="checkbox"]:disabled + .cr,
.radio label input[type="radio"]:disabled + .cr {
    opacity: .5;
}

  .left-top{display: inline-flex}
  .y-scroll{overflow: scroll;height: 580px;    padding: 10px;}
.left-sidebar-toggle {
  color: #223a5e;
  background: #fff;
  border: 1px solid #e3e3e3;
  padding: 2px;
  border-radius: 3px;
}
.centerBar .tbl-title {
  padding: 0px 0;
  line-height: 25px;
  color: #223a5e;
}
a:hover{ text-decoration:none !important;}

/*custom css*/
.application-table .modal-header{
    background: #eef2f3;
    color: #223a5e;
    padding: 9px 10px 3px !important;
}

.application-table .modal-body {
    padding: 15px !important;
}

.application-table .form-group label {
    padding-bottom: 0px;
}

.application-table .modal-footer .btn {
    padding: 6px 12px;
}

.application-table .btn-close {
    background: transparent;
}

.btn-close.active.focus, .btn-close.active:focus, .btn-close.focus, .btn-close:active.focus, .btn-close:active:focus, .btn-close:focus,.btn-close:hover {
    outline: none;
    color: #fff;
}

.application-table table thead th{
    background: #eaeaea;
    border-top: 1px solid #C2C7CF !important;
}

.action-icon {
    margin: 0 5px;
}
.app-head-title {
    padding: 5px 10px 2px;
    background: #ececec;
    border: 1px solid lightgrey;
}

.status-bar {
    background: #b3b3b3;
    width: 100%;
    padding: 10px;
    font-size: 13px;
    color: #000;
    display: inline-block;
    margin-bottom: -6px;
}

.sort-icon a{
  cursor:pointer;
}
td.child-td-label {
    padding-left: 30px !important;
}
.cb-box {
    padding: .1rem .4rem .1rem 1.2rem;
    position: relative;
}
.cb {
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px!important;
    overflow: hidden;
    position: absolute;
    width: 1px;
}
.cb-icon{
    border-radius: .1rem;
    background: #fff;
    height: 1.6rem;
    left: 50%;
    top: 50%;
    width: 1.6rem;
    border: .05rem solid #223a5e;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    transform: translate(-50%,-50%);
}

.cb:checked+.cb-icon::before {
    background-clip: padding-box;
    border: 0.15rem solid #ec6c00;
    border-left-width: 0px;
    border-top-width: 0px;
    content: "";
    height: 11px;
    left: 50%;
    margin-left: -2px;
    margin-top: -7px;
    position: absolute;
    top: 50%;
    -webkit-transform: rotate(45deg);
    width: 5px;
}
#app .cd-accordion-menu{
    height: 400px;
    overflow: scroll;
    display: inline-block;
    width: 100%;
}
.deviceMsg {
    color: #223a5e;
    font-size: 16px;
    font-weight: bold;
}
.totalDevice .label {
    font-size: 16px;
    font-weight: bold;
    color: #223a5e;
}
.totalDevice {
    margin-top: 30px;
}
.totalDevice .title{
    font-size: 14px;
    color: #223a5e;
    font-weight: bold;
}
.installApp .modal-footer {
    margin-top: 50%;
    text-align: center;
}
.installApp .modal-footer button {
    padding: 4px 12px !important;
    width: 100px;
    margin-bottom: 10px;
}

.appInfo {
    float: right;
    cursor: pointer;
}
.olderVersion {
    background: repeating-linear-gradient(45deg, rgba(160, 160, 160, 0.13), rgba(225, 225, 225, 0.12) 7px, rgba(135, 135, 135, 0.3) 10px, rgba(144, 144, 144, 0.3) 13px);
    opacity: .5;
}
.deviceView .btn {
    padding: 1px 10px;
    width: 50px;
    border: 1px solid;
    background: #fff;
    float: none;
}
.deviceView .btn:focus,
.deviceView .btn:active {
  outline: none;
}
.deviceView .btnList {
    border-top-left-radius: 18px;
    border-bottom-left-radius: 18px;

}
.deviceView .btnMap {
    border-top-right-radius: 18px;
    border-bottom-right-radius: 18px;
}
.deviceView.btn-group .btn+.btn {
  margin-left: -5px;
}
.deviceView {
    width: 100%;
    text-align: center;
    margin: 5px 0;
}
.deviceView .active {
    background: #EC6C00;
    border-color: #EC6C00;
    color: #fff;
}
 #statusLogModal .v--modal-box.v--modal {
    width: 50% !important;
   /* margin: 0 auto !important;*/
}
#appicationList .v--modal{
  top: 50px!important;
    left: 1% !important;
    width: 98% !important;
}
#appicationList.v--modal-overlay {
    background: rgba(0, 0, 0, 0.8) !important;
}
#appicationList .showOldList label{
    padding: 0;
    margin-top: 8px;
}

.v--modal-overlay {
  overflow: scroll
}

#appicationList .applistheader,
#appicationList .applistfooter {
  padding: 0!important;
}
.applistfooter {
    position: absolute;
    bottom: 0;
    width: 100%;
}
#appicationList .subHeader {
    padding: 0px 10px;
    display: inline-block;
    width: 100%;
}
#appTable tr td {
  position: relative;
}
.webIcon {
    background-image: url(/images/benqIcons.png);
    display: inline-block;
    right: 10px;
    width: 14px;
    height: 21px;
    transition: none;
}
.appInfoTag {
    background-position: -1269px 0;
    margin-top: 5px;
    position: absolute;
}
.installIcon {
    background-position: -287px 0;
    width: 20px;
}
#appTable tr:hover .installIcon {
  background-position: -319px 0; width: 21px;
}
.editIcon {
  background-position: -226px 0px;width: 20px;
}
#appTable tr:hover .editIcon {
   background-position: -256px 2px;
}
.deleteIcon {
  background-position: -1313px 0;width: 21px;
}
#appTable tr:hover .deleteIcon {
  background-position: -348px 0; 
}
#appTable tr:hover .appInfoTag {
    background-position: -1291px 0;
}
.addAppIcon {
    background-position: -161px 7px;
    width: 25px;
    height: 36px;
}
.deviceIcon {
    background-position: -1102px 3px;
    height: 14px;
}
.refreshIcon {
    background-position: -965px 4px;
    width: 31px;
    height: 31px;
}
#appTable tr td {
  position: relative;
}
#appTable tr:hover {
  background: #ec6c00;
  color: #fff;
}
#appTable thead tr:hover {
  color: #000;
}
.showOlderVersion {
    position: relative;
    height: 18px;
    width: 18px;
    float: left;
    margin: 0 5px !important;
    cursor: pointer;
}
.showOlderVersion:after {
    content: '\D7';
    display: block;
    background: #fff url(/images/checked.svg) no-repeat 0 15px;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    color: transparent;
    -webkit-transition: .25s all ease-in-out;
    transition: .25s all ease-in-out;
    border: 2px solid #272727;
    background-size: 15px 12px;
    border-radius: 3px; 
}
.showOlderVersion:checked:after {
    background-position: 0 0;
}

.tooltipTable tr td {
    width: 50%;
    line-height: 1.8rem;
}

.tooltipText {
    visibility: hidden;
    width: 240px;
    background-color: #f6f6f6;
    box-shadow: 1px 1px 11px #000;
    color: #000;
    text-align: left;
    border-radius: 6px;
    padding: 10px 20px;
    position: absolute;
    z-index: 1;
    font-size: 10px;
    top: 20px;
}
.tooltipDiv {
    cursor: pointer;
}
.tooltipTitle {
    margin: 0;
    border-top: 1px solid #000;
    padding-top: 8px;
}
.tooltipDiv,
.tooltipTable tr,
.tooltipTable {
    transition: none !important;
}
.tooltipHeader p {
    margin-bottom: 5px;
}
.table.tooltipTable {
  background-color: #f6f6f6;
}

.tooltipDiv:hover .tooltipText {
    visibility: visible;
}
/* .overflowData {
  overflow: scroll;
} */
.tooltip-dt-style td {
    background: transparent !important;
    color: #000 !important;
 }

</style>
