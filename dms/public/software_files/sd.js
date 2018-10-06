import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true
const http=Vue.http
Vue.use(Vuex)
const store = new Vuex.Store({
  strict: true,
  'state': {
    'L1': {
      'all': {
        'name': 'all',
        'parentnode': null,
        'Device': null
      }
    },
    'L2': {
      'uncategories': {
        'name': 'uncategories',
        'parentnode': 'all'
      },
      'tgtest': {
        'name': 'tgtest',
        'parentnode': 'all'
      }
    },
    'L3': {
      'teo1': {
        'name': 'teo1',
        'parentnode': 'teo10789'
      },
      'teo5': {
        'name': 'teo5',
        'parentnode': 'tgtest'
      }
    },
    'L4': {
      'teo10789': {
        'name': 'teo10789',
        'parentnode': 'teo5'
      },
      'teo389': {
        'name': 'teo389',
        'parentnode': 'teo5'
      }
    },
    'L5': {
      'teo145': {
        'name': 'teo145',
        'parentnode': 'teo389'
      },
      'teo311': {
        'name': 'teo311',
        'parentnode': 'teo389'
      }
    },
    'L6': {
      'teo11': {
        'name': 'teo11',
        'parentnode': 'teo10789'
      },
      'teo31': {
        'name': 'teo31',
        'parentnode': 'teo10789'
      }
    },
    'Setting': {
      'baseUrl': 'http://localhost:8000/api/',
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
      let level = newGroupobj.level
      let cuu = 'L' + parseInt(parseInt(level[1]) + parseInt(1))
      delete newGroupobj['level']
      Vue.set(state[cuu], newGroupobj.name, newGroupobj)
      Vue.set(state.Device, newGroupobj.name, [])
    },
    addDevice: (state, newDeviceobj) => {
      let ParentKey = newDeviceobj.parentkey
      delete newDeviceobj['parentkey']
      console.log(newDeviceobj)
      // if (typeof state.Device[ParentKey] === 'undefined') {
      //   Vue.set(state.Device, ParentKey, [])
      //   state.Device[ParentKey].unshift(newDeviceobj)
      // } else {
      state.Device[ParentKey].unshift(newDeviceobj)
      // }
    },
    DeleteStoreGroup: (state, newGroupobj) => {
      Vue.delete(state[newGroupobj.level], [newGroupobj.groupkey])
    },
    DeleteDevice: (state, newDeviceobj) => {
      // var Device = state.Device[newDeviceobj.groupkey]
      // Device.splice(Device.indexOf(newDeviceobj.key), 1)
      // state.Device[newDeviceobj.groupkey] = Device
      Vue.delete(state.Device[newDeviceobj.groupkey], newDeviceobj.key)
    },
    RenameDevice: (state, newDeviceobj) => {
      state.Device[newDeviceobj.groupkey][newDeviceobj.key].name = newDeviceobj.name
    },
    RenameGroup: (state, newDeviceobj) => {
      state[newDeviceobj.level][newDeviceobj.groupkey].name = newDeviceobj.name
      const data = state[newDeviceobj.level][newDeviceobj.groupkey]
      Vue.set(state[newDeviceobj.level], newDeviceobj.groupkey, data)
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
      let list = state.Setting.DragdropContainer
      state.Device[obj].unshift(list.list)
      delete state.Setting.DragdropContainer
    },
    RecoverTableSchemaDropOtherSide: (state) => {
      var dataObj = state.Setting.DragdropContainer
      state.Device[dataObj.parentKey].unshift(dataObj.list)
      delete state.Setting.DragdropContainer
    },
    UpdateInlineEdit: (state, obj) => {
      state.Device[obj.key][obj.numKey][obj.name] = obj.value
      // console.log(state.Device[obj.key])
    },
    DropDeviceFromSideBar: (state, obj) => {
      // console.log('Drag DRop')
      var data = state.Setting.DragdropContainer
      // console.log(data)
      var dropfrom = obj.dropfrom
      state.Device[dropfrom.name].unshift(data.list)
    },
    DropGroupFromSideBar: (state, obj) => {
      // console.log('Here in Store')
      var dropfrom = obj.dropdata
      var dropto = obj.dropfrom
      var fromData = state.Device[dropfrom.name]
      fromData.forEach(function (val, key) {
        state.Device[dropto.name].unshift(val)
      })
      // console.log(state.Device[dropto.name])
      delete state.Device[dropfrom.name]
    },
    SyncData: (state, obj) => {
      console.log('Yes Its Call')
      var URL = state.Setting.baseUrl
      var Data = {'info':'Test'}
      var Header = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Key': '545'};
      Vue.http.headers.common['Accept'] = 'application/json'
      Vue.http.get(URL+'device/sync', Data).then(result => {
            console.log(result)
          }, error => {
            console.error(error);
      });

    }
  }
})
export default store
