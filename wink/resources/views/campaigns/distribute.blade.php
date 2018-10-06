@extends('plain')

@section('title')
Distribute
@endsection

@section('tabs')

<ul class="header__tabs-plain" role="tablist">
    <li class=""><a href="/campaigns/{{$campaign->id}}/details" class="link">Details</a></li>
    @if(!$campaign->submitted)
    <li class=""><a href="/campaigns/{{$campaign->id}}/questionnaire" class="link">Questionnaire</a></li>
    <li class=""><a href="/campaigns/{{$campaign->id}}/locations" class="link">Locations</a></li>
    @endif
    <li class="active"><a href="/campaigns/{{$campaign->id}}/distribute" class="link">Distribute</a></li>
</ul>

@endsection

@section('close')

<a href="/" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="campaign">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            {!! Form::model($campaign, array('url' => array('/campaigns/launch/'. $campaign->id), 'method' => 'put', 'class'=>'campaign__form')) !!}
            {!! Form::hidden('launch_campaign', 'false') !!}
            {!! Form::hidden('schedule_campaign', 'false') !!}
            {!! Form::hidden('update_campaign', 'false') !!}

            <div class="row">
                <div class="col-sm-12">

                    <div class="form-group @if ($errors->has('time_to_complete')) has-error @endif">
                        <label for="time_to_complete" class="control-label campaign__form-label">Time to complete <span>The time a user has to complete a task once checked out</span></label>
                        {!! Form::select('time_to_complete', [
                            '2' => '2 Hours',
                            '5' => '5 Hours',
                            '12' => '12 Hours',
                            '24' => '1 Day',
                            '72' => '3 Days',
                            '120' => '5 Days',
                            '168' => '1 Week'
                        ], null, ['class' => 'form-control pad', 'required' => '']) !!}
                        @if ($errors->has('time_to_complete')) <p class="help-block">{{ $errors->first('time_to_complete') }}</p> @endif
                    </div>



                    <div class="row">
                        <div class="col-sm-8">
                            <div class="form-group @if ($errors->has('per_location')) has-error @endif">
                                <label for="per_location" class="control-label campaign__form-label">How many tasks per location? <span>e.g. Selecting 2 will create 2 available tasks per location</span></label>
                                @if(!$campaign->submitted)
                                {!! Form::number('per_location', null, array('class' => 'form-control pad', 'required' => '')) !!}
                                @else
                                    <br>{{$campaign->per_location}} tasks per location
                                @endif
                                @if ($errors->has('per_location')) <p class="help-block">{{ $errors->first('per_location') }}</p> @endif
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <div class="form-group">
                                <div class="checkbox campaign__form-checkbox">
                                    <label>
                                        @if(!$campaign->submitted)
                                        <input type="checkbox" name="one_per_location" @if($campaign->one_per_location == 1 || !$campaign->submitted)checked @endif>
                                            Limit users to one task per location
                                        @else
                                            @if($campaign->one_per_location == 1)Users are limited to 1 task per location @else Users are not limited to 1 task per location @endif
                                        @endif
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div class="form-group @if ($errors->has('targets')) has-error @endif">
                        <label for="task_name" class="control-label campaign__form-label">Choose the relevant teams, roles or individuals <span>You can make multiple selections</span></label>

                        <select id="targets" multiple="1" class="styled targets" style="width: 100%;" name="targets[]">
                            <optgroup label="Teams">

                            @foreach($teams as $currentTeam)
                                @if(count($campaign->teams))
                                    @foreach($campaign->teams as $team)
                                        @if($team->pivot->team_id == $currentTeam->id)
                                            <option value="{{ $currentTeam->id }}" selected>{{$currentTeam->name}}</option>   
                                        @else
                                            <option value="{{ $currentTeam->id }}">{{$currentTeam->name}}</option>     
                                        @endif
                                    @endforeach
                                @else
                                    <option value="{{ $currentTeam->id }}">{{$currentTeam->name}}</option>
                                @endif
                            @endforeach

                            </optgroup>

                            <optgroup label="Users">

                            @foreach($users as $currentUser)
                                @if(count($campaign->users))
                                    @foreach($campaign->users as $user)
                                        @if($user->pivot->user_id == $currentUser->id)
                                            <option value="user{{ $currentUser->id }}" selected>{{$currentUser->first_name}} {{$currentUser->last_name}}</option>   
                                        @else
                                            <option value="user{{ $currentUser->id }}">{{$currentUser->first_name}} {{$currentUser->last_name}}</option>     
                                        @endif
                                    @endforeach
                                @else
                                    <option value="user{{ $currentUser->id }}">{{$currentUser->first_name}} {{$currentUser->last_name}}</option>
                                @endif
                            @endforeach

                            </optgroup>
                        </select>

                        @if ($errors->has('targets')) <p class="help-block">{{ $errors->first('targets') }}</p> @endif
                    </div>

                </div>
            </div>
            <div class="campaign__footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-6">
                            <ul class="campaign__breadcrumb">
                                <li class="">Details<span class="ion-ios-arrow-right"></span></li>
                                <li class="">Questionnaire<span class="ion-ios-arrow-right"></span></li>
                                <li class="">Locations<span class="ion-ios-arrow-right"></span></li>
                                <li class="active">Distribute</span></li>
                            </ul>
                        </div>
                        <div class="col-sm-3 text-right">
                            {!! Form::submit( 'Save' , array('type' => 'submit', 'class' => 'btn btn-primary btn-outline campaign__next-step campaign--save')) !!}

                            @if(!$campaign->submitted)
                                @if(\Carbon\Carbon::today()->eq(\Carbon\Carbon::createFromTimeStamp(strtotime($campaign->start_date))))
                                {!! Form::submit( 'Launch' , array('type' => 'submit', 'class' => 'btn btn-primary btn-outline campaign__next-step campaign--launch')) !!}
                                @else
                                {!! Form::submit( 'Schedule' , array('type' => 'submit', 'class' => 'btn btn-primary btn-outline campaign__next-step campaign--schedule')) !!}
                                @endif
                            @else
                                {!! Form::submit( 'Update' , array('type' => 'submit', 'class' => 'btn btn-primary btn-outline campaign__next-step campaign--update')) !!}
                            @endif
                        </div>
                    </div>
                </div>
            </div>
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection

@section('additionalJS')

    <script src="//cdnjs.cloudflare.com/ajax/libs/select2/4.0.1/js/select2.min.js"></script>
    <script type="text/javascript">
        $('select.styled').select2({
            theme: "classic",
            allowClear: true
        });
    </script>

@endsection