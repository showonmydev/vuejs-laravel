@extends('appv3')



@section('top-header')
    <ul class="header__nav-section clearfix">
        <li><a href="/" class="">Dashboard</a></li>
        <li><a href="/users" class="active">People</a></li>
        <li><a href="/locations" class="">Locations</a></li>
        <li><a href="/brands" class="">Brands</a></li>
    </ul>
@endsection

@section('title')
Users
@endsection

@section('actions')

@if(Auth::user()->doesNotHaveRole("Submitter"))
<a href="users/create" class="btn btn-outline ion-ios-plus-empty pull-right">Add User</a>
@endif

@endsection

@section('tabs')

    <ul class="list-unstyled">
        <li class="header__tab"><a class="active" href="/users">Users</a></li>
        <li class="header__tab"><a class="" href="/teams">Teams</a></li>
    </ul>

@endsection

@section('content')

<section class="teams section">
    <div class="row">
        <div class="col-xs-12">
            @if (count($users) > 0)
            <table class="table table-hover">
                <thead>
                <tr>
                    <th class="col-xs-3"><button class="sort asc" data-sort="name">Name</button></th>
                    <th class="col-xs-6">Email</th>
                    <th class="col-xs-1">Role</th>
                    <th class="col-xs-1">Active</th>
                    <th class="col-xs-1"></th>
                </tr>
                </thead>
                <tbody>
                @foreach ($users as $user)
                <tr>
                    <td><a href="/users/{{ $user->id }}/edit" class="resourcelist__name">{{ $user->name() }}</a></td>
                    <td>{{$user->email}}</td>
                    <td>{{$user->getRole()}}</td>
                    <td>True</td>
                    <td class="text-right">
                        <a class="action" role="button" tabindex="0"
                           data-container="body"
                           data-toggle="popover"
                           data-placement="left"
                           data-content='<ul class="list-unstyled">
                           <li><a href="/users/{{ $user->id }}/edit" class="resourcelist__name">Edit</a></li>
                           <li>{!! Form::open(array('url' => '/users/'.$user->id, 'method' => 'delete', 'class' => 'delete_record')) !!}<button type="submit">Delete</button>{!! Form::close() !!}</li>
                           </ul>'>
                        </a>
                    </td>
                </tr>
                @endforeach
                @foreach ($invited as $user)
                    <tr>
                        <td><span class="resourcelist__name">
                                @if($user->first_name != '')
                                    {{$user->first_name}} {{$user->last_name}}
                                @else
                                    Unknown
                                @endif
                            </span></td>
                        <td>{{$user->email}}</td>
                        <td>
                            Unknown
                        </td>
                        <td>Invited</td>
                        <td class="text-right">

                        </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            @else
                <p>There are no users currently</p>
            @endif
        </div>
    </div>
</section>

@endsection