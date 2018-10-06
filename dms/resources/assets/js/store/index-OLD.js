import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import $ from 'jquery'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const http=Vue.http
Vue.use(Vuex)
const strict = false
const store = new Vuex.Store({
  strict: true,
  'state': {
    'L1': {
    },
    'L2': {
    },
    'L3': {
    },
    'L4': {
    },
    'L5': {
    },
    'L6': {
    },
    'StatusLog': [],
    'Setting': {
      'redirectUrl': AUTH_REDIRECT_URL,
      'baseUrl': API_URL,
      'LogoutUrl': LOGOUT_URL,
      'context': false,
      'operationCheck': false,
      'showHideColumn': {
        name: true,
        description: true,
        // model: true,
        group: true,
        power: true,
        status: true,
        model: true,
        serialNo: true,
        ip: true,
        input: true,
        picture: true
      },
      'toolTipTitle': {
        refresh: 'Refresh',
        add: 'Add',
        settings: 'Settings',
        account: 'Account',
        actionPanel: 'Open Action Panel',
        information: 'Information',
        controls: 'Controls',
        softwareUpgrade: 'Software Upgrade',
        scheduling: 'Scheduling',
        editIP: 'Edit IP address',
        editName: 'Edit Name',
        version: 'Edit version',
        ShowHide: 'Hide Navigational Panel'
      },
      DisplayTableData: {},
      GetParentKey: {},
      DragdropContainer: {}
    },
    'Device': [],
    'Users': []
  }, 
  getters: {
    getAll: state => state
  },
  mutations: {
    // axios.get('').then(function(response){ return this.Users=response..data;
    // });
    addStore: (state, newGroupobj) => {
      var log = ', created ' + newGroupobj.display_name + ', Group Added' + ', success'
      var LastInsertId = false
      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = {'log': log, 'depth': parseInt(newGroupobj.level.slice(1, 2)) + 1, 'name': newGroupobj.display_name, 'parent_id': newGroupobj.parentnode, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj' }
      console.log(data)
      $.ajax({
        url: URL + 'group/add/new',
        async: false,
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
          LastInsertId = result.last_insert_id
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if (responce) {
        const IDD = LastInsertId
        newGroupobj.name = LastInsertId
        let level = newGroupobj.level
        let cuu = 'L' + parseInt(parseInt(level[1]) + parseInt(1))
        delete newGroupobj['level']
        Vue.set(state[cuu], IDD, newGroupobj)
        Vue.set(state.Device, IDD, [])

        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    addDevice: (state, newDeviceobj) => {
      var log = ', created ' + newDeviceobj.name + ', Device Added' + ', success'
      var DeviceInsertId = false
      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = { 'log': log, 'name': newDeviceobj.name, 'groupId': newDeviceobj.parentkey, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      // console.log(data)
      $.ajax({
        url: URL + 'device/add/new',
        async: false,
        // dataType : 'JSON',
        //contentType:'application/json',
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          DeviceInsertId = result.last_insert_id
          responce = true
          
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if (responce) {
        let ParentKey = newDeviceobj.parentkey
        newDeviceobj.device_id = DeviceInsertId
        delete newDeviceobj['parentkey']
        // console.log(newDeviceobj)
        state.Device[ParentKey].unshift(newDeviceobj)

        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
        state.Setting.operationCheck = true
      } else {
        alert('Somthing Went Wrong!')
        state.Setting.operationCheck = false
      }
    },
    DeleteStoreGroup: (state, newGroupobj) => {
      var log = ', created ' + newGroupobj.name + ', Group Deleted' + ', success'
      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = { 'log': log, 'depth': newGroupobj.level.slice(1, 2), 'groupId': newGroupobj.groupkey, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      console.log(data)
      $.ajax({
        url: URL + 'group/delete',
        async: false,
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if (responce) {
        Vue.delete(state[newGroupobj.level], [newGroupobj.groupkey])

        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
      } else {
        alert('Somthing Went Wrong!')
      }
      
    },
    DeleteDevice: (state, newDeviceobj) => {
      var log = ', created ' + newDeviceobj.devicekey + ', Device Deleted' + ', success'

      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = { 'log': log, 'deviceID': newDeviceobj.deviceID, 'groupId': newDeviceobj.groupkey, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      console.log(data)
      $.ajax({
        url: URL + 'device/delete',
        async: false,
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if (responce) {
        Vue.delete(state.Device[newDeviceobj.groupkey], newDeviceobj.key)

        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    RenameDevice: (state, newDeviceobj) => {
      console.log('INNOKOKKOKOKOK')
      console.log(newDeviceobj)
      var log = ', created ' + newDeviceobj.name + ', Device Rename' + ', success'

      var responce = false
       // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = { 'log': log, 'NewName': newDeviceobj.name, 'deviceID': newDeviceobj.deviceID, 'groupId': newDeviceobj.groupkey, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      console.log('INNNN')
      console.log(data)
       // End
      $.ajax({
        url: URL + 'device/rename',
        async: false,
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if (responce) {
        state.Device[newDeviceobj.groupkey][newDeviceobj.key].name = newDeviceobj.name

        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    RenameGroup: (state, newDeviceobj) => {
      var log = ', created ' + newDeviceobj.name + ', Group Rename' + ', success'
      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var tempdata = { 'log': log, 'NewName': newDeviceobj.name, 'depth': newDeviceobj.level.slice(1, 2), 'groupId': newDeviceobj.groupkey, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      console.log(tempdata)

      $.ajax({
        url: URL + 'group/rename',
        async: false,
        data: tempdata,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if (responce) {
        state[newDeviceobj.level][newDeviceobj.groupkey].display_name = newDeviceobj.name
        const data = state[newDeviceobj.level][newDeviceobj.groupkey]
        Vue.set(state[newDeviceobj.level], newDeviceobj.groupkey, data)

        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    ShowHideDetails: (state, field) => {
      delete state.Setting.showHideColumn[field.key]
      Vue.set(state.Setting.showHideColumn, field.key, field.value)
    },
    AddDataIntoTable: (state, parent) => {
      delete state.Setting['DisplayTableData']
      let keyss = [parseInt(parent.key)]
      let GroupId = []
      let parentId = parent.key
      let check = 'parentnode'
      let obj = []
      for(let i=parent.level+1; i<=6; i++) {
        Object.keys(state['L'+i]).forEach(function(keys, vals){
           console.log(state['L'+i][keys])
            if(keyss.includes(parseInt(state['L'+i][keys][check]))){
              if(!keyss.includes(keys)) {
                  keyss.push(state['L'+i][keys].name)
              }
            }
        })
      }
      keyss.forEach(function(value){
        Object.keys(state.Device[value]).forEach(function(key1, val1){
          state.Device[value][key1]['positionofRow'] = val1
          obj.push(state.Device[value][key1])
        })
      })
      console.log(obj)
      // Vue.set(state.Setting, 'DisplayTableData', state.Device[parent.key])
      Vue.set(state.Setting, 'DisplayTableData', obj)
    },
    GetDeviceFullInfo: (state, obj) => {
      delete state.Setting.DisplayIndividualData
      obj.data['key'] = obj.key
      Vue.set(state.Setting, 'DisplayIndividualData', obj.data)
    },
    SetParentKey: (state, KeyObj) => {
      delete state.Setting.GetParentKey[KeyObj.parentnode]
      Vue.set(state.Setting, 'GetParentKey', KeyObj)
    },
    AppendDataIntoTableSchema: (state, dataObj) => {
      delete state.Setting.DragdropContainer
      Vue.set(state.Setting, 'DragdropContainer', dataObj)
      var Device = state.Device[dataObj.parentKey]
      Device.splice(dataObj.index, 1)
      state.Device[dataObj.parentKey] = Device
    },
    AppendDataIntoActualPlace: (state, obj) => {
      var responce = false
      let list = state.Setting.DragdropContainer
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var tempdata = { 'deviceId': list.list.device_id, 'parent_id': obj, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      console.log('INNNN')
      console.log(tempdata)
      // End
      $.ajax({
        url: URL + 'device/changeDevice',
        async: false,
        data: tempdata,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // END
      if (responce) {
        state.Device[obj].unshift(list.list)
        delete state.Setting.DragdropContainer
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    RecoverTableSchemaDropOtherSide: (state) => {
      var dataObj = state.Setting.DragdropContainer
      state.Device[dataObj.parentKey].unshift(dataObj.list)
      delete state.Setting.DragdropContainer
    },
    UpdateInlineEdit: (state, obj) => {
      // this.$store.commit('UpdateMetaValue', {'groupId':this.tableFullInfo.group_id ,'metaKey': KEY, 'metaValue': newVal, 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.key})
      console.log(obj)
      // console.log(state.Device[obj.key][obj.numKey])
      state.Device[obj.key][obj.numKey][obj.name] = obj.value
    },
    DropDeviceFromSideBar: (state, obj) => {
      var responce = false
      var data = state.Setting.DragdropContainer
      var dropfrom = obj.dropfrom
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var tempdata = { 'deviceId': data.list.device_id, 'parent_id': dropfrom.name, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
      console.log('INNNN')
      console.log(tempdata)
      // End
      $.ajax({
        url: URL + 'device/changeDevice',
        async: false,
        data: tempdata,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result) {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      if (responce) {
        state.Device[dropfrom.name].unshift(data.list)
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    DropGroupFromSideBar: (state, obj) => {
      // this is For Server
      var URL = state.Setting.baseUrl
      // var responce = false
      var UploadTemp = []
      // End
      var dropfrom = obj.dropdata
      var dropto = obj.dropfrom
      var fromData = state.Device[dropfrom.name]
      fromData.forEach(function (val, key) {
        var obj = {}
        state.Device[dropto.name].unshift(val)
        // this is push the jSON Value into it for API
        obj = { 'deviceId': val.device_id, 'parent_id': dropto.name, 'company_id': window.localStorage.getItem('company_id'), 'access_token': 'sdfjkhfdsjkjhksj'}
        UploadTemp.push(obj)
      })
      delete state.Device[dropfrom.name]

      // Start Store Data into DB
      $.ajax({
        url: URL + 'device/BulkChangeDevice',
        async: false,
        data: {'data': JSON.stringify(UploadTemp)},
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result = '') {
          // responce = true
        },
        error: function (error = '') {
            location.reload();
        }
      })
      // End
    },
    SyncData: (state, obj) => {
      $('.contextMenu').hide()
      $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if(results){
          return results[1] || 0;
        }
      }
      var token = $.urlParam('token')
      var account_id = $.urlParam('account_id')
      var company_id = $.urlParam('company_id')
      // return true
      var URL = state.Setting.baseUrl
      var Data = {'info':'Test'}
      // var Header = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Key': '545'};
      var AllDevice = ''
      var AllGroup = ''
      var Alllog = ''
      $.ajax({
        url: URL + 'device/sync',
        async: false,
        method: 'GET',
        data: {token:token, account_id:account_id},
        success: function (result) {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('company_id', company_id);
          AllDevice = result.AllDevice
          AllGroup = result.AllGroup
          Alllog = result.log
        },
        error: function () {
          window.localStorage.setItem('token', token);
          // Sets the new location of the current window.
          window.location = state.Setting.redirectUrl;
        }
      })
      $.each(AllGroup, function (index, value) {
        let GroupObj = { 'name': value.id, 'display_name': value.name,'company_id': value.company_id, 'parentnode': value.parent_id.toString() }
            Vue.set(store.state['L'+value.depth], value.id, GroupObj)
            Vue.set(state.Device, value.id, [])
      })
      $.each(AllDevice, function (index, value) {
        let DeviceObj = {
          'name': value.name,
          'device_id': value.id,
          'model': value.model_name,
          'parentnode': value.group_id.toString(),
          'group_id' : value.group_id}
          $.each(value.dms_equipment, function (metaIndex, metaValue) {
              DeviceObj[metaValue.parameter_key] = metaValue.parameter_value
          })
              if(value.device_data) {
                DeviceObj['mac'] = value.device_data.mac_address
              }
          if(state.Device[value.group_id]) {
            state.Device[value.group_id].unshift(DeviceObj)
          }
      })
      $.each(Alllog, function (index, value) {
            // Added Log
            state.StatusLog.unshift(value.created_at+' '+value.operation)
      })
    },
    Logout : (state, obj) => {
      console.log(state.Setting.LogoutUrl+'?token='+window.localStorage.getItem('token'))
      window.location = state.Setting.LogoutUrl+'?token='+window.localStorage.getItem('token');
      return true
    },
    UpdateMetaValue: (state, obj) => {
      console.log(obj)
      let responce = false
      var URL = state.Setting.baseUrl
      // Start Store Data into DB
      let data = {bdid: obj.deviceId, parameter_key: obj.metaKey, parameter_value: obj.metaValue}
      $.ajax({
        url: URL + 'device/adding/metavalue',
        async: false,
        data: data,
        method: 'POST',
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        success: function (result = '') {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if(responce) {
        state.Device[obj.groupId][obj.key][obj.metaKey] = obj.metaValue
      } else {
        location.reload();
      }
    },
    UpdateMacValue: (state, obj) => {
      let responce = false
      var URL = state.Setting.baseUrl
      // Start Store Data into DB
      let data = {bdid: obj.deviceId, mac_address: obj.metaValue, model: ''}
      $.ajax({
        url: URL + 'device/adding/devicedata',
        async: false,
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result = '') {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if(responce) {
        state.Device[obj.groupId][obj.key][obj.metaKey] = obj.metaValue
      }
    },
    ResetAllSetting: (state, obj) => {
      let responce = false
      var URL = state.Setting.baseUrl
      // Start Store Data into DB
      //{'deviceID':this.tableFullInfo.device_id ,'devicekey': this.tableFullInfo.key, 'groupkey': this.tableFullInfo.group_id, 'key': this.tableFullInfo.key}
      let data = {bdid: obj.deviceID}
      $.ajax({
        url: URL + 'device/reset',
        async: false,
        data: data,
        headers: {'key': KEY, 'Authorization': 'Bearer '+ window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result = '') {
          responce = true
        },
        error: function (error = '') {
          location.reload();
          responce = false
        }
      })
      // End
      if(responce) {
        state.Device[obj.groupkey][obj.key]['avmute'] = 'on'
        state.Device[obj.groupkey][obj.key]['inputSource'] = 'HDMI-2'
        state.Device[obj.groupkey][obj.key]['aspectRatio'] = '1'
        state.Device[obj.groupkey][obj.key]['volume'] = '1'
        state.Device[obj.groupkey][obj.key]['pictureMode'] = 'pictureMode'
        state.Device[obj.groupkey][obj.key]['audioMute'] = 'on'
        state.Device[obj.groupkey][obj.key]['screenBlank'] = 'on'
      }
    }
  },
})
export default store
