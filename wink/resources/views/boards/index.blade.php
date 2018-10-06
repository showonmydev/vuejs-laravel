@extends('appv3')

@section('content')    
    
        <board :boards-list-data="{{$boards_list}}" :boards-data="{{ $boards }}" :location-data="{{ $locations  }}" :tag-data="{{ $tags  }}" :team-data="{{ $teams  }}" :user-data="{{ $users  }}" :company-data="{{ $company  }}">
        </board>

@endsection

@section('additionalJS')
<script crossorigin="anonymous" integrity="sha256-DZAnKJ/6XZ9si04Hgrsxu/8s717jcIzLy3oi35EouyE=" src="https://code.jquery.com/jquery-3.2.1.js">
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js">
</script>
<script type="text/javascript">
    $('select.styled').select2({
                theme: "classic",
                allowClear: true
            });
            $('select.styled.assign').select2({
                theme: "classic",
                allowClear: true,
                tags: true
            });
</script>
@endsection
