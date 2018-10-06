@extends('plain')

@section('title')
Details
@endsection

@section('tabs')

<ul class="header__tabs-plain" role="tablist">
    <li class="active"><span class="link">Details</span></li>
    <li class=""><span class="link">Questionnaire</span></li>
    <li class=""><span class="link">Locations</span></li>
    <li class=""><span class="link">Distribute</span></li>
</ul>

@endsection

@section('close')

<a id="close_button" href="/" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="campaign">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            {!! Form::open(array('url' => url('campaigns'), 'method' => 'post', 'class'=>'campaign__form')) !!}
            <div class="row">
                <div class="col-md-12">

                    <div class="form-group @if ($errors->has('task_name')) has-error @endif">
                        <label for="task_name" class="control-label campaign__form-label" >Campaign name <span>This is what your users will see</span></label>
                        {!! Form::text('task_name', null, array('class' => 'form-control pad', 'id' => 'task_name', 'placeholder' => 'Campaign name', 'required' => '')) !!}
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
                        {!! Form::textarea('description', null, array('class' => 'form-control pad', 'id' => 'description-textarea', 'placeholder' => 'Campaign description')) !!}
                        @if ($errors->has('description')) <p class="help-block">{{ $errors->first('description') }}</p> @endif
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-4">
                    <div class="form-group @if ($errors->has('start_date')) has-error @endif">
                        {!! Form::label('start_date', 'Start date', array('class' => 'control-label campaign__form-label')) !!}
                        {!! Form::date('start_date', \Carbon\Carbon::today()->format('Y-m-d'), array('class' => 'form-control pad', 'required' => '')) !!}
                        @if ($errors->has('start_date')) <p class="help-block">{{ $errors->first('start_date') }}</p> @endif
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group @if ($errors->has('end_date')) has-error @endif">
                        {!! Form::label('end_date', 'End date', array('class' => 'control-label campaign__form-label')) !!}
                        {!! Form::date('end_date', null, array('class' => 'form-control pad', 'required' => '')) !!}
                        @if ($errors->has('end_date')) <p class="help-block">{{ $errors->first('end_date') }}</p> @endif
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="form-group @if ($errors->has('frequency')) has-error @endif">
                        {!! Form::label('frequency', 'Frequency', array('class' => 'control-label campaign__form-label')) !!}
                        {!! Form::select('frequency', $frequency, null, ['class' => 'form-control pad']) !!}
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

//        tinymce.init({
//            selector: '#description-textarea'
//        });

    </script>


@endsection