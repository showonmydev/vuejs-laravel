<div class="row">
    <div class="col-md-6">

        <div class="form-group @if ($errors->has('name')) has-error @endif">
            {!! Form::label('name', 'Name', array('class' => 'control-label')) !!}
            {!! Form::text('name', null, array('class' => 'form-control pad', 'placeholder' => 'Name', 'required' => '')) !!}
            @if ($errors->has('name')) <p class="help-block">{{ $errors->first('name') }}</p> @endif
        </div>

        <div class="form-group @if ($errors->has('manager')) has-error @endif">
            {!! Form::label('manager_id', 'Manager', array('class' => 'control-label')) !!}

            <select id="manager_id" class="form-control pad" name="manager_id">

                <option value="" disabled>Select a user...</option>

                @foreach($users as $user)

                    @if(isset($brand))

                        @if($user->id == $brand->manager_id)
                            <option value="{{ $user->id }}" selected>{{$user->first_name}} {{$user->last_name}}</option>

                        @else
                            <option value="{{ $user->id }}">{{$user->first_name}} {{$user->last_name}}</option>

                        @endif

                    @else

                        <option value="{{ $user->id }}">{{$user->first_name}} {{$user->last_name}}</option>

                    @endif


                @endforeach

            </select>

            @if ($errors->has('manager')) <p class="help-block">{{ $errors->first('manager') }}</p> @endif
        </div>

    </div>
</div>

{!! Form::submit( $submitButtonText , array('type' => 'submit', 'class' => 'btn btn-primary')) !!}