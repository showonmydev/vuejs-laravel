@extends('app-report')
@section('content')
    <campaign-report :campaign-data="{{ $campaign }}" :campaignDetail-data="{{ $campaignDetail }}" :locations-data="{{ $locations  }}" :alert-data="{{ $alerts  }}" :rules-data="{{ $alertRules  }}"  :overview-data="{{ $overview  }}"></campaign-report>
@endsection

@section('additionalJS')
    <script
            src="https://code.jquery.com/jquery-3.2.1.js"
            integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE="
            crossorigin="anonymous"></script>

                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBlnQqayZKWaHucHzQyeJGMFPkWPrXViKA&libraries=places"></script>
    <script type="text/javascript" src="{{ asset('/js/maps.js') }}"></script>

@endsection
