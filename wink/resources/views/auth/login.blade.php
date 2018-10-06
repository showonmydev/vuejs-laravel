@extends('auth')

@section('content')

<div id='login' class="container-fluid">
    <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
            <div class="row">
                <div class="col-xs-12">
                    <div class="logo">
                        <img src="/images/logo.png" alt="WinkHQ Logo">
                    </div>
                </div>
            </div>
            {{----}}
            <div class="row">
                <div class="col-xs-12">
                    <form class="" role="form" method="POST" action="{{ url('/login') }}">
                        {!! csrf_field() !!}

                        <div class="form-group">
                            <label class="" for="email">Email</label>
                            <input type="email" class="form-control" name="email" value="">
                        </div>

                        <div class="form-group">
                            <label class="" for="password">Password</label>
                            <input type="password" class="form-control" name="password" value="">
                        </div>

                        <!-- <div class="form-group">
                            <label for="remember">Remember me</label>
                            <input type="checkbox" name="remember">
                        </div> -->                   

                        <div class="form-group">
                            <input type="submit" class="btn btn-primary btn-block" name="login" value="Log in">
                        </div>
                    </form>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12">
                    <p>
                        <a href="/password/reset" class="reset_password_link">Click here to reset your password</a>
                        @if(session('subdomain') == "app")
                         or 
                        <a href="/register">sign up</a></p>
                        @endif
                </div>
            </div>
        </div>
    </div>
</div>

@endsection