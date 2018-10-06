@extends('plain')

@section('title')
Create Brand
@endsection

@section('close')

    <a id="close_button" href="/brands" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="brands">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            {!! Form::open(array('url' => url('brands'), 'method' => 'post', 'class'=>'brands__form')) !!}
            @include('brands.form', ['submitButtonText' => 'Create brand'])
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection