@extends('app-new')

@section('content')
	
    <board :campaigns-data="{{ $campaigns }}" :company-data="{{ $company }}" :boards-data="{{ $boards }}" :location-data="{{ $locations  }}" :tag-data="{{ $tags  }}" :team-data="{{ $teams  }}"  :user-data="{{ $users  }}"></board>

@endsection

@section('additionalJS')

<script type="text/javascript" src="https://cdn.bootcss.com/jquery/3.0.0/jquery.js"></script>
<script type="text/javascript" src="https://cdn.bootcss.com/select2/4.0.0/js/select2.js"></script>
<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/select2/4.0.0/css/select2.css">
<link rel="stylesheet" type="text/css" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="https://select2.github.io/select2-bootstrap-theme/css/select2-bootstrap.css">

@endsection