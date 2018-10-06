@extends('app')

@section('content')

<section class="campaigns">
    <div class="row">
        <div class="col-xs-6">
            <h2 class="section__title">Add question option</h2>
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
            {!! Form::open(array('url' => url('question_options'), 'method' => 'post', 'class'=>'')) !!}
            <div class="row">
                <div class="col-md-6">

                    {!! Form::hidden('question_id', $question_id) !!}

                    <div class="form-group @if ($errors->has('name')) has-error @endif">
                        {!! Form::label('name', 'Name', array('class' => 'control-label')) !!}
                        {!! Form::text('name', null, array('class' => 'form-control pad', 'placeholder' => 'Name', 'required' => '')) !!}
                        @if ($errors->has('name')) <p class="help-block">{{ $errors->first('name') }}</p> @endif
                    </div>

                </div>
            </div>

            {!! Form::submit( 'Add question option' , array('type' => 'submit', 'class' => 'btn btn-primary')) !!}
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection