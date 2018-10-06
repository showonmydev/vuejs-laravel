@extends('plain')

@section('title')
Create user
@endsection

@section('close')

    <a href="/users" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="users">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            <div class="row">
                <div class="col-md-6">

                    <h4>User details</h4>

                    {!! Form::open(array('url' => url('users'), 'method' => 'post', 'class'=>'users__form')) !!}

                    <div class="form-group @if ($errors->has('first_name')) has-error @endif">
                        {!! Form::label('first_name', 'First name', array('class' => 'control-label')) !!}
                        {!! Form::text('first_name', null, array('class' => 'form-control pad', 'placeholder' => 'First name', 'required' => '')) !!}
                        @if ($errors->has('first_name')) <p class="help-block">{{ $errors->first('first_name') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('last_name')) has-error @endif">
                        {!! Form::label('last_name', 'Last name', array('class' => 'control-label')) !!}
                        {!! Form::text('last_name', null, array('class' => 'form-control pad', 'placeholder' => 'Last name', 'required' => '')) !!}
                        @if ($errors->has('last_name')) <p class="help-block">{{ $errors->first('last_name') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('email')) has-error @endif">
                        {!! Form::label('email', 'Email', array('class' => 'control-label')) !!}
                        {!! Form::text('email', null, array('class' => 'form-control pad', 'placeholder' => 'Email', 'required' => '')) !!}
                        @if ($errors->has('email')) <p class="help-block">{{ $errors->first('email') }}</p> @endif
                    </div>
                    
                    {!! Form::submit( 'Create user' , array('type' => 'submit', 'class' => 'btn btn-primary')) !!}

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>

</section>

@endsection