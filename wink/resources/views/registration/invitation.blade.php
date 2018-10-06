@extends('auth')

@section('content')

<div id='register' class="container-fluid">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
            <div class="row">
                <div class="col-xs-12">
                    <div class="logo">
                        <img src="/images/logo.png" alt="WinkHQ Logo">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    @if (!$errors->isEmpty())
                    <div class="row">
                        <div class="col-xs-12">
                            <div class="alert alert-danger login-errors">
                                <strong>Error!</strong>
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    @endif
                </div>
            </div>    
            <div class="row">
                <div class="col-xs-12">
                    <form class="" role="form" method="POST" action="{{ url('/complete_invitation') }}">
                        {!! csrf_field() !!}

                        {!!Form::hidden('invite_token', $signup_details->invitation_link)!!}

                        <div class="form-group">
                            <label class="" for="first_name">First name</label>
                            <input type="text" class="form-control" name="first_name" value="{{ old('first_name') }}">
                        </div>

                        <div class="form-group">
                            <label class="" for="last_name">Last name</label>
                            <input type="text" class="form-control" name="last_name" value="{{ old('last_name') }}">
                        </div>

                        <div class="form-group">
                            <label class="" for="password">Password</label>
                            <input type="password" class="form-control" name="password">
                        </div>                    

                        <div class="form-group">
                            <input type="submit" class="btn btn-primary" value="Complete registration">
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection