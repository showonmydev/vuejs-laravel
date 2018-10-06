import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const http=Vue.http
Vue.use(Vuex)
const strict = false
const store = new Vuex.Store({
  strict: true,
  'state': {
    'L1': {
      /*'all': {
        'name': 'all',
        'parentnode': null,
        'Device': null
      }*/
    },
    'L2': {
      /*'uncategories': {
        'name': 'uncategories',
        'parentnode': 'all'
      },*/
      /*'tgtest': {
        'name': 'tgtest',
        'parentnode': 'all'
      }*/
    },
    'L3': {
      /*'teo1': {
        'name': 'teo1',
        'parentnode': 'teo10789'
      },
      'teo5': {
        'name': 'teo5',
        'parentnode': 'tgtest'
      }*/
    },
    'L4': {
      /*'teo10789': {
        'name': 'teo10789',
        'parentnode': 'teo5'
      },
      'teo389': {
        'name': 'teo389',
        'parentnode': 'teo5'
      }*/
    },
    'L5': {
      /*'teo145': {
        'name': 'teo145',
        'parentnode': 'teo389'
      },
      'teo311': {
        'name': 'teo311',
        'parentnode': 'teo389'
      }*/
    },
    'L6': {
      /*'teo11': {
        'name': 'teo11',
        'parentnode': 'teo10789'
      },
      'teo31': {
        'name': 'teo31',
        'parentnode': 'teo10789'
      }*/
    },
    'Setting': {
      //https://service-portaltest.benq.com/dms_api/public/login
      'redirectUrl': 'https://devtest.secact.in/dms_api/public/login/benq',
      'baseUrl': 'https://devtest.secact.in/dms_api/public/api/',
      'context': false,
      'showHideColumn': {
        name: true,
        model: true,
        type: true,
        group: true,
        mcaAddress: true,
        ipAddress: true,
        serial: true,
        version: true
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
        scheduling: 'Scheduling'
      },
      DisplayTableData: {},
      GetParentKey: {},
      DragdropContainer: {}
    },
    'Device': {'teo31': [{'name': 'TPE02-D01 This is 1',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 2',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'teo11': [{'name': 'TPE02-D01 This is 3',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 4',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'teo311': [{'name': 'TPE02-D01 This is 5',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 6',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'teo145': [{'name': 'TPE02-D01 This is 7',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 8',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'teo389': [{'name': 'TPE02-D01 This is 9',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 10',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'teo10789': [{'name': 'TPE02-D01 This is 11',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 12',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'uncategories': [{'name': 'TPE02-D01 This is 13',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'},
    {'name': 'TPE02-D01 This is 14',
      'model': 'ST550K',
      'type': 'Display',
      'group': 'TPE02',
      'MACAddress': 'B0-C5-CA-70-00-10',
      'IPAddress': '10.27.27.89',
      'SerialNumber': '236131200059XA0014',
      'Version': '2.0.2_WW',
      'Power': 'This is 1 on',
      'Source': 'Android',
      'Signal Status': 'Stable',
      'AVMute': 'on',
      'Mute': 'off',
      'PictureMode': 'N/A',
      'AspectRatio': 'N/A',
      'AmbientSensor': 'N/A',
      'Error': 'No error',
      'CPU': '20',
      'Memory': '61',
      'Network': '1.2'}],
    'tgtest': [],
    'teo5': []
    }
  },
  getters: {
    getAll: state => state
  },
  mutations: {
    addStore: (state, newGroupobj) => {
      var LastInsertId = false
      console.log(newGroupobj)
      console.log('New Group')
      var responce = false
      //Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = {'depth' : parseInt(newGroupobj.level.slice(1, 2))+1, 'name' : newGroupobj.display_name, 'parent_id' : newGroupobj.parentnode, 'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
      console.log(data)

      $.ajax({
        url: URL+'group/add/new',
        async: false,
        data: data,
        method: 'POST',
        success: function(result){
          responce = true
          LastInsertId = result.last_insert_id
        },
        error: function(error){
          responce = false
        }
      });
      //End

      if (responce) {
        console.log(LastInsertId)
        newGroupobj.name = LastInsertId
        let level = newGroupobj.level
        let cuu = 'L' + parseInt(parseInt(level[1]) + parseInt(1))
        delete newGroupobj['level']
        Vue.set(state[cuu], newGroupobj[LastInsertId], newGroupobj)
        Vue.set(state.Device, newGroupobj[LastInsertId], [])
      } else {
        alert ('Somthing Went Wrong!')
      }
      
    },
    addDevice: (state, newDeviceobj) => {
      var DeviceInsertId = false
      var responce = false
      //Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = {'name' : newDeviceobj.name, 'groupId' : newDeviceobj.parentkey, 'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
      console.log(data)

      $.ajax({
        url: URL+'device/add/new',
        async: false,
        data: data,
        method: 'POST',
        success: function(result){
          DeviceInsertId = result.last_insert_id
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      //End

      if (responce) {
        let ParentKey = newDeviceobj.parentkey
        newDeviceobj.device_id = DeviceInsertId
        delete newDeviceobj['parentkey']
        console.log(newDeviceobj)
        state.Device[ParentKey].unshift(newDeviceobj)
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    DeleteStoreGroup: (state, newGroupobj) => {
      var responce = false
      //Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = {'depth' : newGroupobj.level.slice(1, 2), 'groupId' : newGroupobj.groupkey, 'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
      console.log(data)
      $.ajax({
        url: URL+'group/delete',
        async: false,
        data: data,
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      //End
      if (responce) {
        Vue.delete(state[newGroupobj.level], [newGroupobj.groupkey])
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    DeleteDevice: (state, newDeviceobj) => {
      var responce = false
      //Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = {'deviceID' : newDeviceobj.deviceID, 'groupId' : newDeviceobj.groupkey, 'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
      console.log(data)
      $.ajax({
        url: URL+'device/delete',
        async: false,
        data: data,
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      //End
      if (responce) {
        Vue.delete(state.Device[newDeviceobj.groupkey], newDeviceobj.key)
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    RenameDevice: (state, newDeviceobj) => {
      var responce = false
       //Start Store Data into DB
       var URL = state.Setting.baseUrl
       var data = {'NewName' : newDeviceobj.name ,'deviceID' : newDeviceobj.deviceID, 'groupId' : newDeviceobj.groupkey, 'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
       console.log('INNNN')
       console.log(data)
       //End

      $.ajax({
        url: URL+'device/rename',
        async: false,
        data: data,
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      // End
      if (responce) {
        state.Device[newDeviceobj.groupkey][newDeviceobj.key].name = newDeviceobj.name
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    RenameGroup: (state, newDeviceobj) => {
      var responce = false
      //Start Store Data into DB
      var URL = state.Setting.baseUrl
      var tempdata = {'NewName' : newDeviceobj.name ,'depth' : newDeviceobj.level.slice(1, 2), 'groupId' : newDeviceobj.groupkey, 'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
      console.log(tempdata)

      $.ajax({
        url: URL+'group/rename',
        async: false,
        data: tempdata,
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      //End
      if (responce) {
        state[newDeviceobj.level][newDeviceobj.groupkey].display_name = newDeviceobj.name
        const data = state[newDeviceobj.level][newDeviceobj.groupkey]
        Vue.set(state[newDeviceobj.level], newDeviceobj.groupkey, data)
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    ShowHideDetails: (state, field) => {
      delete state.Setting.showHideColumn[field.key]
      Vue.set(state.Setting.showHideColumn, field.key, field.value)
    },
    AddDataIntoTable: (state, parent) => {
      delete state.Setting['DisplayTableData']
      Vue.set(state.Setting, 'DisplayTableData', state.Device[parent])
    },
    GetDeviceFullInfo: (state, obj) => {
      delete state.Setting.DisplayIndividualData
      Vue.set(state.Setting, 'DisplayIndividualData', obj)
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
      //Start Store Data into DB
      var URL = state.Setting.baseUrl
      var tempdata = {'deviceId' : list.list.device_id, 'parent_id' : obj,'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
      console.log('INNNN')
      console.log(tempdata)
      //End
      $.ajax({
        url: URL+'device/changeDevice',
        async: false,
        data: tempdata,
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      // END
      if (responce) {
        state.Device[obj].unshift(list.list)
        delete state.Setting.DragdropContainer
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    RecoverTableSchemaDropOtherSide: (state) => {
      var dataObj = state.Setting.DragdropContainer
      state.Device[dataObj.parentKey].unshift(dataObj.list)
      delete state.Setting.DragdropContainer
    },
    UpdateInlineEdit: (state, obj) => {
      state.Device[obj.key][obj.numKey][obj.name] = obj.value
    },
    DropDeviceFromSideBar: (state, obj) => {
       var responce = false

       var data = state.Setting.DragdropContainer
       var dropfrom = obj.dropfrom

       //Start Store Data into DB
       var URL = state.Setting.baseUrl
       var tempdata = {'deviceId' : data.list.device_id, 'parent_id' : dropfrom.name,'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
       console.log('INNNN')
       console.log(tempdata)
       //End
       $.ajax({
        url: URL+'device/changeDevice',
        async: false,
        data: tempdata,
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
       });
      
      if (responce) {
        state.Device[dropfrom.name].unshift(data.list)
      } else {
        alert ('Somthing Went Wrong!')
      }
    },
    DropGroupFromSideBar: (state, obj) => {
      // this is For Server
      var URL = state.Setting.baseUrl
      var responce = false
      var UploadTemp = []
      // End
      var dropfrom = obj.dropdata
      var dropto = obj.dropfrom
      var fromData = state.Device[dropfrom.name]
      fromData.forEach(function (val, key) {
        var obj = {}
        state.Device[dropto.name].unshift(val) 
        // this is push the jSON Value into it for API
        obj = {'deviceId' : val.device_id, 'parent_id' : dropto.name,'company_id' : '1', 'token' : window.localStorage.getItem('token'), 'access_token' : 'sdfjkhfdsjkjhksj' }
        UploadTemp.push(obj);
      })
      delete state.Device[dropfrom.name]

      //Start Store Data into DB
      $.ajax({
        url: URL+'device/BulkChangeDevice',
        async: false,
        data: {'data' : JSON.stringify(UploadTemp)},
        method: 'POST',
        success: function(result){
          responce = true
        },
        error: function(error){
          responce = false
        }
      });
      //End
    },
    SyncData: (state, obj) => {
      $.urlParam = function(name){
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if(results){
          return results[1] || 0;
        }
      }
      var token = $.urlParam('token')
      var account_id = $.urlParam('account_id')
      //return true
      var URL = state.Setting.baseUrl
      var Data = {'info':'Test'}
      //var Header = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Key': '545'};
      var AllDevice = ''
      var AllGroup = ''
      $.ajax({
        url: URL+'device/sync',
        async: false,
        method: 'GET',
        data: {token:token, account_id:account_id},
        success: function(result){
          window.localStorage.setItem('token', token);
          AllDevice = result.AllDevice
          AllGroup = result.AllGroup
        },
        error: function(){
          window.localStorage.setItem('token', token);
          // Sets the new location of the current window.
          //window.location = state.Setting.redirectUrl;
        }
      });
      $.each(AllGroup, function(index, value) {
        let GroupObj = {'name': value.id, 'display_name': value.name,'company_id': value.company_id, 'parentnode': value.parent_id.toString()}
          Vue.set(store.state['L'+value.depth], value.id, GroupObj)
          Vue.set(state.Device, value.id, [])
      });

      $.each(AllDevice, function(index, value) {
        let DeviceObj = {'name': value.name,'device_id': value.id, 'model':value.model_name, 'parentnode': value.group_id.toString()}
          state.Device[value.group_id].unshift(DeviceObj)
      });
    }
  },
})
export default store
