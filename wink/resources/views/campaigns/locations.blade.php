@extends('plain')

@section('title')
Details
@endsection

@section('tabs')

<ul class="header__tabs-plain" role="tablist">
    <li class=""><a href="/campaigns/{{$campaign->id}}/details" class="link">Details</a></li>
    @if(!$campaign->submitted)
    <li class=""><a href="/campaigns/{{$campaign->id}}/questionnaire" class="link">Questionnaire</a></li>
    <li class="active"><a href="/campaigns/{{$campaign->id}}/locations" class="link">Locations</a></li>
    @endif
    <li class=""><a href="/campaigns/{{$campaign->id}}/distribute" class="link">Distribute</a></li>
</ul>

@endsection

@section('close')

<a href="/" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<wink-locations-filter :campaign_id="{{$campaign->id}}" :survey="{{$campaign->survey}}" :brands="{{$brands}}" :tags="{{$tags}}" :locations="{{$locations}}" :selected_locations="{{$selectedLocations}}" inline-template>
    <section class="campaign">
        <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <div class="row" v-if="!unknown">
                    <div class="col-xs-12">
                        <label class="control-label campaign__form-label">Select locations <span>Users will only be able to submit tasks when within range of a location</span></label>
                    </div>
                </div>
                <div class="campaign__location--filters">
                    <div class="row" v-if="!unknown">
                        <div class="col-sm-3">
                            <div id="brands">
                                <input v-model="currentBrandDisplay" class="search campaign__location-column-filter" placeholder="Search brands" />
                                <div class="campaign__location-list">
                                    <ul class="list">

                                        <li @click="brandSelected(null, $event)" class="campaign__location-listitem" >
                                            All Brands
                                        </li>

                                        <li v-for="brand in brands | filterBy currentBrandDisplay in 'name'" :class="{active: brand.selected}" @click="brandSelected(brand, $event)" class="campaign__location-listitem" >
                                            @{{ brand.name }}
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-3">
                            <div id="tags">
                                <input v-model="currentTagDisplay" class="search campaign__location-column-filter" placeholder="Search tags" />
                                <div class="campaign__location-list">
                                    <ul class="list">

                                        <li @click="tagSelected(null, $event)" class="campaign__location-listitem" >
                                            All Tags
                                        </li>

                                        <li v-for="tag in tags | filterBy currentTagDisplay in 'name'" class="campaign__location-listitem" @click="tagSelected(tag, $event)">
                                            @{{ tag.name }}
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div id="available" class="campaign__location-available-wrap">
                                <input v-model="locationFilter" class="search campaign__location-column-filter" placeholder="Search Available" />
                                <div class="campaign__location-list">
                                    <ul class='campaign__location-dropable-list campaign__location-available list filtered-locations'>

                                        <li v-for="location in filteredLocations | filterBy locationFilter in 'name' " class="campaign__location-listitem" @click="availableSelected(location)">
                                            @{{ location.name }}
                                        </li>

                                    </ul>
                                </div>
                            </div>
                            <div class="campaign__location--arrowwrap">
                                <span class="ion-ios-arrow-thin-left"></span>
                                <span class="ion-ios-arrow-thin-right"></span>
                            </div>
                            <div id="selected" class="campaign__location-selected-wrap">
                                <h5 class="campaign__location-column-title">Selected</h5>
                                <div class="campaign__location-list">
                                    <ul class='campaign__location-dropable-list campaign__location-selected selected-locations' v-if="selectedLocations.length > 0">

                                        <li v-for="selected_location in selectedLocations" v-if="selected_location != null" class="campaign__location-listitem" data-id="@{{selected_location.id}}" @click="currentSelected(selected_location)">

                                            @{{ selected_location.name }}

                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <label class="control-label campaign__form-label">No location required <span>e.g. conduct surveys or collect feedback from anywhere</span></label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="unknown" name="unknown" v-model="unknown">This campaign can be completed anywhere
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-2 col-sm-push-9">
                        <!-- Need this for CSRF token -->
                        <form id="locationForm">
                            {!! csrf_field() !!}
                        </form>
                    </div>
                </div>

            </div>
        </div>
        <div class="campaign__footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-sm-offset-3 col-sm-6">
                        <ul class="campaign__breadcrumb">
                            <li>Details <span class="ion-ios-arrow-right"></span></li>
                            <li>Questionnaire <span class="ion-ios-arrow-right"></span></li>
                            <li class="active">Locations <span class="ion-ios-arrow-right"></span></li>
                            <li>Distribute</li>
                        </ul>
                    </div>
                    <div class="col-sm-3 text-right">
                        <a href="/campaigns/{{$campaign->id}}/distribute" class="btn btn-primary btn-outline campaign__next-step">Next</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</wink-locations-filter>

@endsection