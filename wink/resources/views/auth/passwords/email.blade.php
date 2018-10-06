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
                @if (session('status'))
                    <div class="alert alert-success">
                        {{ session('status') }}
                    </div>
                @else
                    <div class="row">
                        <div class="col-xs-12">
                            @if (!$errors->isEmpty())
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="alert alert-danger login-errors">
                                            <strong>Oh no!</strong>
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
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/password/email') }}">
                            <input type="hidden" name="_token" value="{{ csrf_token() }}">

                            <div class="form-group">
                                <label class="control-label">E-Mail Address</label>
                                <input type="email" class="form-control" name="email" value="{{ old('email') }}">
                            </div>

                            <div class="form-group">
                                <input type="submit" class="btn btn-primary btn-block" value="Send Password Reset Link">
                            </div>
                        </form>
                    </div>
                </div>
                @endif
            </div>
        </div>
    </div>
@endsection
