@include('partials.header')
    @yield('additionalcss')
    @if (!Auth::user()->hasRole("Administrator") && !Auth::user()->hasRole("Root"))
        <style>
            .admin-button{display:none !important;}
        </style>
    @endif
<body class="app-page v2">
    <div id="app">
        <div class="header__wrap" style="padding: 15px; border-bottom: 1px solid #EEE; margin-bottom: 0px">
            <div class="row">
                <div class="col-md-3">
                    <a href="javascript:;" onclick="toggleMenu()">
                        <img src="/images/menu-toggle.png" style="margin-top: 8px; margin-left: 5px"/>
                    </a>
                </div>
                <div class="col-md-9">
                    <ul class="header__nav-section clearfix" style="float:right">
                        <li>
                            <a class="{{ Request::path() == '/' ? 'active' : '' }}" href="/">
                                Projects
                            </a>

                        </li>
                        @if (Auth::user()->hasRole("Administrator") || Auth::user()->hasRole("Root"))
                        
                        <li>
                            <a class="{{ Request::path() == 'teams' ? 'active' : '' }}" href="/teams">
                                Teams
                            </a>
                        </li>
                        <li>
                            <a class="{{ Request::path() == 'locations' ? 'active' : '' }}" href="/locations">
                                Locations
                            </a>
                        </li>
                          @endif
                        {{--
                        <li>
                            <a class="{{ Request::path() == 'locations' ? 'active' : '' }}" href="#">
                                Inbox
                            </a>
                        </li>
                        --}}
                            
                            {{--
                        <li>
                            <a class="{{ Request::path() == 'companies' ? 'active' : '' }}" href="/companies">
                                Companies
                            </a>
                        </li>
                        <li>
                            <a class="{{ Request::path() == 'archived' ? 'active' : '' }}" href="/archived">
                                Archived
                            </a>
                        </li>
                        --}}
                        <li>
                            @if ((Auth::user()->email == 'phil@kiwidc.com' || Auth::user()->email == 'mike.metelerkamp@gmail.com'))
                                @if (session('company_rewards') == 1)
                                    <a href="/companies" style="margin-right: 20px">
                                        R{{session('company_balance')}}
                                    </a>
                                @endif
                            @endif
                        </li>
                        {{--
                        <li>
                            <a href="#" style="margin-right: 20px; margin-top: 5px">
                                <span class="ion-ios-bell icon--medium">
                                </span>
                            </a>
                        </li>
                        --}}
                        <li class="dropdown" role="presentation" style="margin-top: -10px; margin-right: 5px">
                            <a aria-expanded="false" aria-haspopup="true" class="dropdown-toggle" data-toggle="dropdown" href="#" role="button">
                                <span class="table__chars red">
                                    {{Auth::user()->first_name[0]}} {{Auth::user()->last_name[0]}}
                                </span>
                                <span class="caret">
                                </span>
                            </a>
                            <ul class="dropdown-menu" style="left:auto; right:0px; min-width: 100px">
                                @can('edit-settings')
                                <li style="padding: 5px 10px">
                                    <a href="/settings">
                                        Settings
                                    </a>
                                </li>
                                <li class="divider" role="separator">
                                </li>
                                @endcan
                                <li style="padding: 5px 10px">
                                    <a class="header__logout" href="/logout">
                                        <span class="ion-ios-redo-outline icon--medium">
                                        </span>
                                        Log out
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        @yield('content')
    </div>
    @include('partials.footer')
    <!-- Scripts -->
    @yield('preJS')
    <script src="{{ mix('/js/manifest.js') }}">
    </script>
    <script src="{{ mix('/js/vendor.js') }}">
    </script>
    <script src="{{ mix('/js/app-v2.js') }}">
    </script>
    @include('partials.flash')
    @yield('additionalJS')
    <script>
        function toggleMenu(){
            if($('#board-body').css("width") != "100%"){
                $('#boards-list').toggle();
                $('#board-body').toggleClass("fullwidth");
            }else{
                $('#boards-list').toggle();
                $('#board-body').toggleClass("fullwidth");
            }
            
        }
    </script>
</body>
