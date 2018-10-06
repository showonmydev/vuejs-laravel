@extends('plain')

@section('title')
Edit user {{$user->name()}}
@endsection

@section('close')

    <a href="/teams" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="teams">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            <div class="row">
                <div class="col-xs-6">

                    <h4>User details</h4>

                    {!! Form::model($user, array('route' => array('users.update', $user->id), 'method' => 'put', 'class'=>'')) !!}

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

                    <div class="form-group @if ($errors->has('dob')) has-error @endif">
                        {!! Form::label('dob', 'Date of Birth', array('class' => 'control-label')) !!}
                        {!! Form::text('dob', null, array('class' => 'form-control pad', 'placeholder' => 'Date of Birth', 'required' => '')) !!}
                        @if ($errors->has('dob')) <p class="help-block">{{ $errors->first('dob') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('gender')) has-error @endif">
                        {!! Form::label('gender', 'Gender', array('class' => 'control-label')) !!}
                        {!! Form::text('gender', null, array('class' => 'form-control pad', 'placeholder' => 'Gender', 'required' => '')) !!}
                        @if ($errors->has('gender')) <p class="help-block">{{ $errors->first('gender') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('mobile')) has-error @endif">
                        {!! Form::label('mobile', 'Mobile', array('class' => 'control-label')) !!}
                        {!! Form::text('mobile', null, array('class' => 'form-control pad', 'placeholder' => 'Mobile', 'required' => '')) !!}
                        @if ($errors->has('mobile')) <p class="help-block">{{ $errors->first('mobile') }}</p> @endif
                    </div>

                    <div class="form-group @if ($errors->has('city')) has-error @endif">
                        {!! Form::label('city', 'City', array('class' => 'control-label')) !!} 
                        {!! Form::text('city', null, array('class' => 'form-control pad', 'placeholder' => 'City', 'required' => '')) !!}
                        @if ($errors->has('city')) <p class="help-block">{{ $errors->first('city') }}</p> @endif
                    </div>

                       <div class="form-group @if ($errors->has('account_number')) has-error @endif">
                        {!! Form::label('account_number', 'Account Number', array('class' => 'control-label')) !!}
                        {!! Form::text('account_number', null, array('class' => 'form-control pad', 'placeholder' => 'Account Number', 'required' => '')) !!}
                        @if ($errors->has('account_number')) <p class="help-block">{{ $errors->first('account_number') }}</p> @endif
                    </div>

                       <div class="form-group @if ($errors->has('account_name')) has-error @endif">
                        {!! Form::label('account_name', 'Account Name', array('class' => 'control-label')) !!}
                        {!! Form::text('account_name', null, array('class' => 'form-control pad', 'placeholder' => 'Account Name', 'required' => '')) !!}
                        @if ($errors->has('account_name')) <p class="help-block">{{ $errors->first('account_name') }}</p> @endif
                    </div>

                       <div class="form-group @if ($errors->has('account_bank')) has-error @endif">
                        {!! Form::label('account_bank', 'Bank', array('class' => 'control-label')) !!}
                        {!! Form::text('account_bank', null, array('class' => 'form-control pad', 'placeholder' => 'Bank', 'required' => '')) !!}
                        @if ($errors->has('account_bank')) <p class="help-block">{{ $errors->first('account_bank') }}</p> @endif
                    </div>

                       <div class="form-group @if ($errors->has('account_type')) has-error @endif">
                        {!! Form::label('account_type', 'Accunt Type', array('class' => 'control-label')) !!}
                        {!! Form::text('account_type', null, array('class' => 'form-control pad', 'placeholder' => 'Accunt Type', 'required' => '')) !!}
                        @if ($errors->has('account_type')) <p class="help-block">{{ $errors->first('account_type') }}</p> @endif
                    </div>

                    {!! Form::submit( 'Update user' , array('type' => 'submit', 'class' => 'btn btn-primary margin-t-25')) !!}

                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>

</section>

@endsection