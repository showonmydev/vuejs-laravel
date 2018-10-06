@extends('plain')

@section('title')
Edit Location
@endsection

@section('close')

    <a id="close_button" href="/locations" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="locations">
    <div class="row">
        <div class="col-sm-offset-1 col-sm-11">
            {!! Form::model($location, array('url' => '/locations/'.$location->id, 'method' => 'put', 'class'=>'')) !!}
            @include('locations.form', ['submitButtonText' => 'Update location'])
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection

@section('additionalJS')
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlnQqayZKWaHucHzQyeJGMFPkWPrXViKA&libraries=places"></script>
    <script type="text/javascript" src="{{ asset('/js/maps.js') }}"></script>
@endsection