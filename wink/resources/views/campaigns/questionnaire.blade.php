@extends('plain')

@section('title')
Details
@endsection

@section('tabs')

<ul class="header__tabs-plain" role="tablist">
    <li class=""><a href="/campaigns/{{$campaign->id}}/details" class="link">Details</a></li>
    @if(!$campaign->submitted)
    <li class="active"><a href="/campaigns/{{$campaign->id}}/questionnaire" class="link">Questionnaire</a></li>
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
            <div class="row" id="collapseQuestionForm">
                <div class="col-xs-12">
                    {!! Form::open(array('url' => array('/questions/store/'.$campaign->id), 'class' => 'campaign__form-question questionForm')) !!}
                    <div class="form-group margin-b-0">
                        <label class="campaign__form-label" for="question">Add questions or tasks <span class="lighter">Add the type on the right</span></label>
                        <div class="input-group question-add">
                            <input class="form-control pad" placeholder="Type a question here" required="" name="question" type="text" id="question">
                            <div class="input-group-addon right-select">
                                <select class="form-control" id="input_type" name="input_type">
                                    <option value="1">Text</option>
                                    <option value="2">Dropdown</option>
                                    <option value="7">Yes / No</option>
                                    <option value="8">Rating</option>
                                    <option value="6">Image</option>
                                    <option value="9">Barcode</option>
                                    <option value="10">GPS Location</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="collapseOptions collapse" id="collapseOptions">
                        <div class="option_input_fields_wrap">
                            <div data-index="0"><input type="text" name="option[]" placeholder="Type your option and press enter"><span class=" remove_field ion-ios-trash-outline"></span></div>
                            <button class="add_field_button btn btn-primary hidden"></button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-6">
                            <div class="form-group">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="required" name="required" checked>Required?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-6">
                            <a class="show-alert__button" role="button" data-toggle="collapse" href="#showAlert" aria-expanded="false" aria-controls="showAlert">
                                Add alert
                            </a>
                        </div>
                    </div>
                    <div class="collapse show-alert clearfix" id="showAlert">
                        {{--If the answer equals this send alert--}}
                        <span class="show-alert__text">If the answer</span>
                        <span class="show-alert__text show-alert__type-text">&nbsp;contains</span>
                        <span class="show-alert__text show-alert__type-boolean">&nbsp;is</span>
                        <select class="form-control show-alert__select show-alert__type-rating show-alert__type-dropdown show-alert__hidden" id="comparator" name="comparator">
                            <option value="=">is</option>
                            <option value="!=">is not</option>
                            <option value="<">is less than</option>
                            <option value=">">is greater than</option>
                        </select>
                        <select class="form-control show-alert__select show-alert__type-rating show-alert__hidden" id="reference_select" name="reference_select">
                            <option value="" disabled>Select value</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <select class="form-control show-alert__select show-alert__select-reference show-alert__type-dropdown show-alert__hidden" id="reference_select" name="reference_select">
                            <option value="" disabled>Select value</option>
                        </select>
                        <select class="form-control show-alert__select show-alert__type-boolean show-alert__hidden" id="reference_boolean" name="reference_boolean">
                            <option value="" disabled>Select value</option>
                            <option value="yes">yes</option>
                            <option value="no">no</option>
                        </select>
                        <input class="show-alert__input show-alert__type-text" type="text" id="reference_input" name="reference_input" placeholder="enter a single value">
                        <span class="show-alert__text">trigger an alert called</span>
                        <input class="show-alert__input" type="text" id="name" name="name" placeholder="e.g. 'No stock'">
                        <span class="show-alert__text show-alert__text-notavailable">This is no alert available for this question type</span>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                            <button type="submit" class="btn btn-success">Add question</button>
                        </div>
                    </div>
                    {!! Form::close() !!}
                </div>
            </div>
            @if (count($campaign->questions) > 0)
            <div class="questions-list resourcelist">
                <div class="resourcelist__header">
                    <div class="row ">
                        <div class="col-xs-5">
                            <h5>Question</h5>
                        </div>
                        <div class="col-xs-3">
                            <h5>Type</h5>
                        </div>
                        <div class="col-xs-2">
                            <h5>Required</h5>
                        </div>
                        <div class="col-xs-2">
                            
                        </div>
                    </div>
                </div>
                @foreach ($campaign->questions as $index => $question)
                <div class="row ">
                    <div class="col-xs-12">
                        <div class="question resourcelist__item">
                            <div class="row">
                                <div class="col-xs-5">
                                    <span class="resourcelist__order"></span>
                                    {{$question->question}}
                                </div>
                                <div class="col-xs-3">
                                    {{ ucfirst(trans($question->type->type)) }}
                                </div>
                                <div class="col-xs-2">
                                    {{$question->required ? "Yes" : "No"}}
                                </div>
                                <div class="col-xs-2">
                                    <a class="resourcelist__action pull-right" role="button" tabindex="0"
                                       data-container="body"
                                       data-toggle="popover"
                                       data-placement="left"
                                       data-trigger="focus"
                                       data-content='<ul class="list-unstyled">
                                        <li><a role="button" data-toggle="collapse" href="#collapseQuestion{{$index}}" aria-expanded="false" aria-controls="collapseQuestion{{$index}}">
                                        Edit
                                    </a></li>
                                       <li>{!! Form::open(array('url' => array('/questions/'.$question->id), 'method' => 'delete', 'class' => 'delete_record')) !!}<button type="submit">Delete</button>{!! Form::close() !!}</li>
                                       </ul>'>
                                    </a>
                                </div>
                            </div>
                            <div class="collapse resourcelist__collapse" id="collapseQuestion{{$index}}">
                                <div class="well">
                                    {!! Form::open(array('url' => array('/questions/update/'.$question->id), 'class' => 'campaign__form-question questionUpdateForm', 'data-index' => '$index')) !!}
                                        <div class="form-group margin-b-0">
                                            <label class="" for="question">Question</label>
                                            <div class="input-group question-edit" data-index="{{$index}}">
                                                <input class="form-control pad" placeholder="Type a question here" required="" name="question" type="text" id="question" value="{{$question->question}}">
                                                <div class="input-group-addon right-select">
                                                    <select class="form-control" id="input_type" name="input_type">
                                                        <option value="1" @if($question->input_type == 1) selected @endif>Text</option>
                                                        <option value="2" @if($question->input_type == 2) selected @endif>Dropdown</option>
                                                        <option value="7" @if($question->input_type == 7) selected @endif>Yes / No</option>
                                                        <option value="8" @if($question->input_type == 8) selected @endif>Rating</option>
                                                        <option value="6" @if($question->input_type == 6) selected @endif>Image</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                         <div class="collapseOptions collapse @if ( $question->input_type == 2) in @endif" id="collapseOptions{{$index}}">
                                            <div class="option_input_fields_wrap">
                                                @foreach ($question->options as $option_index => $option)
                                                <div data-index="{{$option_index}}"><input type="text" name="option[]" placeholder="Type your option and press enter" value="{{$option->name}}"><span class=" remove_field ion-ios-trash-outline"></span></div>
                                                @endforeach
                                                <div data-index="0" ><input type="text" name="option[]" placeholder="Type your option and press enter"><span class=" remove_field ion-ios-trash-outline"></span></div>
                                                <button class="add_field_button btn btn-primary hidden">Add More Fields</button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-xs-6">
                                                <div class="form-group">
                                                    <div class="checkbox">
                                                        <label>
                                                            {!! Form::checkbox('required', null ,$question->required) !!}
                                                            Required?
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            @if(!$question->alertRule)
                                                <div class="col-xs-6">
                                                    <a class="show-alert__button" role="button" data-toggle="collapse" href="#showAlert{{$index}}" aria-expanded="false" aria-controls="showAlert{{$index}}">
                                                        Add alert
                                                    </a>
                                                </div>
                                            @endif
                                        </div>
                                        @if($question->alertRule)
                                        <div class="show-alert clearfix" id="showAlert{{$index}}">
                                            <span class="show-alert__text">
                                                If the answer
                                                @if($question->input_type == 1)
                                                    contains "{{$question->alertRule->reference}}"
                                                @elseif($question->input_type == 2)
                                                    @if($question->alertRule->comparator == "=")
                                                        is "{{$question->alertRule->reference}}"
                                                    @else
                                                        is not "{{$question->alertRule->reference}}"
                                                    @endif
                                                @endif
                                                trigger an alert
                                                @if($question->alertRule->name)
                                                    called {{$question->alertRule->name}}
                                                @endif
                                            </span>
                                            <span class="remove_alert ion-ios-trash-outline"></span>
                                        </div>

                                        @else

                                        <div class="collapse show-alert clearfix" id="showAlert{{$index}}">
                                            {{--If the answer equals this send alert--}}
                                            <span class="show-alert__text">If the answer</span>
                                            @if($question->input_type == 1)
                                            <span class="show-alert__text show-alert__type-text">&nbsp;contains</span>
                                            @endif
                                            @if($question->input_type == 2)
                                            <select class="form-control show-alert__select show-alert__type-dropdown" id="comparator" name="comparator">
                                                <option value="=">is</option>
                                                <option value="!=">is not</option>
                                            </select>
                                            <select class="form-control show-alert__select show-alert__select-reference show-alert__type-dropdown" id="reference_select" name="reference_select">
                                                <option value="" disabled>Select value</option>
                                                @foreach ($question->options as $option_index => $option)
                                                    <option value="{{ $option->name }}">{{ $option->name }}</option>
                                                @endforeach
                                            </select>
                                            @endif
                                            @if($question->input_type == 1)
                                            <input class="show-alert__input show-alert__type-text" type="text" id="reference_input" name="reference_input" placeholder="enter a single value">
                                            @endif
                                            <span class="show-alert__text">trigger an alert called</span>
                                            <input class="show-alert__input" type="text" id="name" name="name" placeholder="e.g. 'No stock'">
                                        </div>

                                        @endif

                                        <div class="row">
                                            <div class="col-xs-12">
                                                <button type="submit" class="btn btn-success">Update Question</button>
                                            </div>
                                        </div>
                                    {!! Form::close() !!}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
            @endif

        </div>
    </div>
    <div class="campaign__footer">
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-offset-3 col-sm-6">
                    <ul class="campaign__breadcrumb">
                        <li class="">Details<span class="ion-ios-arrow-right"></span></li>
                        <li class="active">Questionnaire<span class="ion-ios-arrow-right"></span></li>
                        <li class="">Locations<span class="ion-ios-arrow-right"></span></li>
                        <li class="">Distribute</li>
                    </ul>
                </div>
                <div class="col-sm-3 text-right">
                    <a href="/campaigns/{{$campaign->id}}/locations" class="btn btn-primary btn-outline campaign__next-step">Next</a>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection