@if(session()->has('flash_message'))

<script type="text/javascript">
    // swal({
    //     title: "{{ session('flash_message.title') }}",
    //     text: "{{ session('flash_message.message') }}",
    //     type: "{{ session('flash_message.type') }}",
    //     timer: 3000,
    //     showConfirmButton: false
    // });

    // $.notify("{{ session('flash_message.message') }}", "{{ session('flash_message.type') }}");
    alert("{{ session('flash_message.message') }}");
</script>

@endif

@if(session()->has('flash_message_overlay'))

    <script type="text/javascript">
        swal({
            title: "{{ session('flash_message_overlay.title') }}",
            text: "{{ session('flash_message_overlay.message') }}",
            type: "{{ session('flash_message_overlay.type') }}",
            confirmButtonText: "Ok"
        });
    </script>

@endif