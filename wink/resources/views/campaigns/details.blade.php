@extends('plain')

@section('title')
Details
@endsection

@section('tabs')

<ul class="header__tabs-plain" role="tablist">
    <li class="active"><a href="/campaigns/{{$campaign->id}}/details" class="link">Details</a></li>
    @if(!$campaign->submitted)
    <li class=""><a href="/campaigns/{{$campaign->id}}/questionnaire" class="link">Questionnaire</a></li>
    <li class=""><a href="/campaigns/{{$campaign->id}}/locations" class="link">Locations</a></li>
    @endif
    <li class=""><a href="/campaigns/{{$campaign->id}}/distribute" class="link">Distribute</a></li>
</ul>

@endsection

@section('close')

<a href="/" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="campaign">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            {!! Form::model($campaign, array('url' => array('/campaigns/'.$campaign->id), 'method' => 'put', 'class'=>'campaign__form')) !!}
            <div class="row">
                <div class="col-md-12">

                    <div class="form-group @if ($errors->has('task_name')) has-error @endif">
                        <label for="task_name" class="control-label campaign__form-label" >Campaign name <span>This is what your users will see</span></label>
                        @if(!$campaign->submitted)
                        {!! Form::text('task_name', null, array('class' => 'form-control pad', 'id' => 'task_name', 'placeholder' => 'Campaign name', 'required' => '')) !!}
                        @else
                            {!! Form::hidden('task_name', null, array('class' => 'form-control pad', 'id' => 'task_name', 'placeholder' => 'Campaign name', 'required' => '')) !!}
                            <br>{{$campaign->task_name}}
                        @endif
                        @if ($errors->has('task_name')) <p class="help-block">{{ $errors->first('task_name') }}</p> @endif
                    </div>

                    <!-- <div class="form-group @if ($errors->has('report_name')) has-error @endif">
                        <label for="report_name" class="control-label campaign__form-label">Report Name <span>Brand managers will have access to view campaigns</span></label>
                        {!! Form::text('report_name', null, array('class' => 'form-control pad', 'placeholder' => 'Report Name', 'required' => '')) !!}
                        @if ($errors->has('report_name')) <p class="help-block">{{ $errors->first('report_name') }}</p> @endif
                    </div> -->

                    <div class="form-group @if ($errors->has('brand_id')) has-error @endif">
                        {!! Form::label('brand_id', 'Brand', array('class' => 'control-label campaign__form-label')) !!}
                        {!! Form::select('brand_id', $brands, null, ['class' => 'form-control pad']) !!}
                        @if ($errors->has('brand_id')) <p class="help-block">{{ $errors->first('brand_id') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('description')) has-error @endif">
                        <label for="description" class="control-label campaign__form-label">Campaign Description</label>
                        {!! Form::textarea('description', null, array('class' => 'form-control pad', 'id' => 'description-textarea', 'placeholder' => 'Campaign description', 'required' => '')) !!}
                        @if ($errors->has('description')) <p class="help-block">{{ $errors->first('description') }}</p> @endif
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group @if ($errors->has('start_date')) has-error @endif">
                        <label for="start_date" class="control-label campaign__form-label">Start date <span>The first day tasks are available</span></label>
                        @if(!$campaign->submitted)
                            {!! Form::date('start_date', \Carbon\Carbon::createFromTimeStamp(strtotime($campaign->start_date))->format('Y-m-d'), array('class' => 'form-control pad', 'required' => '')) !!}
                        @else
                            {!! Form::hidden('start_date', \Carbon\Carbon::createFromTimeStamp(strtotime($campaign->start_date))->format('Y-m-d'), array('class' => 'form-control pad', 'required' => '')) !!}
                            <br>{{\Carbon\Carbon::createFromTimeStamp(strtotime($campaign->start_date))->format('Y-m-d')}}
                        @endif
                        @if ($errors->has('start_date')) <p class="help-block">{{ $errors->first('start_date') }}</p> @endif
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group @if ($errors->has('end_date')) has-error @endif">
                        <label for="end_date" class="control-label campaign__form-label">End date <span>The last day tasks are available</span></label>
                        {!! Form::date('end_date', \Carbon\Carbon::createFromTimeStamp(strtotime($campaign->end_date))->format('Y-m-d'), array('class' => 'form-control pad', 'required' => '')) !!}
                        @if ($errors->has('end_date')) <p class="help-block">{{ $errors->first('end_date') }}</p> @endif
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group @if ($errors->has('frequency')) has-error @endif">
                        {!! Form::label('frequency', 'Frequency', array('class' => 'control-label campaign__form-label')) !!}
                        @if(!$campaign->submitted)
                        {!! Form::select('frequency', $frequency, $campaign->frequency, ['class' => 'form-control pad']) !!}
                        @else
                            {!! Form::hidden('frequency', $campaign->frequency, array('class' => 'form-control pad')) !!}
                            <br>{{$campaign->howFrequent->name}}
                        @endif
                        @if ($errors->has('frequency')) <p class="help-block">{{ $errors->first('frequency') }}</p> @endif
                    </div>
                </div>
            </div>
            <div class="campaign__footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-offset-3 col-sm-6">
                            <ul class="campaign__breadcrumb">
                                <li class="active">Details<span class="ion-ios-arrow-right"></span></li>
                                <li class="">Questionnaire<span class="ion-ios-arrow-right"></span></li>
                                <li class="">Locations<span class="ion-ios-arrow-right"></span></li>
                                <li class="">Distribute</li>
                            </ul>
                        </div>
                        <div class="col-sm-3 text-right">
                            {!! Form::submit( 'Next' , array('type' => 'submit', 'class' => 'btn btn-primary btn-outline campaign__next-step')) !!}
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

    <script src="/js/tinymce.min.js"></script>

    <script type="text/javascript">

        tinymce.init({
            selector: '#description-textarea'
        });

    </script>

@endsection