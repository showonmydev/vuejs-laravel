@extends('plain')

@section('title')
    {{$task->campaign->task_name}}
@endsection

@section('top-header')
    <ul class="header__nav-section clearfix">
        <li><a href="/" class="">Dashboard</a></li>
        <li><a href="/teams" class="">Teams</a></li>
        <li><a href="/locations" class="">Locations</a></li>
        <li><a href="/brands" class="">Brands</a></li>
    </ul>
@endsection

@section('actions')
    <div class="pull-right text-right">
        <span class="h3 white light">{{count($task->campaign->submittedTasks())}} / {{count($task->campaign->createdTasks())}}</span><br>
        <span class="h6 white text-uppercase light-blue">submissions</span>
    </div>
@endsection

@section('close')

    <a href="/reports/campaign/{{$task->campaign->id}}#alerts" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

    <div class="report-single">
        <div class="row">
            <div class="col-sm-10 col-sm-offset-1">
                <div class="row">

                    <div class="col-sm-7">
                        <h4 class="report-single__title">Task #{{$task->id}} - Submitted by {{$task->answers->first()->user->name()}} on {{$task->answers->first()->created_at->format('j F Y \a\t h:i A')}}</h4>
                        <hr>
                        <div class="row">
                            <div class="col-sm-8">
                                @foreach($task->campaign->questions as $index => $question)
                                    <div class="report-single__answer @foreach($task->alerts as $alert) @if($alert->question_id == $question->id) has-alert @endif @endforeach">
                                        <h5 class="report-single__answer-title">{{$index +1}}. {{$question->question}}? @foreach($task->alerts as $alert) @if($alert->question_id == $question->id)<span> (triggered alert) </span>@endif @endforeach</h5>
                                        @foreach($task->answers as $answer)
                                            @if($answer->question_id === $question->id)
                                                @if($question->input_type == 1 || $question->input_type == 2 || $question->input_type == 3)
                                                    <p class="report-single__answer-response">{{$answer->answer_text}}</p>
                                                @endif
                                                @if($question->input_type == 6 && $answer->image)
                                                    <a class="report-data__image" href="/images/{{$answer->image->name}}" data-lightbox="report--data" style="background-image: url('/images/{{$answer->image->name}}')"></a>
                                                @endif
                                            @endif
                                        @endforeach
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-5">
                        <input type="hidden" value="{{$task->location->latitude}}" id="latitude" name="latitude">
                        <input type="hidden" value="{{$task->location->longitude}}" id="longitude" name="longitude">
                        <div class="report-single__map">
                            <h4 class="report-single__map-title">{{$task->location->name}}</h4>
                            <h6 class="report-single__map-address">{{$task->location->address}}, {{$task->location->city}}, {{$task->location->province}}</h6>
                        </div>
                        <hr>
                        <div id="location-map"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>

@endsection


@section('additionalJS')

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlnQqayZKWaHucHzQyeJGMFPkWPrXViKA&libraries=places"></script>
    <script type="text/javascript" src="{{ asset('/js/maps.js') }}"></script>

@endsection