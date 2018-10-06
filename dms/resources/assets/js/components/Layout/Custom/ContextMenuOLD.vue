<template>
  <div>
    <div v-bind:style="StyleContext" class="contextMenu">
      <a href="javascript:;" v-show='contextDisplaySetting.Expand' @click="Expand">Expand (Collapse)</a>
      <a href="javascript:;" v-show='contextDisplaySetting.Newdevice' @click="Newdevice">New device</a>
      <a href="javascript:;" v-show='contextDisplaySetting.Newgroup' @click="Newgroup">New group</a>
      <a href="javascript:;" v-show='contextDisplaySetting.Rename' @click="Rename">Rename</a>
      <a href="javascript:;" v-show='contextDisplaySetting.Delete' @click="Delete">Delete</a>
      <a href="javascript:;" v-show='this.$store.state.Setting.context' @click="ExpandAll">Expand all</a>
      <a href="javascript:;" v-show='!this.$store.state.Setting.context' @click="CollapseAll">Collapse all</a>
    </div>
    <div>
      <modal name="hello-world">
        hello, world!
      </modal>
      <v-dialog/>
    </div>
  </div>
</template>
<script>
export default {
  props: [ 'StyleContext', 'clickTarget', 'contextDisplaySetting', 'ActionData' ],
  name: 'ContextMenu',
  data () {
    return {
      collaps: false,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    Expand (event) {
      console.log(event)
      this.$modal.show('hello-world')
      return true
    },
    Newdevice (event) {
      console.log(event)
      this.$modal.show('dialog', {
        title: 'Create New Device',
        input: 'sdf',
        text: '<label>Please enter the name of the new device.</label><br><input type="text" v-model="this.msg" class="form-control">',
        buttons: [
          {
            title: 'Add',
            handler: () => { alert('Woot!') }
          },
          {
            title: 'Cancel'
          }
        ]})
      return true
    },
    Newgroup (event) {
      console.log(event)
      this.$modal.show('dialog', {
        title: 'Create New Group',
        input: '',
        text: '<label>Please enter the name of the new group.</label><br><input type="text" class="form-control">',
        buttons: [
          {
            title: 'Add',
            handler: () => { alert('Woot!') }
          },
          {
            title: 'Cancel'
          }
        ]})
      return true
    },
    Rename (event) {
      console.log(event)
      this.$modal.show('hello-world')
      return true
    },
    Delete (event) {
      console.log(event)
      this.$modal.show('hello-world')
      return true
    },
    ExpandAll (event) {
      console.log('yes')
      this.$store.state.Setting.context = false
    },
    CollapseAll (event) {
      console.log('yes')
      this.$store.state.Setting.context = true
    }
  }
}
</script>
<style>
.contextMenu {
    position: absolute;
    background: #EC6C00;
    z-index: 999;
    border-radius: 5px;
    box-shadow: 0 0 8px rgba(0,0,0,.3);
}
.contextMenu a {
    color: #fff;
    display: block;
    padding: 12px 20px;
    border-bottom: 1px solid rgba(0,0,0,.2);
}
.contextMenu a:hover {
    text-decoration: none;
    background: #fff;
    border-color: #ccc;
    color: #1e3250;
}
</style>
