@include('partials.header')

<body class="app-page">
<div id="app">
    <div class="header__wrap header__blue">
        <div class="container-fluid">
            <div class="row header__nav-top">
                <div class="col-md-6">
                    @can('edit')
                        @yield('top-header')
                    @endcan
                </div>
                <div class="col-md-6">
                    <ul class="header__nav-user pull-right clearfix">
                        <!-- <li><a href="#">Update now</a></li> -->
                        <li><a href="#"><span class="ion-ios-alarm-outline icon--small"></span></a></li>
                        <li role="presentation" class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                {{Auth::user()->first_name}} {{Auth::user()->last_name}} for {{session('using_company_name')}} <span class="caret"></span>
                            </a>
                            <ul class="dropdown-menu">
                                @can('edit-settings')
                                    <li><a href="/settings">Settings</a></li>
                                    <li role="separator" class="divider"></li>
                                @endcan
                                <li><a href="/logout" class="header__logout"><span class="ion-ios-redo-outline icon--medium"></span>Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row header__title-actions">
                <div class="col-md-6">
                    <h1 class="header__title">@yield('title')</h1>
                </div>
                <div class="col-md-6 header__actions">
                    @yield('actions')
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8">
                    @yield('tabs')
                </div>
                <div class="col-xs-12 col-sm-4">
                    @yield('lower_actions')
                </div>
            </div>
        </div>
    </div>
    <div class="page__body">
        <div class="container-fluid">
            @yield('content')
        </div>
    </div>
@include('partials.footer')
</div>
<!-- Scripts -->
    @yield('preJS')
    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
    <script src="{{ mix('/js/app-v1.js') }}"></script>
    <script src="{{ mix('/js/app-v2.js') }}"></script>
    @include('partials.flash')
    @yield('additionalJS')



</body>

</html>