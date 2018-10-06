@include('partials.header')
    @yield('additionalcss')
<body class="app-page v2">

    <div id="app">
        <div class="header__wrap">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        
                    </div>
                    <div class="col-md-6">
                        
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