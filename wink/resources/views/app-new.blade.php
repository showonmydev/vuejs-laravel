@include('partials.header')
    @yield('additionalcss')
<body class="app-page v2">

    <div id="app">
        <div class="header__wrap">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <ul class="header__nav-section clearfix">
                            <li><a href="/" class="{{ Request::path() == '/' ? 'active' : '' }}">Dashboard</a></li>
                             @if (Auth::user()->hasRole("Root") || Auth::user()->hasRole("Administrator"))
                            <li><a href="/companies" class="{{ Request::path() == 'companies' ? 'active' : '' }}">Companies</a></li>
                            
                            <li><a href="/teams" class="{{ Request::path() == 'teams' ? 'active' : '' }}">Teams</a></li>
                            <li><a href="/locations" class="{{ Request::path() == 'locations' ? 'active' : '' }}">Locations</a></li>
                            <li><a href="/archived" class="{{ Request::path() == 'archived' ? 'active' : '' }}">Archived</a></li>
                            @endif
                           
                        </ul>
                    </div>
                    <div class="col-md-6">
                        <ul class="header__nav-user pull-right clearfix">
                        <li>
                            @if (Auth::user()->email == 'phil@kiwidc.com' || Auth::user()->email == 'mike.metelerkamp@gmail.com')
                            <a href="/companies" style="margin-right: 20px; margin-top: 10px"
                            >
                            R{{session('company_balance')}}
                        </a>
                       
                    @endif</li>
                            <li><a href="#" style="margin-right: 20px; margin-top: 5px"><span class="ion-ios-bell icon--medium"></span></a></li>
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