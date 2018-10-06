@include('partials.header')
<body class="plain-page">

    <div class="page__body">
        <div class="container-fluid">
            @yield('content')
        </div>
    </div>
    <!-- Scripts -->
    {{--<script src="{{ elixir("js/all.js") }}"></script>--}}
    @include('partials.flash')
    @yield('additionalJS')
</body>
</html>