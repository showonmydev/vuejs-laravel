@extends('app')

@section('content')

<section class="campaigns">
    <div class="row">
        <div class="col-xs-6">
            <h2 class="section__title">Update question</h2>
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
            {!! Form::model($question, array('route' => array('questions.update', $question->id), 'method' => 'put', 'class'=>'')) !!}
            <div class="row">
                <div class="col-md-6">

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

            {!! Form::submit( 'Update question' , array('type' => 'submit', 'class' => 'btn btn-primary')) !!}
            {!! Form::close() !!}
        </div>
    </div>

    @if ($question->input_type == 1)
    <div class="row">
        <div class="col-xs-6">
            <h4>Question options</h4>
        </div>
        <div class="col-xs-6">
            {!! Html::linkRoute('question_options.create', 'Add question option', array($question->id), array('class' => 'btn btn-primary pull-right')) !!}
        </div>
    </div>
    <div class="row">
        <div class="col-xs-12">
            @foreach ($question->options as $options)
                {{$options->name}}
            @endforeach
        </div>
    </div>
    @endif

</section>

@endsection