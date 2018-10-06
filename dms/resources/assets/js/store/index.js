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
  strict: false,
  'state': {
    'L0': {
    },
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
      'StoreVmVarDeviceUpdt' : [],
      'noRowSelected' : 0,
      'IsShowSoftwareMang' : false,
      'InformationResponce':null,
      'userInfo': [],
      'redirectUrl': AUTH_REDIRECT_URL,
      'baseUrl': API_URL,
      'LogoutUrl': LOGOUT_URL,
      'MQTT': MQTT_DOMAIN,
      'context': false,
      'operationCheck': false,
      'showHideColumn': {
        name: true,
        description: false,
        model: true,
        group: true,
        power: true,
        status: true,
        model: true,
        serialNo: true,
        ip: true,
        input: true,
        picture: false
      },
      'toolTipTitle': {
        updateApplicationTo: 'Update Application to Version 1.0',
        softwareAdd: 'Add/Upload Application',
        refresh: 'Refresh',
        add: 'Add',
        statusLog: 'Status & Log',
        settings: 'Settings',
        account: 'Account',
        actionPanel: 'Show / Hide Action Panel',
        information: 'Information',
        controls: 'Controls',
        softwareUpgrade: 'Install / Update',
        scheduling: 'Scheduling',
        editIP: 'Edit IP address',
        editName: 'Edit Name',
        version: 'Edit version',
        ShowHide: 'Show / Hide Navigation Panel',
        showHideRightSide: 'Show/Hide Information',
        scheduler: 'Scheduling details'
      },
      LastLog: '',
      DisplaySoftwareList: {},
      UpdateRequireList: {},
      ListAllApplication: {},
      DisplayTableData: {},
      GetParentKey: {},
      DragdropContainer: {},
      CurrentTableParentKey: [],
      SetTableSelectDeviceId: null,
      CurrentTableDataShowInfo: {'key':'', 'parent':'', 'level':''}
    },
    NeedUpdate: {},
    Device: [],
    tree: null
  },
  getters: {
    getAll: state => state
  },
  mutations: {
    StoreVmVarDeviceUpdt: (state, obj) => {
      state.Setting.StoreVmVarDeviceUpdt = obj.data
      console.log('INNNNNNNNNN')
      console.log(state.Setting.StoreVmVarDeviceUpdt)
    },
    AddDeviceViaSearch: (state, obj) => {
      var URL = state.Setting.baseUrl
      let responce = false
      let Data = ''
      $.ajax({
        url: URL + 'app/add/viaSearch',
        async: false,
        data: {'appId':obj.appId,'DeviceId':state.Setting.DisplayIndividualData.device_id,'bdid':state.Setting.DisplayIndividualData.bdid},
        method: 'POST',
        success: function (result) {
          if(result.success){
            //alert(result.success);
          }
        },
        error: function (jqXHR, exception) {
          var msg = '';
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found.';
          } else if (jqXHR.status == 400) {
            msg = 'Device is not Active';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error.';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
           msg = 'Uncaught Error.\n' + jqXHR.responseText;
           location.reload();
         }
            // location.reload();
            ResStatus = msg
            responce = false
          }
      })
    },
    RequireSoftwareUpdateList: (state, obj) => {
      var URL = state.Setting.baseUrl
      let responce = false
      let Device_id = state.Setting.DisplayIndividualData.device_id
      let Data = ''
      $.ajax({
        //url: URL + 'device/Newupdate/list',
        url: URL + 'app/listviaSearch',
        async: false,
        data: {deviceId : Device_id},
        method: 'GET',
        success: function (result) {
          if(result.result){
            Data = result.result
          }
        },
        error: function (jqXHR, exception) {
          var msg = '';
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found.';
          } else if (jqXHR.status == 400) {
            msg = 'Device is not Active';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error.';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
           msg = 'Uncaught Error.\n' + jqXHR.responseText;
           location.reload();
         }
            // location.reload();
            ResStatus = msg
            responce = false
          }
      })
      // state.Setting.UpdateRequireList = Data
      state.Setting.ListAllApplication = Data
    },
    AddSoftwareApplication: (state, obj) => {
      var URL = state.Setting.baseUrl
      let responce = false
      $.ajax({
        url: URL + 'device/app/add',
        async: false,
        data: obj,
        method: 'POST',
        success: function (result) {
          
        },
        error: function (jqXHR, exception) {
          var msg = '';
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found.';
          } else if (jqXHR.status == 400) {
            msg = 'Device is not Active';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error.';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
           msg = 'Uncaught Error.\n' + jqXHR.responseText;
           location.reload();
         }
            // location.reload();
            ResStatus = msg
            responce = false
          }
      })
    },
    DisplaySoftwareList: (state, obj) => {
      let Data = ''
      let Device_id = state.Setting.DisplayIndividualData.device_id
      var URL = state.Setting.baseUrl
      let responce = false
      $.ajax({
        url: URL + 'device/app/list',
        async: false,
        data: {deviceId : Device_id},
        method: 'POST',
        success: function (result) {
          if(result.responce){
            Data = result.responce
          }
        },
        error: function (jqXHR, exception) {
          var msg = '';
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found.';
          } else if (jqXHR.status == 400) {
            msg = 'Device is not Active';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error.';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
           msg = 'Uncaught Error.\n' + jqXHR.responseText;
           location.reload();
         }
            // location.reload();
            ResStatus = msg
            responce = false
          }
      })
      state.DisplaySoftwareList = Data
      state.NeedUpdate = 1
      Data.forEach(function($val){
        if($val.get_app.get_need_update_version){
          state.NeedUpdate = $val
          return true;
        }
      });
    },
    noRowSelectedOnTable: (state, operation) => {
      state.Setting.noRowSelected = operation.count
    },
    SoftwareMang: (state, operation) => {
      state.Setting.IsShowSoftwareMang = operation.action
    },
    OperationCheck: (state, operation) => {
      state.Setting.operationCheck = operation.action
    },
    addStore: (state, newGroupobj) => {
      var log = 'created ' + newGroupobj.display_name + ', Group Added' + ', success'
      var LastInsertId = false
      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = {'log': log, 'depth': parseInt(newGroupobj.level.slice(1, 2)) + 1, 'name': newGroupobj.display_name, 'parent_id': newGroupobj.parentnode, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log(data)
      $.ajax({
        url: URL + 'group/add/new',
        async: false,
        data: data,
        method: 'POST',
        success: function (result) {
          responce = true
          LastInsertId = result.last_insert_id
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 
           location.reload();
         }
         alert(msg)
            // location.reload();
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
      var log = 'created ' + newDeviceobj.name + ', Device Added' + ', success'
      var DeviceInsertId = false
      var responce = false
      var ResStatus = null
      var DeviceMetaValue = []
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = { 'bdid':newDeviceobj.bdid,'serial': newDeviceobj.serial, 'model': newDeviceobj.model, 'description': newDeviceobj.description,'log': log, 'device_name': newDeviceobj.name, 'groupId': newDeviceobj.parentkey, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY, 'setting':newDeviceobj.setting }
      // //console.log(data)
      $.ajax({
        url: URL + 'device/add/new',
        async: false,
        data: data,
        method: 'POST',
        success: function (result) {
          if(result.last_insert_id){
            DeviceInsertId = result.last_insert_id
            DeviceMetaValue = result.meta_value
            responce = true
          }
        },
        error: function (jqXHR, exception) {
          var msg = '';
          if (jqXHR.status === 0) {
            msg = 'Not connect.\n Verify Network.';
          } else if (jqXHR.status == 404) {
            msg = 'Requested page not found.';
          } else if (jqXHR.status == 400) {
            msg = 'Device is not Active';
          } else if (jqXHR.status == 500) {
            msg = 'Internal Server Error.';
          } else if (exception === 'parsererror') {
            msg = 'Requested JSON parse failed.';
          } else if (exception === 'timeout') {
            msg = 'Time out error.';
          } else if (exception === 'abort') {
            msg = 'Ajax request aborted.';
          } else {
           msg = 'Uncaught Error.\n' + jqXHR.responseText;
           location.reload();
         }
            // location.reload();
            ResStatus = msg
            responce = false
          }
        })
      // End
      if (responce) {
        let ParentKey = newDeviceobj.parentkey
        //console.log('Here is ParentKey Value',ParentKey)
        newDeviceobj.device_id = DeviceInsertId
        delete newDeviceobj['parentkey']
        $.each(DeviceMetaValue, function (metaIndex, metaValue) {
          newDeviceobj[metaIndex] = metaValue
        })
        // This is for add device in live table
        if(state.Setting.CurrentTableParentKey.includes(parseInt(ParentKey))){
          state.Setting.DisplayTableData.unshift(newDeviceobj)
        }
        
        state.Device[ParentKey].unshift(newDeviceobj)
        // Added Log
        state.StatusLog.unshift(new Date().toLocaleString() + log)
        state.Setting.operationCheck = true

        //Put JQUERY EVENT OF LIVE UPDATE
        $('.customRefresh').click();
        if(state.Setting.CurrentTableDataShowInfo && $('#footerTable tr:nth-child(2)').length){
          let key = state.Setting.CurrentTableDataShowInfo.key
          $('.customRefresh').click();
          $('[data-groupkey='+key+'] span:first').click(); 
        }
        
      } else {
        state.Setting.InformationResponce=ResStatus
        // alert('Somthing Went Wrong!')
        state.Setting.operationCheck = false
      }
    },
    DeleteStoreGroup: (state, newGroupobj) => {
      var log = 'created ' + newGroupobj.name + ', Group Deleted' + ', success'
      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var UnCatId = Object.values(state.L2)[0].name;
      var data = { 'UnCatId':UnCatId,'log': log, 'depth': newGroupobj.level.slice(1, 2), 'groupId': newGroupobj.groupkey, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log(data)
      $.ajax({
        url: URL + 'group/delete',
        async: false,
        data: data,
        method: 'POST',
        success: function (result) {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
            responce = false
          }
        })
      // End
      if (responce) {
        Vue.delete(state[newGroupobj.level], [newGroupobj.groupkey])
        state.StatusLog.unshift(new Date().toLocaleString() + log)
      } else {
        alert('Somthing Went Wrong!')
      }
      
    },
    DeleteDevice: (state, newDeviceobj) => {
      var log = 'created ' + newDeviceobj.devicekey + ', Device Deleted' + ', success'

      var responce = false
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var data = { 'log': log, 'deviceID': newDeviceobj.deviceID, 'groupId': newDeviceobj.groupkey, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log(data)
      $.ajax({
        url: URL + 'device/delete',
        async: false,
        data: data,
        method: 'POST',
        success: function (result) {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
            responce = false
          }
        })
      // End
      if (responce) {
        Vue.delete(state.Device[newDeviceobj.groupkey], newDeviceobj.key)
        state.StatusLog.unshift(new Date().toLocaleString() + log)
        //Put JQUERY EVENT OF LIVE UPDATE
        $('.customRefresh').click();
        if(state.Setting.CurrentTableDataShowInfo && $('#footerTable tr:nth-child(2)').length){
          let key = state.Setting.CurrentTableDataShowInfo.key
          $('.customRefresh').click();
          $('[data-groupkey='+key+'] span:first').click(); 
        }
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    RenameDevice: (state, newDeviceobj) => {
      //console.log('INNOKOKKOKOKOK')
      //console.log(newDeviceobj)
      var log = 'created ' + newDeviceobj.name + ', Device Rename' + ', success'
      var responce = false
      var URL = state.Setting.baseUrl
      var data = { 'log': log, 'NewName': newDeviceobj.name, 'deviceID': newDeviceobj.deviceID, 'groupId': newDeviceobj.groupkey, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log('INNNN')
      //console.log(data)
      $.ajax({
        url: URL + 'device/rename',
        async: false,
        data: data,
        method: 'POST',
        success: function (result) {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
            responce = false
          }
        })
      if (responce) {
        state.Device[newDeviceobj.groupkey][newDeviceobj.key].name = newDeviceobj.name
        state.StatusLog.unshift(new Date().toLocaleString() + log)
        //Put JQUERY EVENT OF LIVE UPDATE
        $('.customRefresh').click();
        if(state.Setting.CurrentTableDataShowInfo && $('#footerTable tr:nth-child(2)').length){
          let key = state.Setting.CurrentTableDataShowInfo.key
          $('.customRefresh').click();
          $('[data-groupkey='+key+'] span:first').click(); 
        }
        
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    RenameGroup: (state, newDeviceobj) => {
      var log = 'created ' + newDeviceobj.name + ', Group Rename' + ', success'
      var responce = false
      var URL = state.Setting.baseUrl
      var tempdata = { 'log': log, 'NewName': newDeviceobj.name, 'depth': newDeviceobj.level.slice(1, 2), 'groupId': newDeviceobj.groupkey, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log(tempdata)
      $.ajax({
        url: URL + 'group/rename',
        async: false,
        data: tempdata,
        method: 'POST',
        success: function (result) {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
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
      if(parent.key){
        state.Setting.CurrentTableDataShowInfo = parent
      } else {
        parent = state.Setting.CurrentTableDataShowInfo
      }
      delete state.Setting['DisplayTableData']
      let keyss = [parseInt(parent.key)]
      let GroupId = []
      let parentId = parent.key
      let check = 'parentnode'
      let obj = []
      for(let i=parent.level+1; i<=6; i++) {
        Object.keys(state['L'+i]).forEach(function(keys, vals){
         //console.log(state['L'+i][keys])
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
      //console.log(obj)
      // Vue.set(state.Setting, 'DisplayTableData', state.Device[parent.key])
      // state.Setting.DisplayTableData
      Vue.set(state.Setting, 'DisplayTableData', obj)
      state.Setting.CurrentTableParentKey = keyss
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
    AppendDataFromTableSchema: (state, dataObj) => {
      delete state.Setting.DragdropContainer
      Vue.set(state.Setting, 'DragdropContainer', dataObj)
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
      var tempdata = { 'deviceId': list.list.device_id, 'parent_id': obj, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log('INNNN')
      //console.log(tempdata)
      // End
      $.ajax({
        url: URL + 'device/changeDevice',
        async: false,
        data: tempdata,
        method: 'POST',
        success: function (result) {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
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
      // this.$store.commit('UpdateMetaValue', {'groupId':this.tableFullInfo.group_id ,'metaKey': key, 'metaValue': newVal, 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.key})
      //console.log(obj)
      // //console.log(state.Device[obj.key][obj.numKey])
      state.Device[obj.key][obj.numKey][obj.name] = obj.value
    },
    DropDeviceFromSideBar: (state, obj) => {
      var responce = false
      var data = state.Setting.DragdropContainer
      var dropfrom = obj.dropfrom
      // Start Store Data into DB
      var URL = state.Setting.baseUrl
      var tempdata = { 'deviceId': data.list.device_id, 'parent_id': dropfrom.name, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
      //console.log('INNNN')
      //console.log(tempdata)
      // End
      $.ajax({
        url: URL + 'device/changeDevice',
        async: false,
        data: tempdata,
        method: 'POST',
        success: function (result) {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
            responce = false
          }
        })
      if (responce) {
        state.Device[dropfrom.name].unshift(data.list)
        delete state.Setting.DragdropContainer
      } else {
        alert('Somthing Went Wrong!')
      }
    },
    DropGroupFromSideBar: (state, obj) => {
      //console.log('Here I am',obj)
      // this is For Server
      var URL = state.Setting.baseUrl
      // var responce = false
      var UploadTemp = []
      // End
      var dropfrom = obj.dropdata
      var dropto = obj.dropfrom
      var fromData = state.Device[dropfrom.name]
      /* //////////////////////////////////////////////////////////// */
      let AllDevice = []
      let keyss = [parseInt(obj.dropdata.parentKey)]
      let check = 'parentnode'
      //console.log('Here is key',obj.dropdata.parentnode)
      for(let i=parseInt(obj.dropdata.level.slice(1, 2))+1; i<=6; i++) {
        //console.log('Its Run',i)
        Object.keys(state['L'+i]).forEach(function(keys, vals){
         //console.log(state['L'+i][keys])
         if(keyss.includes(parseInt(state['L'+i][keys][check]))){
          if(!keyss.includes(keys)) {
            keyss.push(state['L'+i][keys].name)
          }
        }
      })
      }
      keyss.forEach(function(value){
        Object.keys(state.Device[value]).forEach(function(key1, val1){
          AllDevice.push(state.Device[value][key1])
        })
      })
      /* /////////////////////////////////////////////////////////// */
      AllDevice.forEach(function (val, key) {
        var obj = {}
        obj = { 'deviceId': val.device_id, 'parent_id': dropto.name, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
        UploadTemp.push(obj)
      })
      delete state.Device[dropfrom.name]

      // Start Store Data into DB
      $.ajax({
        url: URL + 'device/BulkChangeDevice',
        async: false,
        data: {'data': JSON.stringify(UploadTemp), 'token':window.localStorage.getItem('token'), 'key':KEY},
        method: 'POST',
        success: function (result = '') {
          // responce = true
          //Put JQUERY EVENT OF LIVE UPDATE
          $('.customRefresh').click();
          if(state.Setting.CurrentTableDataShowInfo && $('#footerTable tr:nth-child(2)').length){
            let key = state.Setting.CurrentTableDataShowInfo.key
            $('[data-groupkey='+key+'] span:first').click(); 
          }
        },
        error: function (error = '') {
            // location.reload();
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
      var AllCompany = ''
      var Alllog = ''
      var User = ''
      var LastLog = ''
      $.ajax({
        url: URL + 'device/sync',
        async: false,
        method: 'GET',
        data: {token:token, account_id:account_id},
        success: function (result) {
          window.localStorage.setItem('token', token);
          window.localStorage.setItem('account_id', company_id);
          AllDevice = result.AllDevice
          AllGroup = result.AllGroup
          Alllog = result.log
          User = result.user
          AllCompany = result.AllCompany
          LastLog = (result.lastlog ? result.lastlog.operation : '');
        },
        error: function () {
          window.localStorage.setItem('token', token);
          // Sets the new location of the current window.
          window.location = state.Setting.redirectUrl;
        }
      })

      // SET LAST OPERATION DONE FROM SOFTWARE MANG.
      state.LastLog = LastLog;

      // This is for Super Admin
      let CompObj = { 'name': 'RETAIL', 'display_name': 'RETAIL', 'company_id':'RETAIL','parentnode':'RETAIL'}
      Vue.set(store.state['L0'], 'RETAIL', CompObj)
      Vue.set(state.Device, 0, [])
      $.each(AllCompany, function (index, value) {
        let CompObj = { 'name': value.id, 'display_name': value.name,'company_id': value.mct_company_id, 'parentnode': value.id }
        Vue.set(store.state['L0'], value.id, CompObj)
        Vue.set(state.Device, value.id, [])
      })
      // End

      $.each(AllGroup, function (index, value) {
        let parentnodes = ''
        if(value.parent_id == null){
          parentnodes = value.parent_id
        } else {
          parentnodes = value.parent_id.toString()
        }
        let GroupObj = { 'name': value.id, 'display_name': value.name,'company_id': value.company_id, 'parentnode': parentnodes }
        Vue.set(store.state['L'+value.depth], value.id, GroupObj)
        Vue.set(state.Device, value.id, [])
      })
      
      //console.log('Go In that Break Point')
      //console.log(AllDevice.user);
      User.roleName = 'Member'
      User.roleId = 2
      if(User.role == 1){
        User.roleName = 'Super Admin'
        User.roleId = 1
      } 
      if (User.role == 3){
        User.roleName = 'Administrator'
        User.roleId = 3
      }
      state.Setting.userInfo = User;
      //console.log('Go In that Break Point')

      $.each(AllDevice, function (index, value) {
        let parentnode = '';
        if(value.group_id==null){
          parentnode = value.group_id
        } else {
          parentnode = value.group_id.toString()
        }
        let DeviceObj = {
          'name': value.name,
          'device_id': value.id,
          'model': value.model_name,
          'parentnode': parentnode,
          'group_id' : value.group_id}
          $.each(value.dms_equipment, function (metaIndex, metaValue) {
            DeviceObj[metaValue.parameter_key] = metaValue.parameter_value
          })
          DeviceObj['description'] = value.description
          if(value.device_data) {
            DeviceObj['mac'] = value.device_data.mac_address
          }
          if(state.Device[value.group_id]) {
            state.Device[value.group_id].unshift(DeviceObj)
          }
        })

      $.each(Alllog, function (index, value) {
        // Added Log
        if(value.with_user){
          state.StatusLog.unshift('Time: '+value.created_at+' Operation :'+value.operation+' Username: '+value.with_user.name+ ' Company Id: '+value.with_user.company_id)
        } else {
          state.StatusLog.unshift('Time: '+value.created_at+' Operation :'+value.operation)
        }
      })

      

      // Make True Object
      var treeData = {
        name: "All",
        type: "group",
        displayS: 'All',
        display_name: 'All',
        children: []
      }

      //$.each(store.state, function (index, value) {
          //if(index == "L1" || index == "L2" || index == "L3" || index == "L4" || index == "L5" || index == "L6"){
            $.each(store.state.L2, function (index2, value2) {
              value2['children'] = []
              value2['type'] = 'group'
              value2['displayS'] = value2.id
              //value2['id'] = value2.name
              //value2['name'] = value2.display_name
              treeData.children.push(value2)
              $.each(store.state.Device[value2['name']], function (dI, dV) {
                dV['type'] = 'device'
                dV['displayS'] = dV.name
                value2.children.push(dV)
              })

              $.each(store.state.L3, function (index3, value3) {
                if(value2.name == value3.parentnode){
                  value3['children'] = []
                  value3['type'] = 'group'
                  value3['displayS'] = value3.id
                  //value3['display_name'] = value3.id
                  //value3['id'] = value3.name
                  //value3['name'] = value3.display_name
                  value2.children.push(value3)
                  //console.log('INNNNNN',store.state.Device);
                  //if(store.state.Device[value3['id']]){
                    $.each(store.state.Device[value3['name']], function (dI, dV) {
                      dV['type'] = 'device'
                      dV['displayS'] = dV.name
                      value2.children.push(dV)
                    })
                  //}
                }

                ///////////////////////////
                  $.each(store.state.L4, function (index4, value4) {
                    if(value3){
                      if(value3.name == value4.parentnode){
                        value4['children'] = []
                        value4['type'] = 'group'
                        value4['displayS'] = value4.id
                        //value4['id'] = value4.name
                        //value4['name'] = value4.display_name
                        if(value3.children){
                          value3.children.push(value4)
                          //if(store.state.Device[value4['id']]){
                            $.each(store.state.Device[value4['name']], function (dI, dV) {  
                              console.log(dV,'Checking');
                              dV['type'] = 'device'
                              dV['displayS'] = value4.name
                              //dV['name'] = dV.name
                              value3.children.push(dV)
                            })
                          //}
                        }
                      }
                    }

                    ////////////////////////
                      $.each(store.state.L5, function (index5, value5) {
                        if(value4){
                          if(value4.name == value5.parentnode){
                            value5['children'] = []
                            value5['type'] = 'group'
                            value5['displayS'] = value5.id
                            //value5['id'] = value5.name
                            //value5['name'] = value5.display_name
                            if(value4.children){
                              value4.children.push(value5)
                              //if(store.state.Device[value4['id']]){
                                $.each(store.state.Device[value4['name']], function (dI, dV) {
                                  dV['type'] = 'device'
                                  dV['displayS'] = value5.name
                                  //dV['name'] = dV.name
                                  value4.children.push(dV)
                                })
                              //}
                            }
                          }
                        }

                        ///////////////////////
                          $.each(store.state.L6, function (index6, value6) {
                            if(value5){
                              if(value5.name == value6.parentnode){
                                value5['children'] = []
                                value5['type'] = 'group'
                                value5['displayS'] = value6.id
                                //value5['id'] = value5.name
                                //value5['name'] = value5.display_name
                                if(value5.children){
                                  value5.children.push(value6)
                                  //if(store.state.Device[value4['id']]){
                                    $.each(store.state.Device[value5['name']], function (dI, dV) {
                                      dV['type'] = 'device'
                                      dV['displayS'] = value6.name
                                      //dV['name'] = dV.name
                                      value5.children.push(dV)
                                    })
                                  //}
                                }
                              }
                            }
                          });
  
                        //////////////////////

                      });

                    ///////////////////////
                  });

                //////////////////////////
              });
            });
            store.state.tree = treeData

      // End tree Object
      if($.urlParam('software')){
        state.Setting.IsShowSoftwareMang = $.urlParam('software')
      }
    },
    Logout : (state, obj) => {
      //console.log(state.Setting.LogoutUrl+'?token='+window.localStorage.getItem('token'))
      window.location = state.Setting.LogoutUrl+'?token='+window.localStorage.getItem('token');
      return true
    },
    UpdateMetaValue: (state, obj) => {
      //console.log(obj)
      let responce = false
      var URL = state.Setting.baseUrl
      // Start Store Data into DB
      var log = ', Updated ' + obj.metaValue + ', ' + obj.metaKey + ', success'
      let data = {Mbdid: obj.bdid,log: log, bdid: obj.deviceId, parameter_key: obj.metaKey, parameter_value: obj.metaValue, token: window.localStorage.getItem('token'), 'key':KEY}
      $.ajax({
        url: URL + 'device/adding/metavalue',
        async: false,
        data: data,
        method: 'POST',
        success: function (result = '') {
          responce = true
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
            msg = 'Uncaught Error.\n' + jqXHR.responseText;
            location.reload();
          }
          alert(msg)
            // location.reload();
            responce = false
          }
        })
      // End
      if(responce) {
        state.StatusLog.unshift(GetDataTime() + log)
        state.Device[obj.groupId][obj.key][obj.metaKey] = obj.metaValue
      } else {
        // location.reload();
      }
    },
    UpdateMacValue: (state, obj) => {
      let responce = false
      var URL = state.Setting.baseUrl
      // Start Store Data into DB
      let data = {bdid: obj.deviceId, mac_address: obj.metaValue, model: '', token: window.localStorage.getItem('token'), 'key':KEY}
      $.ajax({
        url: URL + 'device/adding/devicedata',
        async: false,
        data: data,
        method: 'POST',
        success: function (result = '') {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
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
      let data = {bdid: obj.deviceID, token: window.localStorage.getItem('token'),'key':KEY}
      $.ajax({
        url: URL + 'device/reset',
        async: false,
        data: data,
        method: 'POST',
        success: function (result = '') {
          responce = true
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
           msg = 'Uncaught Error.\n' + jqXHR.responseText;                 location.reload();
         }
         alert(msg)
            // location.reload();
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
    },
    SetTableSelectDeviceId:(state, obj) => {
      state.Setting.SetTableSelectDeviceId = obj.data
      //console.log(state.Setting.SetTableSelectDeviceId)
    },
    DropDeviceFromtableToSidebar:(state, obj)=>{
      var URL = state.Setting.baseUrl
      let DeviceKey = state.Setting.SetTableSelectDeviceId
      let ParentNode = obj.dropfrom.name
      let UploadTemp = []
      //console.log(state.Setting.SetTableSelectDeviceId)
      //console.log('Here is parent',obj.dropfrom.parentnode)
      //console.log(obj)
      DeviceKey.forEach(function (val, key) {
        var obj = {}
        obj = { 'deviceId': val, 'parent_id': ParentNode, 'company_id': window.localStorage.getItem('account_id'), 'token': window.localStorage.getItem('token'), 'access_token': 'sdfjkhfdsjkjhksj', 'key':KEY }
        UploadTemp.push(obj)
      })
      state.Setting.SetTableSelectDeviceId = null

      // Start Store Data into DB
      $.ajax({
        url: URL + 'device/BulkChangeDevice',
        async: false,
        data: {'data': JSON.stringify(UploadTemp), 'token':window.localStorage.getItem('token')},
        method: 'POST',
        success: function (result = '') {
          // responce = true
        },
        error: function (error = '') {
            // location.reload();
          }
        })

    }
  },
})
function GetDataTime(){
  let date = new Date()
  return date.getFullYear()+'-'+parseInt(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
}
export default store
