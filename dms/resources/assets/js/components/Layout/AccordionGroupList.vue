<template>
	<li :class="[isGroup ? 'group' : 'device']">
    <input type="checkbox" v-bind:name="model.name" @click="toggleCheckbox" v-model="checked" class="deviceChckbox" />
    <label :class="{'open': open}" @click="toggle" @dblclick="changeType">
        <span v-if="!isGroup"><span class="webIcon deviceIcon"></span>{{model.name}}</span>
        <span v-if="isGroup"><span></span>{{model.display_name}}</span>
      <span v-if="!isGroup" :class="[!isGroup ? 'pull-right device tooltipDiv  webIcon appInfoTag' : 'pull-right']">
         <div class="tooltipText">
            <div class="tooltipHeader">
              <p><strong>Current Version</strong></p>
              <p>IPVT 1.2</p>
              <p class="tooltipTitle"><strong>Device Info</strong></p>
            </div>
               <table class="table tooltipTable">
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
    </label>
    <ul v-show="open" v-if="isGroup" :class="{'open': open}">
      <AccordionGroupList
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </AccordionGroupList>
    </ul>
  </li>
</template>

<script>
import { EventBus } from './../EventBus/event-bus.js'
import $ from 'jquery'

export default {
  name: 'AccordionGroupList',
  data () {
    return {

    }
  },
  props: {
    model: Object,
    selectedDeviceNames: 'name1'
  },
  data: function() {
    return {
      open: true,
      checked: false,
    };
  },
  computed: {
    isGroup: function() {
      return this.model.children && this.model.children.length;
    },
    isDevice: function() {
      var device = false;
      if(this.model.type !== 'group' && this.model.children && this.model.children.length){
        device = true;
        return this.model.children;
      }
      return false;
    },
  },
  methods: {
    toggle: function() {
      if (this.isGroup) {
        this.open = !this.open;        
      }
    },
    toggleCheckbox: function() {
      this.checked = !this.checked;
      var value= '';
      if(this.checked){
        value = this.model.name.toString()
        if (value.length > 9) {
          value = value.substring(0,9) + '...';
        }
        this.model.trimmedName = value;
        EventBus.$emit('deviceSelected', this.model);
      }else{
        EventBus.$emit('deviceUnSelected', this.model);
      }      
    },
    changeType: function() {
      if (!this.isGroup) {
        Vue.set(this.model, "children", []);
        this.open = true;
      }
    }
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
  mounted(){
    $('input[type=checkbox]').click(function(){
        if(!this.checked){
            $(this).parents('li').children('input[type=checkbox]').prop('checked',false);
        }    
        $(this).parent().find('input[type=checkbox]').prop('checked',this.checked); 
    });
  }

}
</script>

<style lang="css" scoped>
.deviceChckbox {
    position: relative;
    height: 18px;
    width: 18px;
    float: left;
    margin: 7px 0 0 5px;
    cursor: pointer;
}
.deviceChckbox:after {
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
.deviceChckbox:checked:after {
    background-position: 0 0;
}
.deviceChckbox:hover:after{
  border-color: #ec6c00;
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
    right: 2%;
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

.tooltipDiv:hover .tooltipText {
    visibility: visible;
}

.cd-accordion-menu li.group>label::before {
    content: "\f054";
}
.cd-accordion-menu  label span { display: inline-block;}
.cd-accordion-menu li {
    border-top: 1px solid #dedede;
    position: relative;
}

.cd-accordion-menu label {
    width: 90%;
}

.cd-accordion-menu label,
.cd-accordion-menu a {
    position: relative;
    display: inline-block;
    padding: 5px 5px 5px 25px;
    color: #000;
    font-weight: normal;
    margin: 0;
}

.cd-accordion-menu label::before {
    font: normal normal normal 14px/1 FontAwesome;
    left: 5px;
    transform: translateY(-50%);
    transition: transform 0.3s;
}

.cd-accordion-menu label::before,
.cd-accordion-menu label::after,
.cd-accordion-menu a::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    position: absolute;
    top: 55%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 11px;
}

.cd-accordion-menu label.open::before {
    transform: translateY(-25%) rotate(90deg);
}

.cd-accordion-menu ul label,
.cd-accordion-menu ul a {
    padding-left: 36px;
}

.no-touch .cd-accordion-menu ul label:hover,
.no-touch .cd-accordion-menu ul a:hover {
    background: #3c3f45;
}

.cd-accordion-menu ul label::before {
    left: 15px;
}

.cd-accordion-menu ul label::after,
.cd-accordion-menu ul a::after {
    left: 40px;
}

.cd-accordion-menu ul ul label,
.cd-accordion-menu ul ul a {
    padding-left: 50px;
}

.cd-accordion-menu ul ul label::before {
    left: 24px;
}

.cd-accordion-menu ul ul label::after,
.cd-accordion-menu ul ul a::after {
    left: 77px;
}

.cd-accordion-menu ul ul ul label,
.cd-accordion-menu ul ul ul a {
    padding-left: 60px;
}

.cd-accordion-menu ul ul ul label::before {
    left: 38px;
}

.cd-accordion-menu ul ul ul label::after,
.cd-accordion-menu ul ul ul a::after {
    left: 95px;
}
</style>