<template>
<!-- <drop @drop="divOuter"> -->
<div class="content-wrapper" id="resizable" @click="ClickEventOverTable()">
<div class="table-content">
  <div class="table-head clearfix">
      <div class="left-top pull-left"> <a class="left-sidebar-toggle" href="#" v-bind:title="titleTools.ShowHide" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><span class="img-icon-benq-1 icon-6 nav-icon"></span> </a>  &nbsp;&nbsp;<div class="tbl-title">{{ tablegroup }} </div> </div>
    <div class="pull-right">{{count}} Row Selected</div>
    
  </div>
  <div class="container-fluid padding-0">
        <div class="demo-content">
    <!-- <drop @drop="drop" @dragover="handleDragover" @dragleave="handledragleave"> -->
      <table id="footerTable" class="sar-table ui-widget-content table table-bordered table-border-main-cn">
        <thead>
            <tr><th><div class="some-handle"></div><div id="titleChange" class="checkbox" v-on:mouseover="mouseOver" @click="CheckAll()"><label><input type="checkbox" style="display:none" v-model="forCheckAll"><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div>              </th>
                <th class="accept" v-if="tempColdata.name" id="facility_header" @click="sort('name')"><div class="some-handle"></div>Name
                    <span v-show="dev.name != 'NOT'">
                      <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('name')">▼</a><a v-else @click="sort('name')">▲</a></span>
                    </span>
                </th>
                <th class="accept" v-if="tempColdata.description" @click="sort('description')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Description
                  <span v-show="dev.description != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('description')">▼</a><a v-else @click="sort('description')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.group" @click="sort('group')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Group
                  <span v-show="dev.group != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('group')">▼</a><a v-else @click="sort('group')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.power" @click="sort('power')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Power
                  <span  v-show="dev.power != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('power')">▼</a><a v-else @click="sort('power')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.status" @click="sort('status')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Status
                  <span v-show="dev.status != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('status')">▼</a><a v-else @click="sort('status')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.model" @click="sort('model')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Model name
                  <span v-show="dev.model != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('model')">▼</a><a v-else @click="sort('model')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.serialNo" @click="sort('serialNo')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Serial Number
                  <span v-show="dev.serialNo != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('serialNo')">▼</a><a v-else @click="sort('serialNo')">▲</a></span>
                  </span> 
                </th>
                <th class="accept" v-if="tempColdata.ip" @click="sort('ip')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>IP Address
                  <span v-show="dev.ip != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('ip')">▼</a><a v-else @click="sort('ip')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.input" @click="sort('input')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Input source
                  <span v-show="dev.input != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('input')">▼</a><a v-else @click="sort('input')">▲</a></span>
                  </span>
                </th>
                <th class="accept" v-if="tempColdata.picture" @click="sort('picture')"><div class="some-handle"><i class="fa fa-arrows-alt"></i></div>Picture mode
                  <span v-show="dev.picture != 'NOT'">
                    <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('picture')">▼</a><a v-else @click="sort('picture')">▲</a></span>
                  </span>
                </th>
            </tr>
        </thead>
        <!-- <tbody class="DropTable"> -->
            <!-- <tr v-for="(data, key) in tableData" v-bind:key="key" :class="{'active' :forCheckBox[key]}">
                {{insertValueId(key)}}
                <th><div class="checkbox" @click="getDeviceInfo(key)"><label><input type="checkbox" v-model="forCheckBox[key]" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div></th>
                <td v-if="tempColdata.name"><span v-if="editableData.info != key" v-on:dblclick="InLineEdit(data, key, 'name', forCheckBox[key])">{{data.name}}</span> <span v-if="editableData.info == key" @click.self="InLineDataUpdate(data, key)"><input type="text" autofocus class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.description"><span v-if="editableData.info != key+199" v-on:dblclick="InLineEdit(data, key+199, 'description', forCheckBox[key])">{{data.description}}</span> <span v-if="editableData.info == key+199" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.group"><span v-if="editableData.info != key+299" v-on:dblclick="InLineEdit(data, key+299, 'group', forCheckBox[key])">{{tablegroup}}</span> <span v-if="editableData.info == key+299" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.power"><span v-if="editableData.info != key+399" v-on:dblclick="InLineEdit(data, key+399, 'power', forCheckBox[key])">{{data.power}}</span> <span v-if="editableData.info == key+399" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.status"><span v-if="editableData.info != key+499" v-on:dblclick="InLineEdit(data, key+499, 'signalStatus', forCheckBox[key])">{{data.signalStatus}}</span> <span v-if="editableData.info == key+499" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.model"><span v-if="editableData.info != key+599" v-on:dblclick="InLineEdit(data, key+599, 'model', forCheckBox[key])">{{data.model}}</span> <span v-if="editableData.info == key+599" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.serialNo"><span v-if="editableData.info != key+699" v-on:dblclick="InLineEdit(data, key+699, 'serialNo', forCheckBox[key])">{{data.serialNo}}</span> <span v-if="editableData.info == key+699" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.ip"><span v-if="editableData.info != key+799" v-on:dblclick="InLineEdit(data, key+799, 'ip', forCheckBox[key])">{{data.ip}}</span> <span v-if="editableData.info == key+799" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.input"><span v-if="editableData.info != key+899" v-on:dblclick="InLineEdit(data, key+899, 'inputSource', forCheckBox[key])">{{data.inputSource}}</span> <span v-if="editableData.info == key+899" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.picture"><span v-if="editableData.info != key+999" v-on:dblclick="InLineEdit(data, key+999, 'pictureMode', forCheckBox[key])">{{data.pictureMode}}</span> <span v-if="editableData.info == key+999" @click.self="InLineDataUpdate(data, key)"><input autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
            </tr> -->
            <draggable element="tbody" @end="DragEnd" :list="Object.values(tableData)" :clone='clone' :move='checkMove' class="DropTable" :options="{draggable:'tr.active', sort:false}">
            <tr v-for="(data, key) in tableData" v-bind:key="key" :class="{'active' :forCheckBox[key], 'Noactive' :!forCheckBox[key]}">
                {{insertValueId(key)}}
                <th><div class="checkbox" @click="getDeviceInfo(key)"><label><input type="checkbox" style="display:none" v-model="forCheckBox[key]" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div></th>
                <td @click.self="getDeviceInfo(key)" v-if="tempColdata.name"><span v-if="editableData.info != key+'name'" v-on:dblclick="InLineEdit(data, key+'name', 'name', forCheckBox[key])" :title="data.name">{{data.name | trimDeviceName}}</span> <span v-if="editableData.info == key+'name'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" type="text" autofocus class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click.self="getDeviceInfo(key)" v-if="tempColdata.description"><span v-if="editableData.info != key+'description'" v-on:dblclick="InLineEdit(data, key+'description', 'description', forCheckBox[key])">{{data.description}}</span> <span v-if="editableData.info == key+'description'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click.self="getDeviceInfo(key)" v-if="tempColdata.group"><span v-if="editableData.info != key+'group'" >{{ReturnGroupName(data.group_id)}}</span> <span v-if="editableData.info == key+'group'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.power"><span v-if="editableData.info != key+'power'" >{{data.power}}</span> <span v-if="editableData.info == key+'power'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.status"><span v-if="editableData.info != key+'status'">{{data.signalStatus}}</span> <span v-if="editableData.info == key+'status'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.model"><span v-if="editableData.info != key+'model'">{{data.model}}</span> <span v-if="editableData.info == key+'model'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.serialNo"><span v-if="editableData.info != key+'serialNo'">{{data.serialNo}}</span> <span v-if="editableData.info == key+'serialNo'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.ip"><span v-if="editableData.info != key+'ip'">{{data.ip}}</span> <span v-if="editableData.info == key+'ip'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.input"><span v-if="editableData.info != key+'input'">{{data.inputSource}}</span> <span v-if="editableData.info == key+'input'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td @click="getDeviceInfo(key)" v-if="tempColdata.picture"><span v-if="editableData.info != key+'picture'">{{data.pictureMode}}</span> <span v-if="editableData.info == key+'picture'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>

                <!-- <td v-if="tempColdata.group"><span v-if="editableData.info != key+'group'" v-on:dblclick="InLineEdit(data, key+'group', 'group', forCheckBox[key])">{{tablegroup}}</span> <span v-if="editableData.info == key+'group'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.power"><span v-if="editableData.info != key+'power'" v-on:dblclick="InLineEdit(data, key+'power', 'power', forCheckBox[key])">{{data.power}}</span> <span v-if="editableData.info == key+'power'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.status"><span v-if="editableData.info != key+'status'" v-on:dblclick="InLineEdit(data, key+'status', 'signalStatus', forCheckBox[key])">{{data.signalStatus}}</span> <span v-if="editableData.info == key+'status'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.model"><span v-if="editableData.info != key+'model'" v-on:dblclick="InLineEdit(data, key+'model', 'model', forCheckBox[key])">{{data.model}}</span> <span v-if="editableData.info == key+'model'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.serialNo"><span v-if="editableData.info != key+'serialNo'" v-on:dblclick="InLineEdit(data, key+'serialNo', 'serialNo', forCheckBox[key])">{{data.serialNo}}</span> <span v-if="editableData.info == key+'serialNo'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.ip"><span v-if="editableData.info != key+'ip'" v-on:dblclick="InLineEdit(data, key+'ip', 'ip', forCheckBox[key])">{{data.ip}}</span> <span v-if="editableData.info == key+'ip'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.input"><span v-if="editableData.info != key+'input'" v-on:dblclick="InLineEdit(data, key+'input', 'inputSource', forCheckBox[key])">{{data.inputSource}}</span> <span v-if="editableData.info == key+'input'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td>
                <td v-if="tempColdata.picture"><span v-if="editableData.info != key+'picture'" v-on:dblclick="InLineEdit(data, key+'picture', 'pictureMode', forCheckBox[key])">{{data.pictureMode}}</span> <span v-if="editableData.info == key+'picture'" @click.self="InLineDataUpdate(data, key)"><input @click="ClickOverTextBox" autofocus type="text" class="editable form-control" v-model="editableData.editableDataValue"></span></td> -->
            </tr>
            <!-- <tr v-if="hover" style="background-color:gray;color:white">
                <th><div class="checkbox"><label><input type="checkbox" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div></th>
                <td v-if="tempColdata.name">{{DroptableData.name}}</td>
                <td v-if="tempColdata.description">{{DroptableData.description}}</td>
                <td v-if="tempColdata.group">{{DroptableData.group}}</td>
                <td v-if="tempColdata.power">{{DroptableData.power}}</td>
                <td v-if="tempColdata.status">{{DroptableData.signalStatus}}</td>
                <td v-if="tempColdata.model">{{DroptableData.model}}</td>
                <td v-if="tempColdata.serialNo">{{DroptableData.serialNo}}</td>
                <td v-if="tempColdata.ip">{{DroptableData.ip}}</td>
                <td v-if="tempColdata.input">{{DroptableData.inputSource}}</td>
                <td v-if="tempColdata.picture">{{DroptableData.pictureMode}}</td>
            </tr> -->
            </draggable>
        <!-- </tbody> -->
      </table>
    <!-- </drop> -->
    </div>
    <div class="modal-ShowHide">
    <modal name="show-hide-column">
          <header class="modal-header">
            <slot name="header">
           <h4>Show/Hide Column 
              <button type="button" class="btn btn-close" @click="close"><i class="fa fa-times"></i></button>
          </h4>  </slot>
          </header>
          <section class="modal-body row col-md-12 custom_chk">
            <slot name="body">
                    <div class="col-md-12 disableName">
                        <input type="checkbox" id="name-checkbox" v-if="(column.name ? 'true':'false')" @click="checkState('name',column.name)"  v-model="column.name">
                        <label for="name-checkbox">Name</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="description-checkbox" v-if="(column.description ? 'true':'false')" @click="checkState('description',column.description)" v-model="column.description">
                        <label @click="checkState('description',column.description)">Description</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="group-checkbox" v-if="(column.group ? 'true':'false')"  v-model="column.group">
                        <label @click="checkState('group',column.group)">Group</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="power-checkbox" v-if="(column.power ? 'true':'false')"  v-model="column.power">
                        <label @click="checkState('power',column.power)">Power</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="status-checkbox" v-if="(column.status ? 'true':'false')"  v-model="column.status">
                        <label @click="checkState('status',column.status)">Status</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="model-checkbox" v-if="(column.model ? 'true':'false')"  v-model="column.model">
                        <label @click="checkState('model',column.model)">Model Name</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="serialNo-checkbox" v-if="(column.serialNo ? 'true':'false')"  v-model="column.serialNo">
                        <label @click="checkState('serialNo',column.serialNo)">Serial Number</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="ip-checkbox" v-if="(column.ip ? 'true':'false')"  v-model="column.ip">
                        <label @click="checkState('ip',column.ip)">IP Address</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="input-checkbox" v-if="(column.input ? 'true':'false')"  v-model="column.input">
                        <label @click="checkState('input',column.input)">Input Source</label>
                    </div>
                    <div class="col-md-12">
                        <input type="checkbox" id="picture-checkbox" v-if="(column.picture ? 'true':'false')"  v-model="column.picture">
                        <label @click="checkState('picture',column.picture)">Picture Mode</label>
                    </div>
            </slot>
          </section>
          <footer class="modal-footer border-none">
              <slot name="footer">
                <button type="button" class="btn-green btn" @click="updateColumnSetting">Ok</button>
                <button type="button" class="btn-default btn" @click="close">Cancel</button>
            </slot>
          </footer>
      </modal>
      </div>
    </div>
</div>
</div>
<!-- </drop> -->
</template>
<!-- built files will be auto injected -->
<script>
import { EventBus } from './../EventBus/event-bus.js'
import loading from 'vue-full-loading'
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
  props: [ 'tablegroup', 'tablegroupid', 'clickTarget' ],
  name: 'HelloWorld',
  data () {
    return {
      dev : {'name':true,'description':'NOT','group':'NOT','power':'NOT','status':'NOT','model':'NOT','serialNo':'NOT','ip':'NOT','input':'NOT','picture':'NOT'},
      count: 0,
      options: {'draggable': '.Noactive', 'filter': '.Noactive'},
      handle: '.handle',
      active: '.active',
      DropIDArr: [],
      enlineEditObj: {checkKey:false, IsActiveField:false},
      titleTools: [],
      show: true,
      label: 'Loading...',
      flag: false,
      // tableData: [{'name': 'text', 'model': 'text', 'type': 'text', 'group': 'text', 'MACAddress': 'text', 'IPAddress': 'text', 'SerialNumber': 'text', 'Version': 'text'}],
      forCheckAll: false,
      forCheckBox: [],
      multipleSelection: [],
      hover: false,
      editableData: {info: null, editableDataValue: null, editableKey: null},
      checkIfOutsideDrop: true,
      tempColdata: {name: true, description: false, group: true, power: true, status: true, model: true, serialNo: true, ip: true, input: true, picture: false},
      cats:[],
      currentSort:'name',
      currentSortDir:'asc',
      pageSize:1000,
      currentPage:1,
      isAscending: true,
      selectedDeviceCount: 0,
      selectedDeviceKeyArr: [],
      selectedGroupId: '',
    }
  },
  components: {
    loading, draggable
  },
  created: function () {
     var self = this;
    EventBus.$on('communicateAllChildToChild', clickCount => {
      this.showHideColumn()
    });
    EventBus.$on('navClickGroupId', gid => {      
      self.resetCheckbox();
      self.count= 0
      self.selectedDeviceCount = 0
      self.selectedGroupId = gid;      
      self.selectedDeviceKeyArr = []; 
    });
  },
  filters: {
    trimDeviceName: function (value) {      
      value = value.toString()
      if (value.length > 9) {
        return value.substring(0,9) + '...';
      }else{
        return value
      }
      
    }
  },
  computed: {
    column: function () {
      return this.$store.state.Setting.showHideColumn
    },    
    tableData:function() {  
        this.checkOutSideDrop()
         this.cats = this.$store.state.Setting.DisplayTableData;
         if(this.$store.state.Setting.DisplayTableData.length > 0){
            return this.$store.state.Setting.DisplayTableData.sort((a,b) => {
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
         else{
            return this.$store.state.Setting.DisplayTableData;
         }
    },
    // tableData: function () {
    //   this.checkOutSideDrop()
    //   return Object.values(this.$store.state.Setting.DisplayTableData).sort()
    // },
    DroptableData: function () {
      $('.showArea').removeClass('showArea');
      return this.$store.state.Setting.DragdropContainer.list
    }
  },
  methods: {
   mouseOver: function() {
       var self = this;
       if (self.forCheckAll == false) {
            $('#titleChange').prop('title', 'Select All');
       } else {
            $('#titleChange').prop('title', 'Unselect All');
       }
    },
    resetCheckbox: function(){        
        var self = this;
        if (self.forCheckAll=='checked' || self.forCheckBox.length > 0) {
            self.forCheckBox = []       
            self.forCheckAll = false
        }           
        $('#also').hide();
        $('.centerBar').width('100%')      
    },
    sort:function(s) {
       console.log('OKKKKKKKKKKKKKK');
       this.getCorrectSorting(s);
       
       // / alert(s)
        //if s == current sort, reverse
        this.isAscending = !this.isAscending;
        if(s === this.currentSort) {
          this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
        }
        this.currentSort = s;
      },
      getCorrectSorting:function(show) {
        this.dev.name = 'NOT';
        this.dev.description = 'NOT';
        this.dev.group = 'NOT';
        this.dev.power = 'NOT';
        this.dev.status = 'NOT';
        this.dev.model = 'NOT';
        this.dev.serialNo = 'NOT';
        this.dev.ip = 'NOT';
        this.dev.input = 'NOT';
        this.dev.picture = 'NOT';

        if(show == "name")
        this.dev.name = true;

        if(show == "description")
        this.dev.description = true;

        if(show == "group")
        this.dev.group = true;

        if(show == "power")
        this.dev.power = true;

        if(show == "status")
        this.dev.status = true;

        if(show == "status")
        this.dev.status = true;

        if(show == "model")
        this.dev.model = true;

        if(show == "serialNo")
        this.dev.serialNo = true;

        if(show == "ip")
        this.dev.ip = true;

        if(show == "input")
        this.dev.input = true;

        if(show == "picture")
        this.dev.picture = true;
        //console.log(this.dev);
      },
      nextPage:function() {
        if((this.currentPage*this.pageSize) < this.cats.length) this.currentPage++;
      },
      prevPage:function() {
        if(this.currentPage > 1) this.currentPage--;
      },
    ReturnGroupName: function (GroupId) {
      if(this.$store.state.L2[GroupId]){
        return this.$store.state.L2[GroupId].display_name;
      }
      if(this.$store.state.L3[GroupId]){
        return this.$store.state.L3[GroupId].display_name;
      }
      if(this.$store.state.L4[GroupId]){
        return this.$store.state.L4[GroupId].display_name;
      }
      if(this.$store.state.L5[GroupId]){
        return this.$store.state.L5[GroupId].display_name;
      }
      if(this.$store.state.L6[GroupId]){
        return this.$store.state.L6[GroupId].display_name;
      }
    },
    DragEnd: function () {
      let THIS = this
      THIS.forCheckBox.forEach(function (val, key1) {
          THIS.forCheckBox[key1] = false
      })
      THIS.forCheckBox = []
    },
    checkMove (evt) {
      $('.DropTable .Noactive').hide();
      //console.log(evt)
    },
    clone (e) {
      //console.log('I',e)
    },
    ClickOverTextBox (e) {
      e.stopImmediatePropagation()
      return true 
    },
    ClickEventOverTable () {
        if(this.enlineEditObj.checkKey || this.enlineEditObj.checkKey==0){
          if(this.enlineEditObj.IsActiveField){
            this.InLineDataUpdate(this.tableData[this.enlineEditObj.checkKey], this.enlineEditObj.checkKey)
          }
        }
    },
    CheckAll () {
      var self = this
      self.selectedDeviceKeyArr =[]
      if (!self.forCheckAll) {    
        self.forCheckBox.forEach(function (val, key) {
          self.forCheckBox[key] = 'checked' 
          self.selectedDeviceKeyArr.push(key);          
            if(self.tableData.hasOwnProperty(key)){
                 $('.sidebar ul[id='+self.selectedGroupId+']').find('li span[data-devicekey="'+self.tableData[key]['name']+'"]').prop('class','active');
            }
        })
        self.forCheckAll = 'checked'
      } else {
        self.forCheckBox.forEach(function (val, key) {
          self.forCheckBox[key] = false 
          for (var index in self.selectedDeviceKeyArr) {
            if (self.selectedDeviceKeyArr[index] == key) {
                self.selectedDeviceKeyArr.splice(index, 1);
            }
        }           
            if(self.tableData.hasOwnProperty(key)){
                $('.sidebar ul[id='+self.selectedGroupId+']').find('li span[data-devicekey="'+self.tableData[key]['name']+'"]').removeClass('active');
            }        
        })
        self.forCheckAll = false
      }
      console.log('selectedDeviceKeyArr :')
      console.log(self.selectedDeviceKeyArr)
      let count = 0
      self.forCheckBox.forEach(function(key, value){
        if(key == 'checked'){
          count = count +1
        }
      })
      self.count = count
    },
    checkOutSideDrop () {
      this.checkIfOutsideDrop = 'true'
    },
    insertValueId (id) {
      if (this.forCheckBox[id]) {
      } else {
        this.forCheckBox[id] = false
      }
    },
    InLineEdit (data, key, fieldName, IsActivecheckBox) {
      if(IsActivecheckBox){
        this.enlineEditObj.IsActiveField = fieldName
        this.editableData.editableDataValue = data[fieldName]
        this.editableData.editableKey = fieldName
        this.editableData.info = key
      }
    },
    InLineDataUpdate (data1, key) {
      if (this.editableData) {
        let parentNode = this.$store.state.Setting.GetParentKey.parentnode
        let name = this.editableData.editableKey
        let value = this.editableData.editableDataValue
        //console.log(data1)
        let flag = true
        if(name === 'name') {
          let check = this.CheckDevice(value)
          if(check == 10){
            this.$store.commit('RenameDevice', {'name':value ,'deviceID': data1.device_id, 'groupkey': data1.group_id, 'key': key})
            flag = false
          } else {
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
            flag = false
          }
        }

        if(name === 'mac') {
          this.$store.commit('UpdateMacValue', {'groupId':data1.group_id ,'metaKey': name, 'metaValue': value, 'deviceId': data1.device_id, 'key': key})
          flag = false
        }

        if(flag) {
          this.$store.commit('UpdateMetaValue', {'groupId':data1.group_id ,'metaKey': name, 'metaValue': value, 'deviceId': data1.device_id, 'key': key})
        }

        this.editableData.info = null
        this.editableData.editableDataValue = null
        this.editableData.editableKey = null
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
    updateColumnSetting () {
      let data = this.$store.state.Setting.showHideColumn
      this.tempColdata.description = data.description
      this.tempColdata.type = data.type
      this.tempColdata.group = data.group
      this.tempColdata.power = data.power
      this.tempColdata.status = data.status
      this.tempColdata.model = data.model
      this.tempColdata.serialNo = data.serialNo
      this.tempColdata.ip = data.ip
      this.tempColdata.input = data.input
      this.tempColdata.picture = data.picture
      this.close()
    },
    dragStart (event) {
      event.dataTransfer.setData('Text', event.target.id)
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
      this.$modal.show('show-hide-column')
    },
    close () {
      this.$modal.hide('show-hide-column')
    },
    drop (event, data) {
      let containerParentKey = this.$store.state.Setting.GetParentKey.parentnode
      this.$store.commit('AppendDataIntoActualPlace', containerParentKey)
      this.hover = false
      this.checkIfOutsideDrop = false
    },
    divOuter () {
      if (this.checkIfOutsideDrop) {
        this.$store.commit('RecoverTableSchemaDropOtherSide')
        this.checkIfOutsideDrop = false
      }
    },
    handleDragover () {
      if (!this.hover) {
        this.hover = true
      }
    },
    handledragleave () {
      if (this.hover) {
        this.hover = false
      }
    },
    getDeviceInfo (key) {
      let Arr = this.DropIDArr
      var self = this
      self.enlineEditObj.checkKey = key
      self.forCheckAll = false
      const flag = self.forCheckBox[key]
      self.selectedDeviceCount = self.count
      //alert(this.selectedDeviceCount)
      if (!flag) {
        // This is for Device Selection
        $('.sidebar ul[id='+self.tableData[key].group_id+']').find('li span[data-devicekey="'+self.tableData[key]['name']+'"]').prop('class','active');
        self.forCheckBox[key] = 'checked'
        self.flag = true
        Arr[key] = self.tableData[key].device_id
        self.selectedDeviceCount++;
        self.selectedDeviceKeyArr.push(key);       
        //if(this.selectedDeviceCount == 1){
           // THIS.$store.commit('GetDeviceFullInfo', {data: this.tableData[key], key: key})
        //}       
        
        //console.log('AllowCheck',THIS.tableData[key])
      }else {       
        // This is for Device Selection
        $('.sidebar ul[id='+self.tableData[key].group_id+']').find('li span[data-devicekey="'+self.tableData[key]['name']+'"]').removeClass('active');
        delete Arr[key];
        self.forCheckBox[key] = false
        self.flag = false
        self.selectedDeviceCount--;        
        //this.selectedDeviceKeyArr.splice(0,1,key);  
        for (var index in self.selectedDeviceKeyArr) {
            if (self.selectedDeviceKeyArr[index] == key) {
                //alert(key)
                self.selectedDeviceKeyArr.splice(index, 1);
            }
        }       
      }
      //alert(this.selectedDeviceCount)
      if(self.selectedDeviceCount == 1){
            self.$store.commit('GetDeviceFullInfo', {data: self.tableData[self.selectedDeviceKeyArr[0]], key: self.selectedDeviceKeyArr[0]})
            self.$store.commit('SetTableSelectDeviceId', {data: Arr})
      self.$store.commit('DisplaySoftwareList', {})
      } 
      
      //alert(this.selectedDeviceCount)
      let count = 0
      self.forCheckBox.forEach(function(key, value){
        if(key == 'checked'){
          count = count +1
        }
      })
      self.count = count
      self.$store.commit('noRowSelectedOnTable', {count: count})
      
      
      if(count == 1){
        $('#also').css('display','block');
      }else{
        $('#also').hide();
        $('.centerBar').width('100%')
      }

      // Call to Check Status
      //var self = this;
        self.token = window.localStorage.getItem('token');
        axios.post(API_URL+'device/get/status',{'device_id':self.tableData[key]['device_id'],'bdid':self.tableData[key]['bdid'],'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY},{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ self.token
               }            
        }).then(function (data) {
              if(data) {
                self.$store.commit('StoreVmVarDeviceUpdt', data)
                }
            }).catch(function (error) {
               console.log(error);
            }).then(function () {
              // always executed
        });

    }
  },
  mounted () {
    this.titleTools = this.$store.state.Setting.toolTipTitle
    // tempColdata = this.$store.state.Setting.showHideColumn
      
  }
}
</script>
<style>
.editable {
    width :90%;
    height : 90%;
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
    display: flex;
    align-items: center;
    width: 100%;
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

  .left-top{display: inline-flex; width:90%;}
  .y-scroll{overflow: scroll;height: 580px;    padding: 10px;}
  .checkbox label, .radio label {
    min-height: 5px;
}
.left-sidebar-toggle {
	color: #223a5e;
	/* background: #fff;
  border: 1px solid #e3e3e3; */
  background: transparent;
  border: none;
	padding: 2px;
	border-radius: 3px;
}
.centerBar .tbl-title {
	padding: 0px 0;
	line-height: 25px;
	color: #223a5e;
}
a:hover{ text-decoration:none !important;}
span#uncategories-top.active{ 
    color: #ffffff !important;
}
table#footerTable,
   table#footerTable > thead > tr > th {
        border: 1px solid #dddddd !important;
        border-left: transparent !important;
        border-right: transparent !important;
        border-top: transparent !important;
   }

.lftbar {
  flex: 0 0 auto;
  white-space: nowrap;
  float: left;
  max-width: 250px;
}
.centerBar {
  flex: 1 1 auto;
  width: 100% !important;
  float: left;
  overflow-x:scroll;
}
.main-right-sidebar {
  flex: 0 0 auto;
  min-width: 82px;
  width: auto;
  display: block;
  /* max-width: 500px !important; */
  left: auto !important;
}
/**********27-09-2018*******/
.table-border-main-cn > tbody > tr > td, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > td, .table-bordered > tfoot > tr > th, .table-bordered > thead > tr > td, .table-bordered > thead > tr > th {
    border-color: transparent !important;
}
.table-border-main-cn>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    border: 1px solid transparent !important;
}
.table-border-main-cn>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    border: 1px solid transparent !important;
}
.table-border-main-cn>tbody>tr>td, .table-bordered>tbody>tr>th, .table-bordered>tfoot>tr>td, .table-bordered>tfoot>tr>th, .table-bordered>thead>tr>td, .table-bordered>thead>tr>th {
    border: none !important;
}

.table-content .checkbox {
    margin: 0; 
    height: -webkit-fill-available;
}

#resizable .table-content .table-border-main-cn{
    border: 1px solid #dddddd !important;
    border-left: transparent !important;
    border-right: transparent !important;
    border-top: transparent !important;
    border: none !important;
}
.table-border-main-cn table#footerTable, table#footerTable > thead > tr > th {
    border: 1px solid #dddddd !important;
    border-right: none !important;
    border-top: none !important;
    border-left: none !important;
}
/*******28-09-2018*****/
.left-sidebar-toggle a{
		background: transparent !important;
    border: none !important	;
}


.custom_chk input[type=checkbox] + label {
display: block;
margin: 0.2em;
cursor: pointer;
padding: 0.2em;
}

.custom_chk input[type=checkbox] {
display: none;
}

.custom_chk input[type=checkbox] + label:before {
content: "\2714";
border: 1px solid #22395d;
border-radius: 2px;
display: inline-block;
width: 20px;
font-size: 15px;
font-weight: 100;
line-height: 15px;
height: 20px;

text-align: center;
margin-right: 5px;
color: transparent;
}

.custom_chk input[type=checkbox] + label:active:before {
transform: scale(0);
}

.custom_chk input[type=checkbox]:checked + label:before {
background-color: #22395d;
border-color: #22395d;
color: #fff;
}

.custom_chk input[type=checkbox]:disabled + label:before {
transform: scale(1);
border-color: #aaa;
}

.custom_chk input[type=checkbox]:checked:disabled + label:before {
transform: scale(1);
background-color: #bfb;
border-color: #bfb;
}
.img-icon-benq-1.icon-6.nav-icon.icon-forward {
    background-position: 178% 0%;
}

/* For Handler */
.some-handle i {
    float: left;
    line-height: inherit;
    padding: 0px 7px 0px 0px;
    color: #adadad;
    cursor: move;
}
#footerTable th {
    cursor: pointer;
}
</style>
