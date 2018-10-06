@extends('app')

@section('content')

<section class="campaigns">
    <div class="row">
        <div class="col-xs-6">
            <h2 class="section__title">Add question</h2>
        </div>
        <div class="col-xs-6">
            <ul class="list-inline">
                <li>Details</li>
                <li>Questionnaire</li>
                <li>Locations</li>
                <li>Distribute</li>
            </ul>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            {!! Form::open(array('url' => url('questions'), 'method' => 'post', 'class'=>'')) !!}
            <div class="row">
                <div class="col-md-6">

                    {!! Form::hidden('campaign_id', $campaign_id) !!}

                    <div class="form-group @if ($errors->has('question')) has-error @endif">
                        {!! Form::label('question', 'Question', array('class' => 'control-label')) !!}
                        {!! Form::text('question', null, array('class' => 'form-control pad', 'placeholder' => 'Question', 'required' => '')) !!}
                        @if ($errors->has('question')) <p class="help-block">{{ $errors->first('question') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('prompt')) has-error @endif">
                        {!! Form::label('prompt', 'Question prompt', array('class' => 'control-label')) !!}
                        {!! Form::text('prompt', null, array('class' => 'form-control pad', 'placeholder' => 'Question prompt', 'required' => '')) !!}
                        @if ($errors->has('prompt')) <p class="help-block">{{ $errors->first('prompt') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('input_type')) has-error @endif">
                        {!! Form::label('input_type', 'Input type', array('class' => 'control-label')) !!}
                        {!! Form::text('input_type', null, array('class' => 'form-control pad', 'placeholder' => 'Input type', 'required' => '')) !!}
                        @if ($errors->has('input_type')) <p class="help-block">{{ $errors->first('input_type') }}</p> @endif
                    </div>

                </div>
            </div>

            {!! Form::submit( 'Add question' , array('type' => 'submit', 'class' => 'btn btn-primary')) !!}
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection