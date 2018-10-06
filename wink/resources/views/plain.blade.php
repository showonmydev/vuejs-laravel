@include('partials.header')
<body class="plain-page">
    <div id="app">
        <div class="header__wrap">
            <div class="container-fluid container-fluid__wide">
                <div class="row">
                    <div class="col-sm-10 col-sm-offset-1 header__title-actions header__title-actions--underline">
                        <div class="row">
                            <div class="col-sm-6">
                                <h1 class="header__title header__title-bottom-space">@yield('title')</h1>
                            </div>
                            <div class="col-sm-6 header__actions">
                                @yield('tabs')
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-1">
                        @yield('close')
                    </div>
                </div>
            </div>
        </div>
        <div class="page__body">
            <div class="container-fluid container-fluid__wide">
                @yield('content')
            </div>
        </div>
    </div>
    <!-- Scripts -->
    <script src="{{ mix('/js/manifest.js') }}"></script>
    <script src="{{ mix('/js/vendor.js') }}"></script>
    <script src="{{ mix('/js/app-v1.js') }}"></script>
    @include('partials.flash')
    @yield('additionalJS')
</body>
</html>