@extends('plain')

@section('title')
Edit brand
@endsection

@section('close')

    <a id="close_button" href="/brands" class="header__close-button icon--large ion-ios-close-empty"></a>

@endsection

@section('content')

<section class="brands">
    <div class="row">
        <div class="col-sm-10 col-sm-offset-1">
            {!! Form::model($brand, array('url' => '/brands/'.$brand->id, 'method' => 'put', 'class'=>'brands__form')) !!}
            @include('brands.form', ['submitButtonText' => 'Update brand'])
            {!! Form::close() !!}
        </div>
    </div>

</section>

@endsection