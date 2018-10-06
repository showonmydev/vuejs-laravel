@extends('plain')

@section('title')
Create Location
@endsection

@section('close')

    <a id="close_button" href="/locations" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="locations">
    <div class="row">
        <div class="col-sm-11 col-sm-offset-1">
            {!! Form::open(array('url' => url('locations'), 'method' => 'post', 'class'=>'')) !!}
            @include('locations.form', ['submitButtonText' => 'Create location'])
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection

@section('additionalJS')

    <script
            src="https://code.jquery.com/jquery-3.2.1.js"
            integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
            crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlnQqayZKWaHucHzQyeJGMFPkWPrXViKA&libraries=places"></script>
    <script type="text/javascript" src="{{ asset('/js/maps.js') }}"></script>

@endsection