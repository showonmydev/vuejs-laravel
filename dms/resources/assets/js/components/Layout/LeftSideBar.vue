<template>
<!-- left-side-bar -->
    <div class="left-sidebar-menu">      
      <div v-if="ifDevice" class="eptyRepoTxt"><p>Empty repository please add some device</p></div>
      <div class="sidebar left tab-content" v-bind:class="{'novalue' : ifDevice}">
        <!-- Sidebar Menu Items - These collapse to the responsive navigation menu on small screens -->
        <div style="color:white" role="tabpanel" id="submenu-1" class="collapse navbar-collapse navbar-ex1-collapse active tab-pane">
            <ul class="nav navbar-nav side-nav all-list" v-bind:class="{'SuperAdmin': name.roleId == 1 || name.roleId == 3}">
              <span v-if="name.roleId == 1 || name.roleId == 3" data-level="L0" id="hello" class="active"><i class="fa fa-caret-down" data-toggle="collapse" data-target="#FullHide"></i>BenQ-All</span>
              <span id="FullHide">
              <ul v-for="(list0, key0) in leftsidedata.L0" v-bind:key="key0" v-bind:data-identify="key0" class="nav navbar-nav side-nav all-list">
              <li v-for="(list1, key1) in leftsidedata.L1" v-bind:key="key1" v-bind:data-identify="key1" class="nav navbar-nav side-nav all-list" v-if="(key0==list1.company_id)">
                <span v-if="name.roleId == 2" data-level="L1" data-parent="all" data-type='group' v-bind:data-key="key1" v-bind:data-groupkey="key1" id="hello" class="active"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key1"></i>{{list1.display_name}}</span>
                <span v-if="name.roleId == 1 || name.roleId == 3" data-level="L1" data-parent="all" data-type='group' v-bind:data-key="key1" v-bind:data-groupkey="key1" id="hello"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key1"></i>{{list0.display_name}}</span>
                <ul v-on:drop="TableDropEventCatch()" v-bind:id="key1" class="collapse in left-nav-device-container">
                  <li v-for="(list2, key2) in leftsidedata.L2" v-bind:key="list1.id" v-bind:data-identify="key2" v-if="(list2.parentnode === key1)" class="sub-menu-list" data-level='L2' v-bind:data-parent="list2.parentnode">
                    <!-- <draggable :move="checkMove" :options="{group:'people'}"> -->
                    <!-- <ul v-if="(list2.name)"> -->
                      <!-- <draggable @end="moved" @start="DragStart('L2', list2.parentnode, list2.name, 'group', key2, event)"> -->
                      <!-- <li v-if="(list2.name)"> -->
                        <!-- <drop  @dragover="handleDragover('L2', list2.parentnode, list2.name, 'group', key2)" draggable="false" @drop="DropStart('L2', list2.parentnode, list2.name, 'group')" @dragenter="handledragenter('L2', list2.parentnode, list2.name, 'group', key2, ...arguments)" @dragleave="handledragleave('L2', list2.parentnode, list2.name, 'group', key2)"><span id="uncategories-top" data-level="L2" v-bind:data-display="list2.display_name" v-bind:data-parent="list2.parentnode" data-type='group' v-bind:data-groupkey="key2"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key2" v-bind:id="key2+'1'"></i><span class="groupInspan" @click="deviceClick(key2, list2.parentnode, 2)">{{list2.display_name}}</span></span></drop> -->
                        <span id="uncategories-top" data-level="L2" v-bind:data-display="list2.display_name" v-bind:data-parent="list2.parentnode" data-type='group' v-bind:data-groupkey="key2"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key2" v-bind:id="key2+'1'"></i><span class="groupInspan" @click="deviceClick(key2, list2.parentnode, 2)">{{list2.display_name}}</span></span>
                        <ul v-bind:id="key2" v-bind:class="{'collapse left-nav-device-container': collaps, 'collapse in left-nav-device-container submenu-3': !collaps}">
                          <li>
                            <!-- <drop  @dragover="handleDragover('L2', list2.parentnode, list2.name, 'group', key2)" @drop="DropStart('L2', list2.parentnode, list2.name, 'group')" @dragenter="handledragenter('L2', list2.parentnode, list2.name, 'group', key2, ...arguments)" @dragleave="handledragleave('L2', list2.parentnode, list2.name, 'group', key2)"><draggable @end="Listdragleave('L2', list2.parentnode, list2.Device, 'device', key2)" @start="DragStart('L2', list2.parentnode, list2.Device, 'device', key2)"><span v-for="(device, devicekey) in leftsidedata.Device[key2]" v-bind:key="devicekey" v-bind:data-key="devicekey" data-level="L2" data-type='device' v-bind:data-groupkey="key2" v-bind:data-devicekey="device.name" v-bind:data-deviceid="device.device_id" v-bind:data-parent="list2.parentnode" v-bind:title="device.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device.name | trimDeviceName}}</span></draggable></drop> -->
                            <span v-for="(device, devicekey) in leftsidedata.Device[key2]" v-bind:key="devicekey" v-bind:data-key="devicekey" data-level="L2" data-type='device' v-bind:data-groupkey="key2" v-bind:data-devicekey="device.name" v-bind:data-deviceid="device.device_id" v-bind:data-parent="list2.parentnode" v-bind:title="device.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device.name | trimDeviceName}}</span>
                            <ul class="left-nav-device-container">
                              <li v-for="(list3, key3) in leftsidedata.L3" v-bind:key="key3" v-bind:data-identify="key3" v-bind:data-key="key3" v-if="(list3.parentnode === key2)" data-level='L3' v-bind:data-parent="list3.parentnode">
                                <ul v-if="(list3.parentnode === key2)" class="left-nav-device-container">
                                  <!-- <draggable  @end="moved" @start="DragStart('L3', list3.parentnode, list3.name, 'group', key3, event)"> -->
                                  <li v-if="(list3.name)">
                                    <!-- <drop  @dragover="handleDragover('L3', list3.parentnode, list3.name, 'group', key3)" @drop="DropStart('L3', list3.parentnode, list3.name, 'group')" @dragenter="handledragenter('L3', list3.parentnode, list3.name, 'group', key3, ...arguments)" @dragleave="handledragleave('L3', list3.parentnode, list3.name, 'group', key3)"><span id="L3123" data-level="L3" v-bind:data-display="list3.display_name" v-bind:data-groupkey="key3" v-bind:data-parent="list3.parentnode" data-type='group'><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key3" v-bind:id="key3+'1'"></i><span @click="deviceClick(key3, list3.parentnode, 3)" class="groupInspan">{{list3.display_name}}</span></span></drop> -->
                                    <span id="L3123" data-level="L3" v-bind:data-display="list3.display_name" v-bind:data-groupkey="key3" v-bind:data-parent="list3.parentnode" data-type='group'><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key3" v-bind:id="key3+'1'"></i><span @click="deviceClick(key3, list3.parentnode, 3)" class="groupInspan">{{list3.display_name}}</span></span>
                                    <ul v-bind:id="key3" v-bind:class="{'collapse left-nav-device-container': collaps, 'collapse in left-nav-device-container submenu-3': !collaps}">
                                      <li>
                                        <!-- <drop  @dragover="handleDragover('L3', list3.parentnode, list3.name, 'group', key3)" @drop="DropStart('L3', list3.parentnode, list3.name, 'group')" @dragenter="handledragenter('L3', list3.parentnode, list3.name, 'group', key3, ...arguments)" @dragleave="handledragleave('L3', list3.parentnode, list3.name, 'group', key3)"><draggable @end="Listdragleave('L3', list3.parentnode, list3.Device, 'device', key3)" @start="DragStart('L3', list3.parentnode, list3.Device, 'device', key3)"><span v-for="(device3, devicekey3) in leftsidedata.Device[key3]" v-bind:key="devicekey3" v-bind:data-key="devicekey3" data-level="L3" v-bind:data-display="list3.display_name" data-type='device' v-bind:data-groupkey="key3" v-bind:data-devicekey="device3.name" v-bind:data-deviceid="device3.device_id" v-bind:data-parent="list3.parentnode"  v-bind:title="device3.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device3.name | trimDeviceName}}</span></draggable></drop> -->
                                        <span v-for="(device3, devicekey3) in leftsidedata.Device[key3]" v-bind:key="devicekey3" v-bind:data-key="devicekey3" data-level="L3" v-bind:data-display="list3.display_name" data-type='device' v-bind:data-groupkey="key3" v-bind:data-devicekey="device3.name" v-bind:data-deviceid="device3.device_id" v-bind:data-parent="list3.parentnode"  v-bind:title="device3.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device3.name | trimDeviceName}}</span>
                                        <ul class="left-nav-device-container">
                                          <li v-for="(list4, key4) in leftsidedata.L4" v-bind:key="key4" v-bind:data-identify="key4" v-if="(list4.parentnode === key3)" data-level='L4' v-bind:data-parent="list4.parentnode">
                                            <ul v-if="(list4.parentnode === key3)" class="left-nav-device-container">
                                              <!-- <draggable  @end="moved" @start="DragStart('L4', list4.parentnode, list4.name, 'group', key4, event)"> -->
                                              <li v-if="(list4.name)">
                                                <!-- <drop  @dragover="handleDragover('L4', list4.parentnode, list4.name, 'group', key4)" @drop="DropStart('L4', list4.parentnode, list4.name, 'group')" @dragenter="handledragenter('L4', list4.parentnode, list4.name, 'group', key4, ...arguments)" @dragleave="handledragleave('L4', list4.parentnode, list4.name, 'group', key4)"><span id="L4123" data-level="L4" v-bind:data-parent="list4.parentnode" v-bind:data-display="list4.display_name" data-type='group' v-bind:data-groupkey="key4"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key4" v-bind:id="key4+'1'"></i><span class="groupInspan" @click="deviceClick(key4, list4.parentnode, 4)">{{list4.display_name}}</span></span></drop> -->
                                                <span id="L4123" data-level="L4" v-bind:data-parent="list4.parentnode" v-bind:data-display="list4.display_name" data-type='group' v-bind:data-groupkey="key4"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key4" v-bind:id="key4+'1'"></i><span class="groupInspan" @click="deviceClick(key4, list4.parentnode, 4)">{{list4.display_name}}</span></span>
                                                <ul v-bind:id="key4" v-bind:class="{'collapse left-nav-device-container': collaps, 'collapse in left-nav-device-container submenu-3': !collaps}">
                                                  <li>
                                                    <!-- <drop   @dragover="handleDragover('L4', list4.parentnode, list4.name, 'group', key4)" @drop="DropStart('L4', list4.parentnode, list4.name, 'group')" @dragenter="handledragenter('L4', list4.parentnode, list4.name, 'group', key4, ...arguments)" @dragleave="handledragleave('L4', list4.parentnode, list4.name, 'group', key4)"><draggable @end="Listdragleave('L4', list4.parentnode, list4.Device, 'device', key4)" @start="DragStart('L4', list4.parentnode, list4.Device, 'device', key4)"><span v-for="(device4, devicekey4) in leftsidedata.Device[key4]" v-bind:key="devicekey4" v-bind:data-key="devicekey4" data-level="L4" v-bind:data-display="list4.display_name" data-type='device' v-bind:data-groupkey="key4" v-bind:data-devicekey="device4.name" v-bind:data-deviceid="device4.device_id" v-bind:data-parent="list4.parentnode"  v-bind:title="device4.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device4.name | trimDeviceName}}</span></draggable></drop> -->
                                                    <span v-for="(device4, devicekey4) in leftsidedata.Device[key4]" v-bind:key="devicekey4" v-bind:data-key="devicekey4" data-level="L4" v-bind:data-display="list4.display_name" data-type='device' v-bind:data-groupkey="key4" v-bind:data-devicekey="device4.name" v-bind:data-deviceid="device4.device_id" v-bind:data-parent="list4.parentnode"  v-bind:title="device4.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device4.name | trimDeviceName}}</span>
                                                    <ul class="left-nav-device-container">
                                                      <li v-for="(list5, key5) in leftsidedata.L5" v-bind:key="key5" v-bind:data-identify="key5" v-if="(list5.parentnode === key4)" data-level='L5' v-bind:data-parent="list5.parentnode">
                                                        <ul v-if="(list5.parentnode === key4)" class="left-nav-device-container">
                                                          <!-- <draggable @end="moved" @start="DragStart('L5', list5.parentnode, list5.name, 'group', key5, event)"> -->
                                                          <li v-if="(list5.name)">
                                                            <!-- <drop  :class="{ allowed: dragging === group }" @dragover="handleDragover('L5', list5.parentnode, list5.name, 'group', key5)" @drop="DropStart('L5', list5.parentnode, list5.name, 'group')" @dragenter="handledragenter('L5', list5.parentnode, list5.name, 'group', this)" @dragleave="handledragleave('L5', list5.parentnode, list5.name, 'group')"><span id="L4123" data-level="L5" v-bind:data-parent="list5.parentnode" v-bind:data-display="list5.display_name" data-type='group' v-bind:data-groupkey="key5"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key5" v-bind:id="key5+'1'"></i><span class="groupInspan" @click="deviceClick(key5, list5.parentnode, 5)">{{list5.display_name}}</span></span></drop> -->
                                                            <span id="L4123" data-level="L5" v-bind:data-parent="list5.parentnode" v-bind:data-display="list5.display_name" data-type='group' v-bind:data-groupkey="key5"><i class="fa fa-caret-down" data-toggle="collapse" v-bind:data-target="'#'+key5" v-bind:id="key5+'1'"></i><span class="groupInspan" @click="deviceClick(key5, list5.parentnode, 5)">{{list5.display_name}}</span></span>
                                                            <ul v-bind:id="key5" v-bind:class="{'collapse left-nav-device-container': collaps, 'collapse in left-nav-device-container submenu-3': !collaps}">
                                                              <li v-for="(device5, devicekey5) in leftsidedata.Device[key5]" v-bind:key="devicekey5" v-bind:data-key="devicekey5" data-level="L5" v-bind:data-display="list5.display_name" v-bind:data-groupkey="key5" data-type='device' v-bind:data-devicekey="device5.name" v-bind:data-deviceid="device5.device_id" v-bind:data-parent="list5.parentnode"  >
                                                                <!-- <drop   @dragover="handleDragover('L5', list5.parentnode, list5.name, 'group', key5)" @drop="DropStart('L5', list5.parentnode, list5.name, 'group')" @dragenter="handledragenter('L5', list5.parentnode, list5.name, 'group', key5, ...arguments)" @dragleave="handledragleave('L5', list5.parentnode, list5.name, 'group', key5)"><draggable @end="Listdragleave('L5', list5.parentnode, list5.Device, 'device', key5)" @start="DragStart('L5', list5.parentnode, list5.Device, 'device', key5)"><span v-for="(device5, devicekey5) in leftsidedata.Device[key5]" v-bind:key="devicekey5" v-bind:data-key="devicekey5" data-level="L5" v-bind:data-display="list5.display_name" v-bind:data-groupkey="key5" data-type='device' v-bind:data-devicekey="device5.name" v-bind:data-deviceid="device5.device_id" v-bind:data-parent="list5.parentnode"  v-bind:title="device5.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device5.name | trimDeviceName}}</span></draggable></drop> -->
                                                                <span v-bind:title="device5.name" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device5.name | trimDeviceName}}</span></draggable>
                                                                <ul class="left-nav-device-container">
                                                                  <!-- <drop   @dragover="handleDragover('L6', list6.parentnode, list6.name, 'group', key6)" @drop="DropStart('L6', list6.parentnode, list6.name, 'group')" @dragenter="handledragenter('L6', list6.parentnode, list6.name, 'group', key5, ...arguments)" @dragleave="handledragleave('L6', list6.parentnode, list6.name, 'group', key5)"> -->
                                                                  <li v-for="(list6, key6) in leftsidedata.L6" v-bind:key="key6" v-bind:data-identify="key6" v-if="(list6.parentnode === key5)" data-type='group' data-level='L6' v-bind:data-parent="list6.parentnode">
                                                                    <ul v-if="(list6.parentnode === key5)" class="left-nav-device-container">
                                                                      <!-- <draggable @end="moved" @start="DragStart('L6', list6.parentnode, list6.name, 'group', key6, event)"> -->
                                                                      <li v-if="(list6.name)"><span id="L5123" data-level="L6" data-type='group' v-bind:data-display="list6.display_name" v-bind:data-parent="list6.parentnode" v-bind:data-groupkey="key6"><span class="fa fa-caret-down groupInspan" @click="deviceClick(key6, list6.parentnode, 6)">{{list6.name}}</span></span>
                                                                        <ul v-bind:id="key6" v-bind:class="{'collapse left-nav-device-container': collaps, 'collapse in left-nav-device-container submenu-3': !collaps}">
                                                                          <li v-for="(device6, devicekey6) in leftsidedata.Device[key6]" v-bind:key="devicekey6"  v-bind:data-key="devicekey6" data-level="L6" data-type='device' v-bind:data-groupkey="key6" v-bind:data-devicekey="device6.name" v-bind:data-parent="list6.parentnode" >
                                                                            <!-- <draggable @end="Listdragleave('L6', list6.parentnode, list6.Device, 'device', key6)" @start="DragStart('L6', list6.parentnode, list6.Device, 'device', key6, ...arguments)">-->
                                                                              <span v-bind:title="device6.name" v-bind:data-deviceid="device6.device_id" v-tippy="{ placement : 'bottom',  theme: 'tool1', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-angle-double-right"></i>{{device6.name | trimDeviceName}}</span>
                                                                              <!-- </draggable> --> -->
                                                                          </li>
                                                                        </ul>
                                                                      </li>
                                                                      <!-- </draggable> -->
                                                                    </ul>
                                                                  </li>
                                                                  <!-- </drop> -->
                                                                </ul>
                                                              </li>
                                                            </ul>
                                                          </li>
                                                          <!-- </draggable> -->
                                                        </ul>
                                                      </li>
                                                    </ul>
                                                  </li>
                                                </ul>
                                              </li>
                                              <!-- </draggable> -->
                                            </ul>
                                          </li>
                                        </ul>
                                      </li>
                                    </ul>
                                  </li>
                                  <!-- </draggable> -->
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      <!-- </li> -->
                      <!-- </draggable> -->
                    <!-- </ul> -->
                    <!-- </draggable> -->
                  </li>
                </ul>
              </li>

              </ul>

              </span>

            </ul>
        </div>
        <!-- /.navbar-collapse -->
        </div>
    </div>
</template>
<script>
import { EventBus } from './../EventBus/event-bus.js'
import draggable from 'vuedraggable'
export default {
  props: ['name', 'clickTarget'],
  name: 'LeftSideBar',
  data () {
    return {
      tempActiveTable: {key:'', parent:'', level:''},
      ifDevice: true,
      dragging: null,
      dropdata: {},
      msg: 'Welcome to Your Vue.js App',
      selected: undefined,
      activeNames: 'fdjh'
    }
  },
  components: {
    draggable
  },
  created: function () {
    let THIS = this
    setTimeout(function(){
      THIS.ifDevice = THIS.checkIfDevice()
      //console.log('Status',THIS.ifDevice)
    },1000)

    EventBus.$on('DeviceIsDeleted', clickCount => {
      setTimeout(function(){
        THIS.ifDevice = THIS.checkIfDevice()
        //console.log('Status',THIS.ifDevice)
      },1000)
    })
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
    collaps: function () {
      return this.$store.state.Setting.context
    },
    leftsidedata: function () {
      return this.$store.getters.getAll
    },
    getAll: function () {
      return this.$store.getters.getAll
    }
  },
  methods: {
    TableDropEventCatch: function() {
      //console.log('INFO SYS')
    },
    checkIfDevice: function () {
        //console.log('Its RUN',Object.keys(this.$store.state.Device).length)
        let a = false
        if(Object.keys(this.$store.state.Device).length){
          let fullVal = this.$store.state.Device
          Object.keys(this.$store.state.Device).forEach(function(key, val){
            if(fullVal[key][0]){
              //console.log('IfTrue',fullVal[key][0])
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
    add: function () {
      alert('dfsj')
    },
    replace: function () {
      alert('jhfg')
    },
    moved (ev, info) {
      return true
    },
    checkMove: function (evt) {
      // alert(evt.draggedContext.element.name);
      return (evt.draggedContext.element.name !== 'apple')
    },
    handleChange () {
      //console.log('changed')
    },
    inputChanged (value) {
      this.activeNames = value
    },
    getComponentData () {
      return {
        on: {
          change: this.handleChange,
          input: this.inputChanged
        },
        props: {
          value: 'this.activeNames'
        }
      }
    },
    DragStop1 (newIndex, element) {
      alert('sdgh')
    },
    DragStop (ev) {
      this.dragging = null
      //console.log(ev.target)
    },
    DragStart (level, parentnode, name = '', devicetype, key, event) {
      // event.dataTransfer.effectAllowed = "none";
      // $('#'+key).addClass('NoDropAllow')
      // $('span[data-groupkey='+key+']').addClass('NoDropAllow')
      //console.log('Yes I am')
      this.dragging = 'group'
      //console.log('Drag Start')
      //console.log(level, parentnode, name, devicetype, key)
      // this is added when user drop any device or group from sidebar
      // this.DropTempDataSidebar = {level: level, parentnode: parentnode, name: name, devicetype: devicetype, key: key}
      if (key) {
        // next drop stage
        let containerParentKey = this.$store.state.Setting.GetParentKey.parentnode
        let getdeviceIndex = this.clickTarget.target.dataset.key
        let deviceList = this.$store.state.Device[key][getdeviceIndex]
        this.dropdata = {level: level, parentnode: parentnode, name: name, devicetype: devicetype, parentKey: key}
        if (devicetype === 'device') {
          if (containerParentKey !== '' && containerParentKey !== null && containerParentKey !== undefined) {
            this.$store.commit('AppendDataIntoTableSchema', {list: deviceList, parentKey: key, index: getdeviceIndex})
          } else {
            this.$store.commit('AppendDataIntoTableSchema', {list: deviceList, parentKey: key, index: getdeviceIndex})
          }
        }
      }
    },
    DisplayData (groupname, keyname) {
      this.$emit('emitLeftSideBarClick', groupname, keyname)
    },
    onDropEvent (event) {
      //console.log('INNNNNNN0000000')
      //console.log(event)
      //console.log('info')
    },
    onDropEnd () {
      //console.log('Hello')
    },
    deviceClick (key=this.tempActiveTable.key, parent=this.tempActiveTable.parent, level=this.tempActiveTable.level) {
      //console.log(this.clickTarget.target.innerHTML);
      //console.log('Yes I am Here')
      EventBus.$emit('navClickGroupId', key)
      this.$emit('emitLeftSideBarClick', this.clickTarget.target.innerHTML, '')
      this.$store.commit('SetParentKey', {parentnode: key})
      this.$store.commit('AddDataIntoTable', {'key':key, 'parent':parent, 'level':level})
    },
    DropStart (level, parentnode, name, type, event) {
      //console.log('HereFromSidebar',this.$store.state.Setting.SetTableSelectDeviceId)
      if(this.$store.state.Setting.SetTableSelectDeviceId){
        //console.log('INSIdeThe')
        this.$store.commit('DropDeviceFromtableToSidebar', {dropfrom: {level: level, parentnode: parentnode, name: name}})
        this.$store.commit('SyncData',{})
        return true
      }
      //console.log(level, parentnode, name, type)
      //console.log('INn')
      var dropData = this.clickTarget.target.dataset
      var deatilsForGroup = this.dropdata
      //console.log('clickTarget')
      //console.log(this.dropdata)
      if (dropData.type === 'device' && name !== '') {
        this.$store.commit('DropDeviceFromSideBar', {dropdata: dropData, dropfrom: {level: level, parentnode: parentnode, name: name}})
        this.$store.commit('SyncData',{})
        //console.log('Device')
      }
      if (deatilsForGroup.devicetype === 'group' && name !== '') {
        this.$store.commit('DropGroupFromSideBar', {dropdata: deatilsForGroup, dropfrom: {level: level, parentnode: parentnode, name: name}})
        this.$store.commit('SyncData',{})
        //console.log('Group')
      }
      $('.showArea').removeClass('showArea');
      //console.log('Now Its Running')
      //this.deviceClick();
    },
    Listdragleave (level, parentnode, name = '', type, key) {
    },
    handledragenter (level, parentnode, name = '', type, key, event, e) {
      //console.log('OKKKKKKK02')
      $('.showArea').removeClass('showArea');
      $('ul.left-nav-device-container li[data-identify='+key+']').addClass('showArea');
      // //console.log(level, parentnode, name, type, event)
    },
    handledragleave (level, parentnode, name = '', type, key, event) {
      if(this.dropdata.parentKey == name) {
        $('ul.left-nav-device-container li[data-identify='+key+']').addClass('NotallowDrop');
        $('.NotallowDrop').droppable({ disabled: true });
      } else {
         $('.NotallowDrop').droppable({ disabled: false });
         $('.NotallowDrop').removeClass('NotallowDrop');
      }

      $('.showArea').removeClass('showArea');
      $('ul.left-nav-device-container li[data-identify='+key+']').addClass('showArea');
    },
    handleDragover (level, parentnode, name = '', type, key) {
      // $('ul.left-nav-device-container li[data-identify='+key+']').draggable({ disabled: true });
    }
  }
}
</script>
<style>
.allowed {
		background-color: #dfd;
  }
.left-sidebar-menu {
    height: 100%;
    overflow-y: auto;
  }
  .sidebar {
    overflow-y: unset !important;
  }
.showArea {
  background-color: #ddd;
  border-bottom: 1px solid #888;
  border-top: 1px solid #888;
   }

   .leftTopHead{
     width: auto !important;
   }
   
   .leftTopHead a{
        padding: 0 20px !important;
    display: inline-block !important;
   }

.lftbar {
    width: 0;
    display: none;
   }
   .lftbar.sidebar-active {
    width: 250px;
    display: block !important;
   }
/* .NoDropAllow{
   cursor: no-drop!important;
} */
</style>
