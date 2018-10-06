@include('partials.header')
    @yield('additionalcss')
<body class="app-page v2">

    <div id="app">
        <div class="header__wrap">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <ul class="header__nav-section clearfix">
                           <li><a href="/boards/{{$campaign->board_id}}"><span class="ion-reply icon--medium"></span> &nbsp; &nbsp;  Back to Projects</a></li>                           
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="header__nav-user pull-right clearfix">
                        
                        
                            <li role="presentation" class="dropdown">
                                <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button"
                                aria-haspopup="true" aria-expanded="false">
                                <span class="table__chars red">{{Auth::user()->first_name[0]}} {{Auth::user()->last_name[0]}}</span><span
                                class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                @can('edit-settings')
                                <li><a href="/settings">Settings</a></li>
                                <li role="separator" class="divider"></li>
                                @endcan
                                <li><a href="/logout" class="header__logout"><span
                                    class="ion-ios-redo-outline icon--medium"></span>Log out</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        @yield('content')
    </div>

    @include('partials.footer')

    <!-- Scripts -->
    @yield('preJS')
    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
    <script src="{{ mix('/js/app-v2.js') }}"></script>

    @include('partials.flash')
    @yield('additionalJS')


</body>

</html>