@extends('appv3')

@section('content')

    <teams :teams-data="{{ $teams }}" :user-roles-data="{{ $user_roles }}" :roles-data="{{ $roles }}"></teams>

@endsection