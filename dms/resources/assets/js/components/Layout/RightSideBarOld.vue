<template>
<div class="main-right-sidebar" id="also">
			<div class="right-top"><a v-bind:class="{'right-sidebar-toggle' : count == 1, 'right-sidebar-toggle right-sidebar-toggleCL' : count != 1, 'MoreThenone' : count >1}" href="javascript:void(0)" v-bind:title="titleTools.actionPanel" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><span class="glyphicon glyphicon-backward"></span></a></div>
      <div class="col-xs-4 right-tabs-icons">
        <!-- Nav tabs -->
        <ul class="nav nav-tabs tabs-left">
					<li class="text">Action</li>
          <li class="info active" data-tab="info"><a v-bind:class="{'right-sidebar-toggleForTab' : count == 1, 'right-sidebar-toggleForTab right-sidebar-toggleCL' : count != 1, 'MoreThenone' : count >1}" href="#info" data-toggle="tab" v-bind:title="titleTools.information" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-info-circle"></i></a></li>
          <li class="control" data-tab="control"><a v-bind:class="{'right-sidebar-toggleForTab' : count == 1, 'right-sidebar-toggleForTab right-sidebar-toggleCL' : count != 1, 'MoreThenone' : count >1}" href="#control" data-toggle="tab" v-bind:title="titleTools.controls" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-wrench" aria-hidden="true"></i></a></li>
          <li class="update" data-tab="update"><a v-bind:class="{'right-sidebar-toggleForTab' : count == 1, 'right-sidebar-toggleForTab right-sidebar-toggleCL' : count != 1, 'MoreThenone' : count >1}" href="#update" data-toggle="tab" v-bind:title="titleTools.softwareUpgrade" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-upload"></i></a></li>          
					<li class="update" data-tab="scheduling"><a v-bind:class="{'right-sidebar-toggleForTab' : count == 1, 'right-sidebar-toggleForTab right-sidebar-toggleCL' : count != 1, 'MoreThenone' : count >1}" href="#scheduling" data-toggle="tab" v-bind:title="titleTools.scheduling" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-calendar"></i></a></li>          
        </ul>
      </div>
      <div class="col-xs-12 right-tabs-con">
        <!-- Tab panes -->
        <div class="tab-content">					
          <div class="tab-pane info_div" id="info">
						<div class="text-right">						
						<div class="checkbox">
							<label @click="ShowAll = !ShowAll" v-bind:title="titleTools.showHideRightSide" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }">
								<input type="checkbox" v-model="ShowAll" ><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>
								Show Full Information
							</label>
						</div>
					</div>

            <div class="box-body no-padding" v-if="ShowAll">
              <div class="device_block">
			<div class="device_info">
			<h5><strong>Device Info</strong></h5>
			<div class="data_main">
				<div class="data_left">Name</div>
				<div class="data-right" v-if="tableFullInfo">
					<span v-bind:title="tableFullInfo.name">{{tableFullInfo.name | trimDeviceName}}</span>
					<span @click="Rename()" v-bind:title="titleTools.editName" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-pencil-square-o"></i></span>
				</div>
				<div class="data-right" v-if="!tableFullInfo">
					<span @click="Rename()" v-bind:title="titleTools.editName" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-pencil-square-o"></i></span>	
				</div>
			</div>

			<div class="data_main">
				<div class="data_left">Modal</div>
				<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.model}}</div>
				<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
				<div class="data_left">Type</div>
				<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.type}}</div>
				<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Group</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.group}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Mac Address</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.mac}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">IP Address</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.ip}} <span><a class="more_button" @click="IPUpdate()" href="javascript:void(0)" v-bind:title="titleTools.editIP" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }">MORE</a></span></div>
			</div>

			<div class="data_main">
			<div class="data_left">Serial No.</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.serialNo}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Version</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.version}}</div>
			<div class="data-right" v-if="!tableFullInfo">
				<span v-if="tableFullInfo" @click="Version()" v-bind:title="tableFullInfo.version" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"><i class="fa fa-bar-chart"></i></span>
			</div>
			</div>

			<div class="data_main">
			<div class="data_left"></div>
			<div class="data-right" v-if="tableFullInfo"></div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			</div>
			
			<div class="status_info">
			<h5><strong>Status Info</strong></h5>
			<div class="data_main">
				<div class="data_left">Power</div>
				<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.power}}</div>
				<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
				<div class="data_left">Source</div>
				<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.source}}</div>
				<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Signal Status</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.signalStatus}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">AV Mute</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.avmute}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Mute</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.mute}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Picture Mode:</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.pictureMode}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Aspect Ratio:</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.aspectRatio}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Ambient Sensor:</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.sensor}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<div class="data_main">
			<div class="data_left">Error:</div>
			<div class="data-right" v-if="tableFullInfo">No error</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div>

			<!-- <div class="data_main">
			<div class="data_left">Ambient Sensor:</div>
			<div class="data-right" v-if="tableFullInfo">{{tableFullInfo.sensor}}</div>
			<div class="data-right" v-if="!tableFullInfo"></div>
			</div> -->

			</div>
			</div>
            </div>


            <section class="progress clearfix" v-if="tableFullInfo">
							<div class="circle bar-orange">
								<vue-circle
								:progress=parseInt(tableFullInfo.CPU)
								:size="100"
								:reverse="false"
								line-cap="round"
								:fill="fill.orange"
								empty-fill="rgba(0, 0, 0, .1)"
								:animation-start-value="0.0"
								:start-angle="45"
								insert-mode="append"
								:thickness="15"
								:show-percent="true"
								@vue-circle-progress="progress"
								@vue-circle-end="progress_end">								
							</vue-circle>
							<h4>CPU</h4>
							</div>
							<div class="circle bar-green">
							<vue-circle
								:progress=parseInt(tableFullInfo.Memory)
								:size="100"
								:reverse="false"
								line-cap="round"
								:fill="fill.green"
								empty-fill="rgba(0, 0, 0, .1)"
								:animation-start-value="0.0"
								:start-angle="45"
								insert-mode="append"
								:thickness="15"
								:show-percent="true"
								@vue-circle-progress="progress"
								@vue-circle-end="progress_end">							
							</vue-circle>
								<h4>Memory <span>193 of 386MB</span></h4>
							</div>
							<div class="circle bar-red">
							<vue-circle
								:progress=parseInt(tableFullInfo.Network)
								:size="100"
								:reverse="false"
								line-cap="round"
								:fill="fill.red"
								empty-fill="rgba(0, 0, 0, .1)"
								:animation-start-value="0.0"
								:start-angle="45"
								insert-mode="append"
								:thickness="15"
								:show-percent="false"
								@vue-circle-progress="progress"
								@vue-circle-end="progress_end">
									<p>{{tableFullInfo.Network}}<br> Mbps</p>									
							</vue-circle>
							<h4>Network</h4>
							</div>
            <!-- <div class="progress-radial progress-45 setsize">
              <div class="overlay setsize">
                <p>CPU <span v-if="tableFullInfo">{{tableFullInfo.CPU}}%</span></p>
              </div>
            </div>
            <div class="progress-radial progress-55 setsize">
              <div class="overlay setsize">
                <p>Memory <span v-if="tableFullInfo">{{tableFullInfo.Memory}}%</span></p>
              </div>
            </div>
            <div class="progress-radial progress-30 setsize">
              <div class="overlay setsize">
                <p>Network <span v-if="tableFullInfo">{{tableFullInfo.Network}}Mbps</span></p>
              </div>
            </div> -->
          </section>
          </div>

          <div class="tab-pane control_div" id="control">
          	<div class="controls_tabs">
						<div class="clearfix margin-btm controls_tabs_top">
							<p class="text-center"><strong v-if="tableFullInfo"><span v-bind:title="tableFullInfo.name">{{tableFullInfo.name | trimDeviceName}}</span></strong>
							</p>
							<div class="controls_title">Power</div>
							<div class="controls_btns" v-if="tableFullInfo">
								<button type="button" class="btn" v-bind:class="{ 'btn orange-btn': tableFullInfo.power == 'on' }" @click="UpdateMetaValue('on','power')">On</button>
								<button type="button" class="btn off-btn-color" v-bind:class="{ 'btn orange-btn': tableFullInfo.power == 'off' }" @click="UpdateMetaValue('off','power')">Standby</button>
							</div>
						</div>
						<p><strong>Quick Settings</strong></p>
          	<div class="filex-row">
						<ul class="controls_tabs_list">
							
							<li>
								<div class="controls_title">Input Source</div>
								<div class="controls_btns">
									<button type="button" @click="OnInputSource()" class="btn btn-default" v-if="tableFullInfo">{{tableFullInfo.inputSource}}<i class="fa fa-angle-right"></i></button>
									<button type="button" class="btn btn-default" v-if="!tableFullInfo"> <i class="fa fa-angle-right"></i></button>
								</div>
							</li>							
							<li>
								<div class="controls_title">Aspect Ratio</div>
								<div class="controls_btns" v-if="tableFullInfo">
									<select class="form-control" v-model="aspectRatio" @change="UpdateMetaValue(aspectRatio, 'aspectRatio')">
										<option>1</option>
										<option>2</option>
										<option>3</option>
										<option>4</option>
										<option>5</option>
									</select>
								</div>
								<!--<div class="controls_btns" v-if="tableFullInfo">
									<button type="button" @click="AspectRatio()" class="btn btn-default">{{tableFullInfo.aspectRatio}}<i class="fa fa-angle-right"></i></button>
								</div>-->
							</li>							
							<li>
								<div class="controls_title">Volume</div>
								<!--<div class="controls_btns" v-if="tableFullInfo">
									<button type="button" @click="OnVolume()" class="btn btn-default">{{tableFullInfo.volume}}<i class="fa fa-angle-right"></i></button>
								</div>-->
								<div class="controls_btns" v-if="tableFullInfo">
									<select class="form-control" v-model="volume" @change="UpdateMetaValue(volume, 'volume')">
										<option >1</option>
										<option >2</option>
										<option >3</option>
										<option >4</option>
										<option >5</option>
									</select>
								</div>
							</li>
							<li>
								<div class="controls_title">Picture Mode</div>
								<div class="controls_btns" v-if="tableFullInfo">
									<button type="button" @click="onPictureMode()" class="btn btn-default">{{tableFullInfo.pictureMode}} <i class="fa fa-angle-right"></i></button>
								</div>
							</li>
						</ul>
						<ul class="controls_tabs_list">
						<li>
								<div class="controls_title">AV Mute</div>
								<div class="controls_btns" v-if="tableFullInfo">
									<button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.avmute == 'on' }" @click="UpdateMetaValue('on','avmute')">On</button>
									<button type="button" class="btn off-btn-color" v-bind:class="{ 'orange-btn': tableFullInfo.avmute == 'off' }" @click="UpdateMetaValue('off','avmute')">Off</button>
								</div>
							</li>
						<li>
								<div class="controls_title">Audio Mute</div>
								<div class="controls_btns" v-if="tableFullInfo">
									<button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.audioMute == 'on' }" @click="UpdateMetaValue('on','audioMute')">On</button>
									<button type="button" class="btn off-btn-color" v-bind:class="{ 'orange-btn': tableFullInfo.audioMute == 'off' }" @click="UpdateMetaValue('off','audioMute')">Off</button>
								</div>
							</li>
							<li>
								<div class="controls_title">Screen Blank</div>
								<div class="controls_btns" v-if="tableFullInfo">
									<button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.screenBlank == 'on' }" @click="UpdateMetaValue('on','screenBlank')">On</button>
									<button type="button" class="btn off-btn-color" v-bind:class="{ 'orange-btn': tableFullInfo.screenBlank == 'off' }" @click="UpdateMetaValue('off','screenBlank')">Off</button>
								</div>
							</li>													
						</ul>
          </div>
						<div class="clearfix col-sm-12">
							<button type="button" class="pull-right outline_btn btn" @click="ResetAll()">Reset All</button>
						</div>
					</div>
          </div>

          <div class="tab-pane update_div" id="update">
						
          	<div class="clearfix software_upgrade">
							<div v-if="settings.runloader" class="loader_div"><img src="/images/loading.gif" alt="searching...."></div>
          		<div class="clearfix margin-btm software_upgrade_top">
					<p class="pull-left"><strong v-if="tableFullInfo"><span v-bind:title="tableFullInfo.name">{{tableFullInfo.name | trimDeviceName}}</span></strong></p>
					<div class="pull-right" v-if="$store.state.Setting.StoreVmVarDeviceUpdt.updateReq == 'Yes'">
						<button type="button" class="btn btn-default" @click="deviceUpdate()">Upgrade Now </button>
						<span class="Upgrade_version" v-if="$store.state.NeedUpdate.get_app">{{$store.state.NeedUpdate.get_app.get_need_update_version.version_name}}<i @click="upgradeNow(1,'','',$store.state.NeedUpdate)" :title="$store.state.NeedUpdate.get_app.description" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }" aria-hidden="true" class="fa fa-tag"></i></span>
					</div>
					<div class="pull-right" v-if="$store.state.Setting.StoreVmVarDeviceUpdt.updateReq == 'No'">
						<button type="button" class="btn btn-default" @click="deviceUpdate()">Most Updated </button>
						<span class="Upgrade_version" v-if="tableFullInfo">{{tableFullInfo.version}} <i @click="upgradeNow(2,'','',tableFullInfo)" :title="tableFullInfo.description" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }" aria-hidden="true" class="fa fa-tag"></i></span> 
					</div>
					<div class="">
						<a href="javascript:void(0)" class="btn btn-default hide" @click="$modal.show('AllInfo')">Check All Model</a>
					</div>
				</div>
				<div class="add_btn clearfix" @click="AddApplicationDisplayAllApp()"><a href="javascript:void(0)"><i class="fa fa-plus" v-bind:title="titleTools.softwareAdd" v-tippy="{ placement : 'right',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"></i></a></div>
				<div class="instailling" v-if="settings.process"> ({{settings.counter}}%) Installing % {{settings.process}} %</div>
				<div class="table-responsive software_upgrade_table overflow-hide">
				<h5>Installed Application <span v-if="$store.state.DisplaySoftwareList">({{Object.keys($store.state.DisplaySoftwareList).length}})</span></h5>
				<table class="table table-bordered">				
					<thead>
						<tr>
							<th>Application </th>
							<th>Version</th>
							<th>Date of modification</th>
							<th>Size</th>
							<th>APP Update</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(list, key) in $store.state.DisplaySoftwareList" class="TH" v-bind:key="key" v-bind:data-identify="list.id" @click="selectThisApp(list)">							
							<td v-if="list.get_app.get_app_version">{{list.get_app.name}}<a class="hover-div" href="javascript:void(0)" @click="upgradeNow(2,'edit',list)"><i class="fa fa-tag" aria-hidden="true" :title="list.get_app.name" v-tippy="{ placement : 'bottom',  theme: 'tool', duration: 500, arrow: true, size: 'large' }"></i></a></td>
							<td v-if="list.get_app.get_app_version">{{list.get_app.get_app_version.version_name}}</td>
							<td v-if="list.get_app.get_app_version">{{list.get_app.get_app_version.updated_at}}</td>
							<td v-if="list.get_app.get_app_version">{{list.get_app.get_app_version.size}}</td>
							<td v-if="list.get_app.get_app_version"><span v-if="list.get_app.get_need_update_version"><i class="fa fa-bar-chart" aria-hidden="true"></i>{{list.get_app.get_need_update_version.size}} {{list.get_app.get_need_update_version.md5}}</span></td>							
						</tr>
					</tbody>
				</table>
				</div>
          	</div>
          </div>
					<!-- This is for scheduling -->
					<div class="tab-pane control_div" id="scheduling">
					</div>
        </div>
      </div>

			<!--Being Start Model-->
				<modal name="InputSource">
          <header class="modal-header">
            <slot name="header">
              <h4>Change Input Source
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('InputSource')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body" v-if="tableFullInfo">
              <div class="text-center input_source">
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.inputSource == 'HDMI-1' }" @click="UpdateMetaValue('HDMI-1','inputSource')">HDMI-1 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.inputSource == 'HDMI-2' }" @click="UpdateMetaValue('HDMI-2','inputSource')">HDMI-2 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.inputSource == 'AV' }" @click="UpdateMetaValue('AV','inputSource')">AV<i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.inputSource == 'VGA-1' }" @click="UpdateMetaValue('VGA-1','inputSource')">VGA-1 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.inputSource == 'VGA-2' }" @click="UpdateMetaValue('VGA-2','inputSource')">VGA-2 <i class="fa fa-angle-right"></i></button></div>
            </div>
						</slot>
					<p class="text-center">Command may take a while to apply. </p>
					
          </section>
          <footer class="modal-footer btn-center-all">
              <slot name="footer">
                <button type="button" class="btn-default btn" @click="CloseModel('InputSource')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="OnVolume">
          <header class="modal-header">
            <slot name="header">
              <h4>Change Volume Source
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('OnVolume')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body" v-if="tableFullInfo">
              <div class="text-center input_source">
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.volume == '1' }" @click="UpdateMetaValue('1','volume')">1 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.volume == '2' }" @click="UpdateMetaValue('2','volume')">2 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.volume == '3' }" @click="UpdateMetaValue('3','volume')">3 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.volume == '4' }" @click="UpdateMetaValue('4','volume')">4 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.volume == '5' }" @click="UpdateMetaValue('5','volume')">5 <i class="fa fa-angle-right"></i></button></div>
            </div>
						</slot>
					<p class="text-center">Command may take a while to apply. </p>
					
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn pull-right" @click="CloseModel('OnVolume')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="AspectRatio">
          <header class="modal-header">
            <slot name="header">
              <h4>Change Aspect Ratio Source
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('AspectRatio')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body" v-if="tableFullInfo">
              <div class="text-center input_source">
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.aspectRatio == '1' }" @click="UpdateMetaValue('1','aspectRatio')">1 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.aspectRatio == '2' }" @click="UpdateMetaValue('2','aspectRatio')">2 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.aspectRatio == '3' }" @click="UpdateMetaValue('3','aspectRatio')">3 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.aspectRatio == '4' }" @click="UpdateMetaValue('4','aspectRatio')">4 <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.aspectRatio == '5' }" @click="UpdateMetaValue('5','aspectRatio')">5 <i class="fa fa-angle-right"></i></button></div>
            </div>
						</slot>
					<p class="text-center">Command may take a while to apply. </p>
					
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn" @click="CloseModel('AspectRatio')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="onPictureMode">
          <header class="modal-header">
            <slot name="header">
              <h4>Change Picture Mode Source 
              <button type="button" class="btn btn-close pull-right"  @click="CloseModel('onPictureMode')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body" v-if="tableFullInfo">
							<div class="text-center input_source">
              <div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.pictureMode == 'Picture Mode' }" @click="UpdateMetaValue('Picture Mode','pictureMode')">Picture Mode <i class="fa fa-angle-right"></i></button></div>
							<div class="col-sm-12"><button type="button" class="btn" v-bind:class="{ 'orange-btn': tableFullInfo.pictureMode == 'Normal Mode' }" @click="UpdateMetaValue('Normal Mode','pictureMode')">Normal Mode <i class="fa fa-angle-right"></i></button></div>
							</div>
            </slot>
						<p class="text-center">Command may take a while to apply. </p>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn" @click="CloseModel('onPictureMode')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="Version">
          <header class="modal-header">
            <slot name="header">
              <h4>Current Version
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('Version')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body">              
							<div class="device_version_info">
								<div class="table-responsive boder_bottom">
									<table class="table">
										<tr>
											<th>New Version</th>
											<td>2.0.3_WW</td>
									  </tr>
										<tr>
											<th>Descrition</th>
											<td>2.0.3_WW</td>
									  </tr>
										<tr>
											<th>Size</th>
											<td>2.0.3_WW</td>
									  </tr>
										</table>
								</div>
									<div class="table-responsive">	
										<table class="table">			
										<tr>
											<th>Current Version</th>
											<td>2.0.3_WW</td>
									  </tr>
										<tr>
											<th>Descrition</th>
											<td>2.0.3_WW</td>
									  </tr>
										<tr>
											<th>Size</th>
											<td>2.0.3_WW</td>
									  </tr>
									</table>
								</div>
							</div>
            </slot>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn" @click="CloseModel('Version')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="IPUpdate" class="IPUpdate">
          <header class="modal-header">
            <slot name="header">
              <h4>IP Configuration
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('IPUpdate')"><i class="fa fa-times"></i></button></h4>								
						</slot>
          </header>
          <section class="modal-body">
            <slot name="body">
              <div class="row">
								<div class="col-sm-4">
									<div class="radio">
										<label>
											<div class="checkbox" @click="ChangeIP('DHCP')"><label><input type="checkbox" v-model="DHCP" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span>DHCP</label></div>
										</label>
									</div>
									<ul>
										<li>MAC Address </li>
										<li>IP Address </li>
										<li>Subnet Mask </li>
										<li>Default Gateway </li>										
									</ul>
										
									</div>
									<div class="col-sm-8">
										<div class="radio">
										<label>
											<div class="checkbox" @click="ChangeIP('STATIC')"><label><input type="checkbox" v-model="STATIC" value=""><span class="cr"> <i class="cr-icon glyphicon glyphicon-ok"></i></span> STATIC</label> </div>
										</label>
									</div>
									<ul>
										<li>B0-C5-CA-70-00-10</li>
										<li>10.27.27.89</li>
										<li>255.255.255.0</li>
										<li>10.27.27.254</li>									
									</ul>
								</div>
								</div>
            </slot>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-success btn" @click="FinalChangeIP()">Ok</button>
                <button type="button" class="btn-default btn" @click="CloseModel('IPUpdate')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="Rename">
          <header class="modal-header">
            <slot name="header">
            <h4>  Rename
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('Rename')"><i class="fa fa-times"></i></button>
          </h4>  </slot>
          </header>
          <section class="modal-body">
            <slot name="body" v-if="tableFullInfo">
            <label>Please Enter New Name</label>
            <input name="name" v-model="name"  type="text" class="form-control">
            </slot>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-success btn" @click="RenameDevice('Rename')">Rename</button>
                <button type="button" class="btn-default btn" @click="CloseModel('Rename')">Cancel</button>
            </slot>
          </footer>
        </modal>

				<!--Here is start Software Model-->
				<modal name="DeviceVersionInfo">
          <header class="modal-header text-center">
            <slot name="header">
              <h4>Device Version Info
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('DeviceVersionInfo')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body device-Version-Info">
            <div class="div_flex">
            	<p class="pull-right"><span v-if="settings.enableEdit"><button @click="ApplicationEdit(ClickApplicationVersion)" class="btn">Edit</button></span></p>
            	<div class="form-group">
					<label class="col-md-4">Current Version</label>
					<label class="col-md-8"><span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_app_version.version_name}}</span>
					</label>
				</div>
				<div class="form-group">
					<label class="col-md-4">Description</label>
					<label class="col-md-8"><span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.description}}</span></label>
				</div>
				<div class="form-group">
					<label class="col-md-4">Size</label>
					<label class="col-md-8"><span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_app_version.size}}</span></label>
				</div>
		<!--<ul>
				<li>
					<span><strong>Current Version</strong></span>
					<span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_app_version.version_name}}</span>
					
				</li>
				<li>
					<span><strong>Description</strong></span>
					<span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.description}}</span>
				</li>
				<li>
					<span><strong>Size</strong></span>
					<span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_app_version.size}}</span>
				</li>
			</ul> -->
			<div class="second_modal" v-if="settings.updateDeviceBlock">
				<div class="form-group">
					<label class="col-md-4">New Version</label>
					<label class="col-md-8"><span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_need_update_version.version_name}}</span></label>
				</div>
				<div class="form-group">
					<label class="col-md-4">Description</label>
					<label class="col-md-8"><span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.description}}</span></label>
				</div>
				<div class="form-group">
					<label class="col-md-4">Size</label>
					<label class="col-md-8"><span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_need_update_version.size}}</span></label>
				</div>
			</div>
						
<!-- 			<ul class="second_modal" v-if="settings.updateDeviceBlock">
				<li>
					<span><strong>New Version</strong></span>
					<span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_need_update_version.version_name}}</span>
				</li>
				<li>
					<span><strong>Description</strong></span>
					<span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.description}}</span>
				</li>
				<li>
					<span><strong>Size</strong></span>
					<span v-if="ClickApplicationVersion.get_app">{{ClickApplicationVersion.get_app.get_need_update_version.size}}</span>
				</li>
			</ul> -->
		</div>
          </section>
          <footer class="modal-footer text-center">
              <slot name="footer">
                <button type="button" class="btn-default btn" @click="CloseModel('DeviceVersionInfo')">Close</button>
            </slot>
          </footer>
      	</modal>

				<modal name="DeviceUpdate">
          <header class="modal-header">
            <slot name="header">
              <h4>Device Version Info
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('DeviceUpdate')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <p>The system might lose connection with the
device during device update. The connection
will be restored automatically once the
update is done.</p>
<p>Please help confirm the operation.</p>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
								<button type="button" class="btn-default btn pull-right" @click="updatedNow()">Updated Now</button>
                <button type="button" class="btn-default btn pull-right" @click="CloseModel('DeviceUpdate')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="SelectApp">
          <header class="modal-header text-center">
            <slot name="header">
              <h4 >Select Application
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('SelectApp')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body device-Version-Info">
            <div class="table-responsive software_upgrade_table">
						<h5>Available on server:</h5>
						<table class="table table-bordered">				
							<thead>
								<tr>
									<th></th>
									<th>Name <span class="sort-icon pull-right"><a v-if="isAscending" @click="sort('name')">▼</a>
                  <a v-else @click="sort('name')">▲</a></span> </th>
									<th>Version</th>
									<th>Date of modification</th>
									<th>Size</th>
									<!-- <th>APP Update</th> -->
								</tr>
							</thead>
							<tbody>
								<tr v-for="(list, key) in tableData" v-bind:key="key">
									<!-- <td>{{forCheckBox}}<div class="checkbox" @click="updateTableCheck['A'+key+1]"><label><input type="checkbox" style="display:none" v-model="forCheckBox['A'+key+1]" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div></td> -->
									<td><div class="checkbox" @click="updateTableCheck('A'+key+1,list)"><label><input type="checkbox" style="display:none" v-model="forCheckBox['A'+key+1]" value=""><span class="cr"><i class="cr-icon glyphicon glyphicon-ok"></i></span></label></div></td>
									<td>{{list.app_name}}<a class="hover-div" href="javascript:void(0)"><i class="fa fa-tag" aria-hidden="true"></i> <div class="hover-open-div"><div class="div_flex"><ul><li><span><strong>APP Name</strong></span> <span>{{list.app_name}}</span></li> <li><span><strong>Description</strong></span> <span>{{list.description}}</span></li> <li><span><strong>Version</strong></span> <span>{{list.version}}</span></li></ul> </div> </div></a></td>
									<td>{{list.version}}</td>
									<td>{{list.date_modified}}</td>
									<td>{{list.size}}</td>
								</tr>
							</tbody>
						</table>
						</div>
          </section>
          <footer class="modal-footer text-center">
              <slot name="footer">
								<!--$modal.show('SelectBrowseOption'); -->
								<!--@click="CloseModel('SelectApp');"-->
								<input name="file" type="file" class="form-control hide Browses" ref="file" v-on:change="handleFileUpload()">
                <button type="button" class="btn-default btn pull-left" onclick="$('.Browses').click();">Select From LocalFile</button>
								<button type="button" v-if="!checkIfDeviceCheck" class="btn-default btn pull-right" @click="UpdateDeviceInSearch(forCheckBox)">Install</button>
								<button type="button" v-if="checkIfDeviceCheck" disabled class="btn-default btn pull-right" @click="UpdateDeviceInSearch(forCheckBox)">Install</button>
								<button type="button" class="btn-default btn pull-right" @click="CloseModel('SelectApp')">Close</button>
            </slot>
          </footer>
      	</modal>

				<modal name="AddApplicationInfo">
          <header class="modal-header">
            <slot name="header">
              <h4 v-if="settings.enableEdit">Edit Application Info
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('AddApplicationInfo')"><i class="fa fa-times"></i></button></h4>
							<h4 v-if="!settings.enableEdit">Add Application Info
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('AddApplicationInfo')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
            <slot name="body">              
							<div class="device_version_info">
								<div class="table-responsive">
									<table class="table add-Application-Info">
										<tr>
											<th>App Name</th>
											<td>
												<input type="text" class="form-control" value="Test" v-show="!selectAppData" v-if="!settings.enableEdit" v-model="ApplicationInputObj.name">
												<label v-if="settings.enableEdit || selectAppData">{{ApplicationInputObj.name}}</label>
											</td>
									  </tr>
										<tr>
											<th>Description</th>
											<td><textarea class="form-control" v-model="ApplicationInputObj.description">Demo</textarea></td>											
									  </tr>
										<tr>
											<th>Version</th>
											<td>												
												<label>{{ApplicationInputObj.version}}</label>
											</td>
									  </tr>

									  <span v-if="!settings.enableEdit">
									  <tr>
									  	<th>File Name</th>
									  	<td><label>{{ApplicationInputObj.FileName}}</label></td>
									  </tr>
									<!--	<tr>
										 <th>File</th>
										    <td><input name="file" type="file" class="form-control" ref="file" v-on:change="handleFileUpload()"> </td>
									    </tr> -->
									</span>
										</table>

								</div>
							</div>
            </slot>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
								<button type="button" class="btn-default btn" @click="InstallDeviceViaPopUP()">Upload/Install</button>
                <button type="button" class="btn-default btn" @click="CloseModel('AddApplicationInfo')">Cancel</button>
            </slot>
          </footer>
      	</modal>

				<modal name="Info">
          <header class="modal-header">
            <slot name="header">
              <h4>{{settings.info}}
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('Info')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
						<br/>
            {{settings.details}}
						<br/>
						<br/>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn pull-right" @click="CloseModel('Info')">OK</button>
            </slot>
          </footer>
      	</modal>

				<modal name="SelectBrowseOption">
          <header class="modal-header">
            <slot name="header">
              <h4>Pick a file
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('SelectBrowseOption')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body text-center">
						<br/>
						<div class="form-group">
							<button class="btn btn-link center" onclick="$('.Browse').click();">“Upload New Application”</button>
							<input name="file" type="file" class="form-control hide Browse" ref="file" v-on:change="handleFileUpload()">
						</div>
						<h1> OR </h1>
						<div class="form-group">
							<button class="btn btn-link center" onclick="$('.Browse').click();">“Upload Application Update”</button>
						</div>
						<br/>
						<br/>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn pull-right" @click="CloseModel('SelectBrowseOption')">OK</button>
            </slot>
          </footer>
      	</modal>

				<modal name="AllInfo">
          <header class="modal-header">
            <slot name="header">
              <h4>Check All Info Model
              <button type="button" class="btn btn-close pull-right" @click="CloseModel('AllInfo')"><i class="fa fa-times"></i></button></h4>
            </slot>
          </header>
          <section class="modal-body">
             <button class="btn btn-primary" @click="OpenInfomodel(1)">Broken File</button> <br/>
						 <button class="btn btn-primary" @click="OpenInfomodel(2)">Application Install Failed</button> <br/>
						 <button class="btn btn-primary" @click="OpenInfomodel(3)">Duplicate Name</button> <br/>
						 <button class="btn btn-primary" @click="OpenInfomodel(4)">Application Update Failed</button> <br/>
						 <button class="btn btn-primary" @click="OpenInfomodel(5)">Device Update Failed</button> <br/>
          </section>
          <footer class="modal-footer">
              <slot name="footer">
                <button type="button" class="btn-default btn pull-right" @click="CloseModel('AllInfo')">OK</button>
            </slot>
          </footer>
      	</modal>

    </div>
</template>
<script>
import { EventBus } from './../EventBus/event-bus.js'
import Main from './MainContainer'
import axios from 'axios'
import VueCircle from 'vue2-circle-progress'
export default {
  props: ['TableRowData'],
  name: 'RightSideBar',
  data () {
    return {
			checkIfDeviceCheck : true,
			ClickApplicationVersion : {},
			ApplicationInputObj : {'name':'','description':'','version':'','FileName':''},
			forCheckBox : {},
			selectAppData : [],
			settings : {'updateDeviceBlock':false,'runloader':false,'process':false,'counter':0,'info':'','details':'','enableEdit':false},
			ShowAll : true,
			volume : null,
			aspectRatio : null,
			name : null,
			temp : this.$store.state.Setting.DisplayIndividualData,
			fill : { red:{ color: "red" }, green:{ color: "green" }, orange:{ color: "orange" } },
			DHCP: true,
			STATIC: false,
			titleTools: {},
			isConfirm: false,
			msg: 'Welcome to Your Vue.js App',
			file: [],
			SelectAppTable: [],
			cats:[],
			currentSort:'name',
      currentSortDir:'asc',
      pageSize:1000,
      currentPage:1,
      isAscending: true,
    }
	},
	components: {
		 VueCircle,
		 Main
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
	created: function () {
		EventBus.$on('CallToRightSideBarEdit', clickCount => {
			// this.SelectAppTable
			this.ApplicationEdit(this.SelectAppTable)
		});
		
		EventBus.$on('CallToRightSideBarUninstall', clickCount => {
			// this.SelectAppTable
			this.uninstall(this.SelectAppTable)
    });
	},
  computed: {
		count: function() {
			return this.$store.state.Setting.noRowSelected
		},
    tableFullInfo: function () {
			if(this.$store.state.Setting.DisplayIndividualData){
				this.volume = this.$store.state.Setting.DisplayIndividualData.volume
				this.aspectRatio = this.$store.state.Setting.DisplayIndividualData.aspectRatio
				this.name = this.$store.state.Setting.DisplayIndividualData.name
				this.ipAddrConfig = this.$store.state.Setting.DisplayIndividualData.ipAddrConfig
				if(this.ipAddrConfig == 'DHCP'){
					this.DHCP = true
					this.STATIC = false
				}else{
					this.STATIC = true
					this.DHCP = false
				}
			}
      return this.$store.state.Setting.DisplayIndividualData
		},
		tableData:function() { 
				 this.cats = this.$store.state.Setting.ListAllApplication;
				 console.log(this.cats.length);
         if(this.cats.length > 0){
            return this.$store.state.Setting.ListAllApplication.sort((a,b) => {
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
            return this.$store.state.Setting.ListAllApplication;
				 }
    },
  },
  mounted () {
		this.titleTools = this.$store.state.Setting.toolTipTitle

	},
	methods : {
		sort:function(s) {
       // / alert(s)
        //if s == current sort, reverse
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
		uninstall(data){
			var URL = this.$store.state.Setting.baseUrl
			$.ajax({
					url: URL + 'app/uninstall',
					async: false,
					data: {'appId':data.appId},
					method: 'POST',
					success: function (result) {
						alert('App Un-install Successfully');
						if(result.device != ""){
						} else {
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
		},
		selectThisApp(data){
			$('.software_upgrade_table .TH').removeClass('active')
			$('.software_upgrade_table [data-identify='+data.id+']').addClass('active')
			this.SelectAppTable = data
		},
		handleFileUpload(){
			 console.log('Yupe');
			 console.log(this.selectAppData);
			 this.file = this.$refs.file.files[0];
			 this.ApplicationInputObj.FileName = this.file.name
			 if(this.selectAppData){
					this.ApplicationInputObj.name = this.selectAppData.app_name
				  this.ApplicationInputObj.version = this.MakeVersion(this.selectAppData.version)
			 } else {
				  this.ApplicationInputObj.version = "1.0"
			 }
			 this.$modal.hide('SelectBrowseOption');
			 this.$modal.show('AddApplicationInfo');
			 this.$modal.hide('SelectApp');
		},
		MakeVersion(version){
			if(version){
				let arr = (version).split(".");
				if(arr.length>=1){
					if(arr[1]==9){
						arr[0] = parseInt(arr[0])+1;
						arr[1] = parseInt(arr[1])+1;
						} else {
						arr[1] = parseInt(arr[1])+1;
						}
				} else {
					arr[0] = parseInt(arr[0])+1;
				}
				return arr.join('.');
			} else {
				return "1.0";
			}
		},
		UpdateDeviceInSearch(data){
			  console.log('INN');
			  console.log(this.selectAppData);
				this.$store.commit('AddDeviceViaSearch',this.selectAppData)
				let THIS = this
				THIS.settings.process = this.selectAppData.app_name
				THIS.settings.counter = 0
				setTimeout(function(){
					THIS.settings.process = false
				},2000);
				setTimeout(function(){
					THIS.settings.counter = 50
				},1000);
				setTimeout(function(){
					THIS.settings.counter = 100
				},1000);
				this.CloseModel('SelectApp')
		},
		ApplicationEdit(data){
			console.log('INFOOOOOO');
			console.log(data);
			this.ApplicationInputObj.AppId = data.appId
			this.ApplicationInputObj.AppversionId = data.get_app.get_app_version.id
			this.ApplicationInputObj.deviceId = data.deviceId
			this.ApplicationInputObj.name = data.get_app.name
			this.ApplicationInputObj.description = data.get_app.description
			this.ApplicationInputObj.version = data.get_app.get_app_version.version_name
			this.ApplicationInputObj.FileName = data.get_app.get_app_version.version_name
			this.$modal.show('AddApplicationInfo')
		},
		OpenInfomodel(no){
			if(no == 1){
				this.settings.info = 'Broken File'
				this.settings.details = 'The file selected is broken and not applicable. Please try another one.'
			}
			if(no == 2){
				this.settings.info = 'Application Install Failed'
				this.settings.details = 'Application Install is not accomplished. No change has been made. Please try again.'
			}
			if(no == 3){
				this.settings.info = 'Duplicate Name'
				this.settings.details = 'The entered name is already in use. Please use a different one instead.'
			}
			if(no == 4){
				this.settings.info = 'Application Update Failed'
				this.settings.details = 'Application Update is not accomplished. No change has been made. Please try again.'
			}
			if(no == 5){
				this.settings.info = 'Device Update Failed'
				this.settings.details = 'Device Update is not accomplished. No change has been made. Please try again.'
			}
			this.$modal.show('Info')
			this.$modal.hide('AllInfo')
		},
		InstallDeviceViaPopUP(){      
          // Initialize the form data          
           var self = this;
           self.token = window.localStorage.getItem('token');
           let company_id = window.localStorage.getItem('account_id')
           let formData = new FormData();
           //    Add the form data we need to submit

            formData.append('file', this.file);      
            formData.append('app_name', this.ApplicationInputObj.name);
            formData.append('description', this.ApplicationInputObj.description);
            formData.append('version', this.ApplicationInputObj.version);
						formData.append('file_name', this.ApplicationInputObj.FileName);
						formData.append('deviceId', this.$store.state.Setting.DisplayIndividualData.device_id);
						formData.append('bdid', this.$store.state.Setting.DisplayIndividualData.bdid);

						if(this.selectAppData){ 
							formData.append('AppId', this.selectAppData.appId);
						} 

            axios.post( API_URL+'device/app/add',formData,{
               headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ self.token
               }
            }).then(function(data){
              if(data['data']['status'] == 200){
								self.$modal.hide('AddApplicationInfo');
								self.$store.commit('SyncData',{})
              }else{
								alert(data['data']['message']);
								self.$modal.hide('AddApplicationInfo');
								self.$store.commit('SyncData',{})
							}
							
							/*Show Loader*/
									self.settings.process = self.selectAppData.app_name
									self.settings.counter = 0
									setTimeout(function(){
										self.settings.process = false
									},2000);
									setTimeout(function(){
										self.settings.counter = 50
									},1000);
									setTimeout(function(){
										self.settings.counter = 100
									},1000);
									self.CloseModel('SelectApp')
							/*End of Loader*/
            });
    },
		AddApplicationInfoFunction(){
			this.settings.enableEdit = false
			this.ApplicationInputObj.AppId = ''
			this.ApplicationInputObj.AppversionId = ''
			this.ApplicationInputObj.deviceId = ''
			this.ApplicationInputObj.name = ''
			this.ApplicationInputObj.description = ''
			this.ApplicationInputObj.version = ''
			this.ApplicationInputObj.FileName = ''
			this.CloseModel('SelectApp')
			this.$modal.show('AddApplicationInfo')
		},
		AddApplicationDisplayAllApp(){
			this.$store.commit('RequireSoftwareUpdateList',{})
			let THIS = this
			THIS.settings.runloader = true
			THIS.CloseModel('DeviceUpdate')
				setTimeout(function(){
					THIS.settings.runloader = false
					THIS.$modal.show('SelectApp')
			},3000)
			// this.settings.enableEdit = false
			// this.ApplicationInputObj.AppId = ''
			// this.ApplicationInputObj.AppversionId = ''
			// this.ApplicationInputObj.deviceId = ''
			// this.ApplicationInputObj.name = ''
			// this.ApplicationInputObj.description = ''
			// this.ApplicationInputObj.version = ''
			// this.ApplicationInputObj.FileName = ''
			// this.CloseModel('SelectApp')
			// this.$modal.show('AddApplicationInfo')
		},
		updateTableCheck (key, value) {
			console.log(value);
			if(this.forCheckBox[key]){
				this.checkIfDeviceCheck = false
				this.forCheckBox = {[key]:false}
				this.selectAppData = value
			} else {
				this.checkIfDeviceCheck = true
				this.forCheckBox = {[key]:true}
				this.selectAppData = ''
			}
		},
		updatedNow(){
			this.$store.commit('RequireSoftwareUpdateList',{})
			let THIS = this
			THIS.settings.runloader = true
			THIS.CloseModel('DeviceUpdate')
				setTimeout(function(){
					THIS.settings.runloader = false
					//THIS.$modal.show('SelectApp')
				},3000)
		},
		upgradeNow(popup,edit='',details='',data=''){ 
			this.settings.enableEdit = false
			//console.log(popup)
			if(popup == 1){
				this.settings.updateDeviceBlock = true
			} else {
				this.settings.updateDeviceBlock = false
			}

			if(edit){
				this.settings.enableEdit = true
			}

			if(details){
				this.ClickApplicationVersion=details
				console.log(details);
			}

			if(data){
				console.log('INNN',data)
				if(data.get_app){
					this.ClickApplicationVersion = data
				}else{
					
					//this.ClickApplicationVersion = {'get_app':[{'description':data.description},{'get_app_version':{'version_name':''}}]}
					//this.ClickApplicationVersion.get_app.description = data.description
					// this.ClickApplicationVersion.get_app.get_app_version.version_name = data.version
					// this.ClickApplicationVersion.get_app.get_app_version.size = ''
					// this.ApplicationInputObj.name = data.name
					// this.ApplicationInputObj.description = data.description
					// this.ApplicationInputObj.version = data.version
					// this.ApplicationInputObj.FileName = data
				}
			}

			this.$modal.show('DeviceVersionInfo')
		},
		deviceUpdate(popup){
			this.$modal.show('DeviceUpdate')
		},
		RenameDevice(val){
			let check = this.CheckDevice(this.name)
			if(check == 10){
				this.$store.commit('RenameDevice', {'name':this.name, 'deviceID':this.tableFullInfo.device_id ,'devicekey': this.tableFullInfo.key, 'groupkey': this.tableFullInfo.group_id, 'key': this.tableFullInfo.positionofRow})
				this.CloseModel('Rename')
			} else {
				this.CloseModel('Rename')
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
						}
					]
				})
			}
		},
		ResetAll(){
			this.$modal.show('dialog', {
          title: 'Setting Changes',
          input: '',
          text: 'This will set all Setting back to their default valuea and cannot be undone. (Power Control is not affected.) Please help confirm the operation.',
          buttons: [
            {
              title: 'Ok',
              handler: () => {
								this.$store.commit('ResetAllSetting', {'deviceID':this.tableFullInfo.device_id ,'devicekey': this.tableFullInfo.key, 'groupkey': this.tableFullInfo.group_id, 'key': this.tableFullInfo.positionofRow})
                this.$modal.hide('dialog')
              }
						},
						{
              title: 'Cancel',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
      })
		},
		progress(event,progress,stepValue){
        // //console.log(stepValue);
		},
		progress_end(event){
			  // //console.log("Circle progress end");
		},
		Rename() {
			this.$modal.show('Rename')
		},
		FinalChangeIP() {
			if(this.DHCP === 'DHCP') {
				// this.DHCP = true
				this.$store.commit('UpdateMetaValue', {'bdid':this.tableFullInfo.bdid,'groupId':this.tableFullInfo.group_id ,'metaKey': 'ipAddrConfig', 'metaValue': 'DHCP', 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.positionofRow})
				this.CloseModel('IPUpdate')
			} else {
				// this.STATIC = true
				this.$store.commit('UpdateMetaValue', {'bdid':this.tableFullInfo.bdid,'groupId':this.tableFullInfo.group_id ,'metaKey': 'ipAddrConfig', 'metaValue': 'STATIC', 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.positionofRow})
				this.CloseModel('IPUpdate')
			}
		},
		ChangeIP(type) {
			this.DHCP = false
			this.STATIC = false
			if(type === 'DHCP') {
				this.DHCP = true
				// this.$store.commit('UpdateMetaValue', {'groupId':this.tableFullInfo.group_id ,'metaKey': 'ipAddrConfig', 'metaValue': 'DHCP', 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.positionofRow})
			} else {
				this.STATIC = true
				// this.$store.commit('UpdateMetaValue', {'groupId':this.tableFullInfo.group_id ,'metaKey': 'ipAddrConfig', 'metaValue': 'STATIC', 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.positionofRow})
			}
		},
		UpdateMetaValue(newVal, key) {
			let temp = null
			if(key === 'avmute') {
				temp = "AV Mute"
			} 
			if(key === 'audioMute') {
				temp = "Audio Mute"
			} 
			if(key === 'screenBlank') {
				temp = "Screen Blank"
			} 
			if(key === 'volume') {
				temp = 'Volume'
			}
			if(key === 'aspectRatio') {
				temp = 'Aspect Ratio'
			}
			if(key === 'power') {
				temp = 'Power'
			}
			if(key === 'inputSource') {
				temp = 'Input Source'
			}
			this.$modal.show('dialog', {
          title: 'Setting Changes',
          input: '',
          text: 'You are about to set "'+ temp +'" to "'+newVal+'". The command may take a while to apply.',
          buttons: [
            {
              title: 'Ok',
              handler: () => {
								this.$store.commit('UpdateMetaValue', {'bdid':this.tableFullInfo.bdid,'groupId':this.tableFullInfo.group_id ,'metaKey': key, 'metaValue': newVal, 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.positionofRow})
                this.$modal.hide('dialog')
              }
						},
						{
              title: 'Cancel',
              handler: () => {
                this.$modal.hide('dialog')
              }
            }
          ]
      })
			// this.$store.commit('UpdateMetaValue', {'groupId':this.tableFullInfo.group_id ,'metaKey': key, 'metaValue': newVal, 'deviceId': this.tableFullInfo.device_id, 'key': this.tableFullInfo.key})
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
		Version() {
			this.$modal.show('Version')
		},
		IPUpdate() {
			this.$modal.show('IPUpdate')
		},
		OnInputSource() {
			this.$modal.show('InputSource')
		},
		OnVolume() {
			OnVolume
			// this.$modal.show('OnVolume')
		},
		AspectRatio() {
			this.$modal.show('AspectRatio')

		},
		onPictureMode() {
			this.$modal.show('onPictureMode')
		},
		CloseModel(modelName) {
			this.$modal.hide(modelName)
		}
	}
}
</script>
<style>
#also{
/* clear: both; */
  float: left;
}
.software_upgrade table tr > th {
    color: #000;
    font-weight: bold;
}
.software_upgrade table tr > th, .software_upgrade table tr > td {
    border-right: 1px solid #ddd !important;
		border-bottom: 1px solid #ddd !important;
		vertical-align: middle;
		    font-size: 12px;
				padding: 10px 5px !important;
}
.software_upgrade_table table.table.table-bordered {
    border-right: none;
}


.div_flex ul {
    width: 50%;
    margin: 20px auto;
}
.div_flex ul.second_modal{
    border-top: 1px solid #d4d4d4;
    padding-top: 20px;
    margin-top: 20px;
}
.software_upgrade_table .right-tabs-con a i {
    color: #888;
}
.div_flex ul {
    width: 50%;
    margin: 20px auto;
}
.div_flex li {
    display: flex;
}
.div_flex li>* {
    width: 100%;
}
.device-Version-Info ~ footer.modal-footer {
    text-align: center;
}
.Upgrade_version {
    cursor: pointer;
}
section.modal-body.device-Version-Info {
    height: 250px;
    overflow-y: scroll;
}
.device-Version-Info .checkbox {
    margin: 0;
}
.software_upgrade_table table tr td {
    font-size: 12px;
}
.hover-open-div {
    position: absolute;
    background: #fff;
    display: none;
    padding: 10px;
    z-index: 999;
    min-width: 250px;;
    top: auto;
    border: 1px solid #999;
}
.hover-open-div .div_flex ul {
    width: 100%;
		    color: #666;
}
.hover-open-div .div_flex ul li {
    margin-bottom: 15px;
}
a.hover-div:hover .hover-open-div {
    display:block;
}
.device_version_info tr {
    display: flex;
    align-items: center;
		width: 100%;
		margin: 15px 0;
}
.device_version_info tr>* {
    width: 50% !important;
}
.hover-open-div .div_flex {
    display: inline-block;
    width: 100%;
}
.instailling {
    background: #ccc;
    padding: 5px;
    color: #000;
    font-weight: bold;
}

.dissabled_tab {
    background: #ccc !important;
}

.software_upgrade_table tr.active td {
    background: #ec6c00 !important;
    color: #fff;
}

.col-xs-12.right-tabs-con {
	padding-left: 0;
	padding-right: 0;

}
.main-right-sidebar.rightsidebar-active {
		/* width: 500px; */
		/*width: 600px;*/
                width: 1100px;
    display: block ;
}
.right-tabs-icons {
	background: #fff;
}
.right-tabs-con .tab-content {
	overflow-y: auto;
	padding-left: 83px;
}
.right-tabs-icons .nav-tabs li a{
	display: inline-block;
	    width: 100%;
}
.overflow-hide{
	overflow: hidden !important;
}
.div_flex .form-group {
	display:inline-block;
	width: 100%;
}

/* Add CSS */
.main-right-sidebar .tab-pane.current {
    display: block;
    width: 100% !important;    
    min-width: 200px;
				/* height: 94vh; */
		height: 100%;
}
.right-tabs-con .tab-content {
    /* height: auto !important; */
    }
    .data_main {
       padding: 5px 0;
}
.data_left { 
        width: 50%;
    display: inline-block;
    float:left;
}
.data-right {
        display: inline-block;
    width: 50%;
}
.device_block {
    display: flex;
    width: 100%;
}
.status_info {
    width: 50%;
}
.device_info {
    width: 50%;
}
.device_block.Custom_Class_while_resize, .filex-row.Custom_Class_while_resize {
    display: block;
}
.Custom_Class_while_resize .status_info, .Custom_Class_while_resize .device_info{
 width:100%;
}
/********27-09-2018***/
.off-btn-color {
    background: #f3b580;
    color: #fff;
}
/* END CSS */
</style>
