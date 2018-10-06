<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>my-project</title>
    <!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"> -->
    <link href="{{url('css/font-awesome.min.css')}}" rel="stylesheet">

    <link rel="stylesheet" href="{{url('css/bootstrap.min.css')}}">
    <link rel="stylesheet" href="{{url('css/jquery-ui.css')}}">
    <link rel="stylesheet" href="{{ url('css/dragtable.css') }}">
    <!-- <link rel="stylesheet" href="http://dmsqa.katprotech.com/dms/static/dragtable.css"> -->
    <script src="{{url('js/jQuery.min.js')}}"></script>
    <script src="{{ url('js/bootstrap.min.js') }}"></script>
    <script src="{{url('js/jquery-ui.min.js')}}"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-migrate/3.0.1/jquery-migrate.js"></script>
    <script src="//akottr.github.io/js/jquery.chili-2.2.js"></script>
    <script src="{{ url('js/jquery.dragtable.js') }}"></script>
    <script type="text/javascript" src="{{ url('js/jquery.tablesorter.js')}}"></script>

    <script src="https://unpkg.com/vue-multiselect@2.1.0"></script>
    <link rel="stylesheet" href="https://unpkg.com/vue-multiselect@2.1.0/dist/vue-multiselect.min.css">

    <script>

      const KEY = "{{env('KEY')}}"
      //const API_DOMAIN = "https://apitest.benq.com/"
      const API_DOMAIN = "{{env('UI_BASE_URL')}}"
      const MQTT_DOMAIN = "{{env('RestServerAPI')}}"
      const AUTH_REDIRECT_URL = API_DOMAIN+"/login/benq"
      const API_URL = API_DOMAIN+"/api/"
      const LOGOUT_URL = API_DOMAIN+"/logout/benq"
      $(document).ready(function() {
        setTimeout(function(){
            $('.softwaremang td:not(.ifnotClick)').click(function(){
                $('.softwaremang').removeClass('active');
                $(this).parent().addClass('active');
                $('.ifnotClick span').addClass('hide');
                $(this).parent().find('.ifnotClick span').removeClass('hide');
            });
        }, 500);

            $('#footerTable').dragtable({dragHandle:'.some-handle'});
            
            $('span').click(function() {
                setTimeout(function(){
                    $("table tr, table tr td").resizable({handles: 'e'})
                }, 500);
            })
            $('#submenu-1 .groupInspan').click(function(){
                $('#submenu-1 span').removeClass('active');
                $(this).parents("span").addClass('active');
            });

            $(document).on('click', '.fa-caret-down', function() {
                console.log('LEFT')
                $(this).addClass('fa-caret-right')
                $(this).removeClass('fa-caret-down')
            });

            $(document).on('click', '.fa-caret-right', function() {
                console.log('RIGHT')
                $(this).addClass('fa-caret-down');
                $(this).removeClass('fa-caret-right');
            });

});
</script>
<!-- <link rel="stylesheet" href="{{ mix('css/all.css') }}"> -->
<!-- <link rel="stylesheet" href="{{ mix('css/app.css') }}"> -->

</head>

<body>
    <input type="hidden" name="currWidth" class="currWidth" value="1010">
    <div id="app" value="1010">
    <input type="file" accept=".csv" id="uploadCSV" class="hide">
    <input type="file" accept=".csv" id="uploadSoftware" class="hide">
    <input type="hidden" id="groupName" class="hide">
    <input type="button" id="UploadCSVFinal1" class="hide">
        <appp></appp>
    </div>
    <!-- built files will be auto injected -->
</body>

</html>
<!-- <script src="{{ mix('js/all.js') }}"></script> -->
<script src="{{ mix('js/app.js') }}"></script>


<script>
  $(document).ready(function() {
    var fd = new FormData();
    $('#uploadCSV').change(function(){
        fd.append('file', this.files[0]); // since this is your file input
        fd.append('account_id', '1');
        fd.append('token', window.localStorage.getItem('token'));
        fd.append('group', $('#groupName').val());
    });
    $('#UploadCSVFinal1').click(function(){
        $.ajax({
            url: API_URL+'device/uploadcsv',
            type: "post",
            dataType: 'json',
            processData: false, // important
            contentType: false, // important
            data: fd,
            success: function(text) {
                if(text == "success") {
                    // alert("Your Device was uploaded successfully");
                }
            },
            error: function() {
                // alert("An error occured, please try again.");
            }
        });
    });


    $(".setsize").each(function() {
        $(this).height($(this).width());
    });
    $(window).on('resize', function(){
        $(".setsize").each(function() {
          $(this).height($(this).width());
      });
    });
});
</script>
