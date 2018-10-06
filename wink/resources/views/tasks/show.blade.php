@extends('plain')

@section('title')
Task - {{$campaign->task_name}}
@endsection

@section('close')

<a href="/" class="header__close-button icon--large lnr lnr-cross"></a>

@endsection

@section('content')

<section class="tasks">
    

    @if(!$task->in_progress)
    
    <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <h4>{!! $campaign->description !!}</h4>
        </div>
    </div>

    <div class="row questions">
        <div class="col-xs-10 col-xs-offset-1">
            
            {!! Form::open(array('url' => '/tasks/saveAnswers/'.$task->id, 'files' => true, 'method' => 'post', 'class'=>'campaigns__form')) !!}

            @foreach($campaign->questions as $question)

                @if($question->type->id === 1)
                <div class="form-group">
                    {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                    {!! Form::text($question->id, null, array('class' => 'form-control pad', 'placeholder' => 'Your answer')) !!}
                </div>
                @endif

                @if($question->type->id === 2)
                <div class="form-group">
                    {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                    {!! Form::select($question->id, $question->options()->lists('name', 'name'), null, ['class' => 'form-control pad']) !!}
                </div>
                @endif

                @if($question->type->id === 6)
                    <div class="form-group">
                        {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                        {!! Form::file($question->id, null, ['class' => 'form-control pad']) !!}
                    </div>
                @endif

                @if($question->type->id === 7)
                    <div class="form-group">
                        {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                        {!! Form::select($question->id, ["Select answer", "yes" => "Yes", "no" => "No"], null, ['class' => 'form-control pad']) !!}
                    </div>
                @endif

                @if($question->type->id === 8)
                    <div class="form-group">
                        {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                        {!! Form::select($question->id, ["Select a rating",1, 2, 3, 4, 5], null, ['class' => 'form-control pad']) !!}
                    </div>
                @endif

                @if($question->type->id === 9)
                    <div class="form-group">
                        {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                        {!! Form::text($question->id, null, array('class' => 'form-control pad', 'placeholder' => 'Barcode')) !!}
                    </div>
                @endif

                @if($question->type->id === 10)
                    <div class="form-group">
                        {!! Form::label($question->id, $question->question, array('class' => 'control-label')) !!}
                        {!! Form::text($question->id, null, array('class' => 'form-control pad', 'placeholder' => 'eg lat, long')) !!}
                    </div>
                @endif
            
            @endforeach
            
            {!! Form::submit( 'Save' , array('type' => 'submit', 'class' => 'btn btn-primary')) !!}

            {!! Form::close() !!}

        </div>
    </div>

    @elseif ($task->submitted)

    <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <h4>This task has been submitted, here are your answers</h4>
        </div>
    </div>

    <div class="row">
        <div class="col-xs-10 col-xs-offset-1">
            <ul class="tasks__answers-list">
                @foreach($campaign->questions as $question)
                <li class="tasks__answer">
                    <strong>{{$question->question}}</strong></br>
                    @foreach($answers as $answer)
                        @if($question->id === $answer->question_id)
                            @if( $answer->question_type_id === 1 || $answer->question_type_id === 2 )
                                {{$answer->answer_text}}
                            @endif
                            @if( $answer->question_type_id === 6 )
                                <img src="/images/{{$answer->image->name}}">
                            @endif
                        @endif
                    @endforeach
                </li>
                @endforeach
            </ul>
        </div>
    </div>


    @else
    
    <div class="row">
        <div class="col-xs-12">
            <h3>Sorry this task is in progress</h3>
        </div>
    </div>

    @endif

</section>

@endsection